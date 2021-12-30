
import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const UPDATE_CATEGORY_STATE = 'UPDATE_CATEGORY_STATE'
export const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORY_LIST'
export const REQUEST_CATEGORY_ADD = 'REQUEST_CATEGORY_ADD'
export const REQUEST_CATEGORY_DELETE = 'REQUEST_CATEGORY_DELETE'
export const REQUEST_CATEGORY_UPDATE = 'REQUEST_CATEGORY_UPDATE'
export const REQUEST_CATEGORY_DETAILS = 'REQUEST_CATEGORY_DETAILS'
export const REQUEST_CATEGORY_PERCENTAGE = 'REQUEST_CATEGORY_PERCENTAGE'

const state = {
  isFetching: false,
  isSaving: false,
  items: [],
  item: {},
  spent_category: {},
};

const getters = {};

const mutations = {
  async [UPDATE_CATEGORY_STATE] (state, payload) {
    if (payload.isSaving) state.isSaving = payload.isSaving
    if (payload.isFetching) state.isFetching = payload.isFetching
    if (payload.items) state.items = payload.items
    if (payload.item) state.item = payload.item
    if (payload.spent_category) state.spent_category = payload.spent_category
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

  async [REQUEST_CATEGORY_LIST] ({ commit, dispatch }) {
    try {
      await commit(UPDATE_CATEGORY_STATE, { isFetching: true })
      const res = await axios.get(`${axios.defaults.baseURL}/category`, actions.getHeaders())
      await commit(UPDATE_CATEGORY_STATE, {
        items: res.data.categories,
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isFetching: false })
  },
  
  async [REQUEST_CATEGORY_ADD] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_CATEGORY_STATE, { isSaving: true })
      await axios.post(`${axios.defaults.baseURL}/category`, params, actions.getHeaders())
      await dispatch(REQUEST_CATEGORY_LIST)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isSaving: false })
  },

  async [REQUEST_CATEGORY_DETAILS] ({ commit, dispatch }, params) {
    await commit(UPDATE_CATEGORY_STATE, { isFetching: true })
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/category/${params.id}`, actions.getHeaders())
      await commit(UPDATE_CATEGORY_STATE, { 
        item: res.data
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isFetching: false })
  },
  
  async [REQUEST_CATEGORY_DELETE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_CATEGORY_STATE, { isSaving: true })
      await axios.delete(`${axios.defaults.baseURL}/category/${params.id}`, actions.getHeaders())
      await dispatch(REQUEST_CATEGORY_LIST)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isSaving: false })
  },

  async [REQUEST_CATEGORY_UPDATE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_CATEGORY_STATE, { isSaving: true })
      await axios.put(`${axios.defaults.baseURL}/category/${params.id}`, params.data, actions.getHeaders())
      await dispatch(REQUEST_CATEGORY_LIST)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isSaving: false })
  },

  async [REQUEST_CATEGORY_PERCENTAGE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_CATEGORY_STATE, { isFetching: true })
      const res = await axios.get(`${axios.defaults.baseURL}/category-percentage${params}`, actions.getHeaders())
      await commit(UPDATE_CATEGORY_STATE, {
        spent_category: res.data.values,
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_CATEGORY_STATE, { isFetching: false })
  },

  
};

export default { state, getters, mutations, actions };
