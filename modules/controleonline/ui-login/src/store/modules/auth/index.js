import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    user: JSON.parse(localStorage.getItem('session')) || {},
    isLoading: false,
    isLoggedIn: false,
    error: '',
    violations: null,
    created: null,
    indexRoute: 'HomeIndex',
  },
  actions,
  getters,
  mutations,
};
