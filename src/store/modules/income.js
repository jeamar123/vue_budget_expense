
import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const UPDATE_INCOME_STATE = 'UPDATE_INCOME_STATE'
export const REQUEST_INCOME_LIST = 'REQUEST_INCOME_LIST'
export const REQUEST_INCOME_DELETE = 'REQUEST_INCOME_DELETE'
export const REQUEST_INCOME_BULK_ADD_UPDATE = 'REQUEST_INCOME_BULK_ADD_UPDATE'
export const REQUEST_INCOME_DETAILS = 'REQUEST_INCOME_DETAILS'

const state = {
  isFetching: false,
  isSaving: false,
  items: [],
  item: {},
  totalIncome: 0,
  urlParams: ''
};

const getters = {};

const mutations = {
  async [UPDATE_INCOME_STATE] (state, payload) {
    if (payload.isSaving) state.isSaving = payload.isSaving
    if (payload.isFetching) state.isFetching = payload.isFetching
    if (payload.items) state.items = payload.items
    if (payload.totalIncome != null) state.totalIncome = payload.totalIncome
    if (payload.item) state.item = payload.item
    if (payload.urlParams) state.urlParams = payload.urlParams
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

  async [REQUEST_INCOME_LIST] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_INCOME_STATE, { isFetching: true })
      const res = await axios.get(`${axios.defaults.baseURL}/income${params}`, actions.getHeaders())
      await commit(UPDATE_INCOME_STATE, {
        urlParams: params,
        items: res.data.incomes,
        totalIncome: res.data.total,
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_INCOME_STATE, { isFetching: false })
  },

  async [REQUEST_INCOME_DETAILS] ({ commit, dispatch }, params) {
    await commit(UPDATE_INCOME_STATE, { isFetching: true })
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/income/${params.id}`, actions.getHeaders())
      await commit(UPDATE_INCOME_STATE, { 
        item: res.data
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_INCOME_STATE, { isFetching: false })
  },
  
  async [REQUEST_INCOME_DELETE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_INCOME_STATE, { isSaving: true })
      await axios.delete(`${axios.defaults.baseURL}/income/${params.id}`, actions.getHeaders())
      await dispatch(REQUEST_INCOME_LIST, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_INCOME_STATE, { isSaving: false })
  },

  async [REQUEST_INCOME_BULK_ADD_UPDATE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_INCOME_STATE, { isSaving: true })
      await axios.post(`${axios.defaults.baseURL}/income-bulk-add-update`, params, actions.getHeaders())
      await dispatch(REQUEST_INCOME_LIST, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_INCOME_STATE, { isSaving: false })
  },
  
};

export default { state, getters, mutations, actions };
