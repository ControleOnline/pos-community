import { LocalStorage } from 'quasar';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    user: LocalStorage.getItem('session'),
    isLoading: false,
    error: '',
    violations: null,
    created: null,
    isLoggedIn: false,
    indexRoute: 'HomeIndex',
    signUpFields: {
      user: [
        'name',
        'username',
        'phone',
        'email',
        /*'confirmEmail',*/
        'password',
        'confirmPassword'
      ],
      company: [
        'name',
        'alias',
        'document',
        'address',
        'origin'
      ]
    },
    signUpCustomBg: false
  },
  actions,
  getters,
  mutations,
};
