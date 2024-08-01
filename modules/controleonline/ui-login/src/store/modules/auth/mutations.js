import { LocalStorage } from 'quasar';
import * as types from './mutation_types';

export default {
  [types.LOGIN_SET_USER](state, payload = null) {
    try {
      let _user = payload;

      if (payload !== null && payload.api_key) {
        _user = {
          username: payload.username,
          token: payload.api_key,
          people: payload.people,
          roles: payload.roles,
          company: payload.company,
          realname: payload.realname,
          avatar: payload.avatar,
          email: payload.email,
          phone: payload.phone,
          active: payload.active,
          type: payload.type
        };

        // save user data in LocalStorage
        let session = LocalStorage.has('session') ? LocalStorage.getItem('session') : {};

        session = _user;

        LocalStorage.set('session', session);
      }

      if (_user === null) {
        LocalStorage.remove('session');
        state.isLoggedIn = false;
      }else{
        state.isLoggedIn = true;
      }

      Object.assign(state, { user: _user });

    } catch (e) {

    }
  },

  SET_PEOPLE_STATUS(state, payload) {
    try {
      const session = LocalStorage.has('session') ? LocalStorage.getItem('session') : {};

      session.active = payload.active;
      session.type = payload.type;

      LocalStorage.set('session', session);

      if (payload === null) {
        LocalStorage.remove('session')
      }

      state.isLoggedIn = payload.active;
      state.user = session;
    } catch (e) {

    }
  },

  [types.LOGIN_SET_CREATED](state, payload = null) {
    let _user = null;

    if (payload.response && payload.response.success)
      _user = {
        username: payload.response.data.username,
        token: payload.response.data.appkey,
        people: payload.response.data.people.id,
        company: payload.response.data.people.company,
      };

    Object.assign(state, { created: _user });
  },

  [types.LOGIN_SET_ERROR](state, error) {
    Object.assign(state, { error });
  },

  [types.LOGIN_SET_ISLOADING](state, isLoading = true) {
    Object.assign(state, { isLoading: isLoading });
  },

  [types.LOGIN_SET_VIOLATIONS](state, violations) {
    Object.assign(state, { violations });
  },
  [types.LOGIN_SET_INDEX_ROUTE](state, indexRoute) {
    Object.assign(state, { indexRoute });
  },
  [types.SIGN_UP_FIELDS](state, signUpFields) {
    Object.assign(state, { signUpFields });
  },
  [types.SIGN_UP_CUSTOM_BG](state, signUpCustomBg) {
    Object.assign(state, { signUpCustomBg });
  }
};
