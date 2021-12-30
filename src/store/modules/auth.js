
import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const REQUEST_REGISTER = 'REQUEST_REGISTER'
export const REQUEST_AUTH_USER = 'REQUEST_AUTH_USER'
export const REQUEST_USER_UPDATE = 'REQUEST_USER_UPDATE'
export const UPDATE_AUTH_STATE = 'UPDATE_AUTH_STATE'
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT'

const state = {
  user: {},
  isFetching: false,
  isProcessing: false,
};

const getters = {
  
};

const mutations = {
  async [UPDATE_AUTH_STATE] (state, payload) {
    if (payload.isFetching) state.isFetching = payload.isFetching
    if (payload.user) state.user = payload.user
  },
};

const actions = {
  getHeaders() {
    return  {
      headers: {
        Authorization: 'Bearer ' + Cookies.get("token"),
      }
    }
  },

  async [REQUEST_LOGIN] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_AUTH_STATE, { isProcessing: true })
      const res = await axios.post(`${axios.defaults.baseURL}/login`, params)
      let token = res.data.token;
      axios.defaults.headers.common["Authorization"] = token;
      // localStorage.setItem("token", token);
      Cookies.set('token', token)
      return res;
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_AUTH_STATE, { isProcessing: false })
  },
  
  async [REQUEST_LOGOUT] ({ commit, dispatch }) {
    try {
      await commit(UPDATE_AUTH_STATE, { isProcessing: true })
      const res = await axios.get(`${axios.defaults.baseURL}/logout`, actions.getHeaders())
      localStorage.removeItem('token')
      localStorage.clear();
      Cookies.remove('token');
      delete axios.defaults.headers.common['Authorization']
      return res;
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_AUTH_STATE, { isProcessing: false })
  },

  async [REQUEST_REGISTER] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_AUTH_STATE, { isProcessing: true })
      const res = await axios.post(`${axios.defaults.baseURL}/register`, params)
      return res;
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_AUTH_STATE, { isProcessing: false })
  },
  
  async [REQUEST_AUTH_USER] ({ commit, dispatch }) {
    try {
      await commit(UPDATE_AUTH_STATE, { isFetching: true })
      const res = await axios.get(`${axios.defaults.baseURL}/user`, actions.getHeaders())
      await commit(UPDATE_AUTH_STATE, {
        user: res.data.user,
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_AUTH_STATE, { isFetching: false })
  },

  async [REQUEST_USER_UPDATE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_AUTH_STATE, { isSaving: true })
      await axios.put(`${axios.defaults.baseURL}/user/${params.id}`, params.data, actions.getHeaders())
      await dispatch(REQUEST_AUTH_USER)
    } catch (error) { 
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_AUTH_STATE, { isSaving: false })
  },

};

export default { state, getters, mutations, actions };
