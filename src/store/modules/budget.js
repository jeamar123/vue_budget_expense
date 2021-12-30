
import axios from 'axios';
import Cookies from 'js-cookie'

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

export const UPDATE_BUDGET_STATE = 'UPDATE_BUDGET_STATE'
export const REQUEST_BUDGET_BULK_UPDATE = 'REQUEST_BUDGET_BULK_UPDATE'
export const REQUEST_BUDGET_DETAILS = 'REQUEST_BUDGET_DETAILS'
export const REQUEST_BUDGET_DELETE = 'REQUEST_BUDGET_DELETE'
export const REQUEST_BUDGET_SUMMARY = 'REQUEST_BUDGET_SUMMARY'

const state = {
  isFetching: false,
  isSaving: false,
  planned: [],
  budgets: [],
  urlParams: '',
  budgetData: [],
};

const getters = {};

const mutations = {
  async [UPDATE_BUDGET_STATE] (state, payload) {
    if (payload.isSaving) state.isSaving = payload.isSaving
    if (payload.isFetching) state.isFetching = payload.isFetching
    if (payload.planned != undefined) state.planned = payload.planned
    if (payload.budgets != undefined) state.budgets = payload.budgets
    if (payload.budgetData != undefined) state.budgetData = payload.budgetData
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

  async [REQUEST_BUDGET_DETAILS] ({ commit, dispatch }, params) {
    await commit(UPDATE_BUDGET_STATE, { isFetching: true })
    try {
      const res = await axios.get(`${axios.defaults.baseURL}/budget${params}`, actions.getHeaders())
      await commit(UPDATE_BUDGET_STATE, { 
        budgets: res.data.budgets,
        planned: res.data.planned,
        urlParams: params
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_BUDGET_STATE, { isFetching: false })
  },

  async [REQUEST_BUDGET_BULK_UPDATE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_BUDGET_STATE, { isSaving: true })
      await axios.post(`${axios.defaults.baseURL}/budget-bulk-update${params.urlParams}`, params.data, actions.getHeaders())
      await dispatch(REQUEST_BUDGET_DETAILS, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_BUDGET_STATE, { isSaving: false })
  },
  
  async [REQUEST_BUDGET_DELETE] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_BUDGET_STATE, { isSaving: true })
      await axios.delete(`${axios.defaults.baseURL}/budget/${params.id}`, actions.getHeaders())
      await dispatch(REQUEST_BUDGET_DETAILS, state.urlParams)
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_BUDGET_STATE, { isSaving: false })
  },

  async [REQUEST_BUDGET_SUMMARY] ({ commit, dispatch }, params) {
    try {
      await commit(UPDATE_BUDGET_STATE, { isFetching: true })
      let res = await axios.get(`${axios.defaults.baseURL}/budget-summary${params}`, actions.getHeaders())
      await commit(UPDATE_BUDGET_STATE, {
        budgetData: res.data.summary
      })
    } catch (error) {
      console.log(error);
      dispatch( 'REQUEST_ERROR', {
        isShow: true,
        message: error.response?.data?.message || 'Something went wrong.'
      }, { root: true });
    }
    await commit(UPDATE_BUDGET_STATE, { isFetching: false })
  },
  
};

export default { state, getters, mutations, actions };
