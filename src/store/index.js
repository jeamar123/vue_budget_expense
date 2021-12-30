import { createStore } from "vuex";
import auth from "./modules/auth";
import category from "./modules/category";
import income from "./modules/income";
import expenses from "./modules/expenses";
import budget from "./modules/budget";

export const REQUEST_ERROR = 'REQUEST_ERROR'
export const UPDATE_ERROR_STATE = 'UPDATE_ERROR_STATE'

let error_timeout = null;

export default createStore({
  state: {
    error: {
      isShow: false,
      message: '',
    }
  },
  mutations: {
    async [UPDATE_ERROR_STATE] (state, payload) {
      console.log(payload);
      if (payload.isShow){
        clearTimeout(error_timeout);
        state.error.isShow = payload.isShow
        error_timeout = setTimeout(() => {
          state.error.isShow = false
        }, 3000);
      }
      if (payload.message) state.error.message = payload.message
    },
  },
  actions: {
    async [REQUEST_ERROR] ({ commit }, params) {
      await commit(UPDATE_ERROR_STATE, params)
    },
  },
  modules: {
    auth,
    category,
    income,
    expenses,
    budget
  },
});
