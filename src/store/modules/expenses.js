
import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const UPDATE_EXPENSES_STATE = 'UPDATE_EXPENSES_STATE'
export const REQUEST_EXPENSES_LIST = 'REQUEST_EXPENSES_LIST'
export const REQUEST_EXPENSES_DELETE = 'REQUEST_EXPENSES_DELETE'
export const REQUEST_EXPENSES_BULK_ADD_UPDATE = 'REQUEST_EXPENSES_BULK_ADD_UPDATE'
export const REQUEST_EXPENSES_DETAILS = 'REQUEST_EXPENSES_DETAILS'
export const REQUEST_EXPENSES_SPENT = 'REQUEST_EXPENSES_SPENT'
export const REQUEST_EXPENSES_SUMMARY = 'REQUEST_EXPENSES_SUMMARY'

const state = {
  isFetching: false,
  isSaving: false,
  items: [],
  item: {},
  urlParams: '',
  total: 0,
  summary: {},
  spentData: [],
};

const getters = {};

const mutations = {
  async [UPDATE_EXPENSES_STATE] (state, payload) {
    if (payload.isSaving) state.isSaving = payload.isSaving
    if (payload.isFetching) state.isFetching = payload.isFetching
    if (payload.items) state.items = payload.items
    if (payload.item) state.item = payload.item
    if (payload.urlParams) state.urlParams = payload.urlParams
    if (payload.total != undefined) state.total = payload.total
    if (payload.summary) state.summary = payload.summary
    if (payload.spentData) state.spentData = payload.spentData
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

  async [REQUEST_EXPENSES_LIST] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_EXPENSES_STATE, { isFetching: true })
      const res = await axios.get(`${axios.defaults.baseURL}/expenses${params}`, actions.getHeaders())
      await commit(UPDATE_EXPENSES_STATE, {
        urlParams: params,
        items: res.data.expenses,
        total: res.data.total,
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isFetching: false })
  },

  async [REQUEST_EXPENSES_DETAILS] ({ commit, dispatch }, params) {
    await commit(UPDATE_EXPENSES_STATE, { isFetching: true })
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/expenses/${params.id}`, actions.getHeaders())
      await commit(UPDATE_EXPENSES_STATE, { 
        item: res.data
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isFetching: false })
  },
  
  async [REQUEST_EXPENSES_DELETE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_EXPENSES_STATE, { isSaving: true })
      await axios.delete(`${axios.defaults.baseURL}/expenses/${params.id}`, actions.getHeaders())
      await dispatch(REQUEST_EXPENSES_LIST, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isSaving: false })
  },
  
  async [REQUEST_EXPENSES_BULK_ADD_UPDATE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_EXPENSES_STATE, { isSaving: true })
      await axios.post(`${axios.defaults.baseURL}/expenses-bulk-add-update`, params, actions.getHeaders())
      await dispatch(REQUEST_EXPENSES_LIST, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isSaving: false })
  },

  async [REQUEST_EXPENSES_SUMMARY] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_EXPENSES_STATE, { isFetching: true })
      let res = await axios.get(`${axios.defaults.baseURL}/expenses-summary${params}`, actions.getHeaders())
      await commit(UPDATE_EXPENSES_STATE, {
        summary: res.data.summary
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isFetching: false })
  },

  async [REQUEST_EXPENSES_SPENT] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_EXPENSES_STATE, { isFetching: true })
      let res = await axios.get(`${axios.defaults.baseURL}/expenses-total-spent${params}`, actions.getHeaders())
      await commit(UPDATE_EXPENSES_STATE, {
        spentData: res.data.spent
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_EXPENSES_STATE, { isFetching: false })
  },
  
};

export default { state, getters, mutations, actions };
