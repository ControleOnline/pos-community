import {createContext, useContext, useState} from 'react';
import stores from './stores'; // Importa o objeto com todos os stores

const StoreContext = createContext();

export function StoreProvider({children}) {
  if (!stores) {
    return <>{children}</>;
  }

  const storesState = {};

  Object.keys(stores).forEach(storeName => {
    const storeModule = stores[storeName];

    if (
      !storeModule ||
      !storeModule.state ||
      !storeModule.mutations ||
      !storeModule.actions
    ) {
      console.warn(
        `Store "${storeName}" is missing required properties (state, mutations, actions). Skipping.`,
      );
      return;
    }

    const stateHooks = {};

    Object.keys(storeModule.state).forEach(key => {
      const [state, setState] = useState(storeModule.state[key]);
      stateHooks[key] = {state, setState};
    });

    const getters = {};
    Object.keys(stateHooks).forEach(key => {
      Object.defineProperty(getters, key, {
        get: () => stateHooks[key].state,
        enumerable: true,
      });
    });

    const commit = (type, payload) => {
      const name = storeModule.mutations[type](getters, payload);
      if (stateHooks[name]) {
        stateHooks[name].setState(payload);
      } else {
        console.warn(
          `No state found for mutation key "${name}" in store "${storeName}"`,
        );
      }
    };

    const actions = {};
    Object.keys(storeModule.actions).forEach(actionName => {
      actions[actionName] = (...args) =>
        storeModule.actions[actionName]({commit, getters}, ...args);
    });
    storesState[storeName] = {getters, actions};
  });

  return (
    <StoreContext.Provider value={storesState}>
      {children}
    </StoreContext.Provider>
  );
}

export function getStore(storeName) {
  const storesState = useContext(StoreContext);
  if (!storesState || !storesState[storeName]) {
    throw new Error(
      `Store "${storeName}" not found. Ensure StoreProvider is used and stores are defined.`,
    );
  }
  return storesState[storeName];
}
