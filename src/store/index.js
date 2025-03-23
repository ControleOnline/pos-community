import {createContext, useContext, useState, useMemo, useEffect} from 'react';
import stores from './stores';

const StoreContext = createContext();

export function StoreProvider({children}) {
  if (!stores || Object.keys(stores).length === 0) {
    console.warn('No stores defined.');
    return <>{children}</>;
  }

  const initialState = useMemo(() => {
    const state = {};
    Object.keys(stores).forEach(storeName => {
      const storeModule = stores[storeName];
      if (
        !storeModule ||
        !storeModule.state ||
        !storeModule.mutations ||
        !storeModule.actions
      ) {
        console.warn(
          `Store "${storeName}" is missing required properties. Skipping.`,
        );
        return;
      }
      state[storeName] = {...storeModule.state};
    });
    return state;
  }, []);

  const [storesStateData, setStoresStateData] = useState(initialState);

  const storesState = useMemo(() => {
    const result = {};

    Object.keys(stores).forEach(storeName => {
      const storeModule = stores[storeName];
      if (
        !storeModule ||
        !storeModule.state ||
        !storeModule.mutations ||
        !storeModule.actions
      ) {
        return;
      }

      const getters = {...storesStateData[storeName]};

      const commit = (type, payload) => {
        if (!storeModule.mutations[type]) {
          console.error(`Mutation "${type}" not found in store "${storeName}"`);
          return;
        }
        const name = storeModule.mutations[type](getters, payload);

        setStoresStateData(prev => {
          const newState = {
            ...prev,
            [storeName]: {
              ...prev[storeName],
              [name]: payload,
            },
          };

          return newState;
        });
      };

      const actions = {};
      Object.keys(storeModule.actions).forEach(actionName => {
        actions[actionName] = (...args) =>
          storeModule.actions[actionName]({commit, getters}, ...args);
      });

      result[storeName] = {getters, actions};
    });

    return result;
  }, [storesStateData]);

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
      `Store "${storeName}" not found. Ensure StoreProvider is used.`,
    );
  }
  return storesState[storeName];
}
