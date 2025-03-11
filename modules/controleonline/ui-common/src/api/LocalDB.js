import { openDB } from "idb";

const DB_NAME = "ControleOnline";

export default class LocalDB {
  constructor(state) {
    this.state = state;

    this.checkAndGetDB();
  }

  async initDB() {
    let dbPromise = openDB(DB_NAME, this.currentVersion, {
      upgrade: (db) => {
        if (!db.objectStoreNames.contains(this.state.resourceEndpoint)) {
          const store = db.createObjectStore(this.state.resourceEndpoint, {
            keyPath: "id",
          });
          this.state.columns
            .filter((col) => col.sortable || col.externalFilter === false)
            .forEach((col) => {
              store.createIndex(col.name, col.name, { unique: false });
            });
        }
      },
    });
    return dbPromise;
  }

  async getCurrentVersion() {
    // Obtém a versão atual do banco de dados
    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME);
      request.onsuccess = () => {
        const db = request.result;
        const currentVersion = db.currentVersion;
        db.close();
        resolve(currentVersion);
        this.currentVersion = currentVersion;
      };
      request.onerror = () => resolve(1);
    });
  }

  async checkAndGetDB() {
    return this.getCurrentVersion().then(() => {
      return this.initDB().then((db) => {
        if (!this.storeExists()) {
          this.currentVersion = db.currentVersion + 1;
          db.close();
          return this.initDB();
        }
        return db;
      });
    });
  }

  async storeExists() {
    return this.checkAndGetDB().then((db) => {
      return db.objectStoreNames.contains(this.state.resourceEndpoint);
    });
  }

  async getAll() {
    if (!(await this.storeExists())) {
      return null;
    }
    const db = await this.checkAndGetDB();
    return db.getAll(this.state.resourceEndpoint);
  }

  async getItemsByColumn(columnName, value) {
    if (!(await this.storeExists())) {
      return null;
    }
    const db = await this.checkAndGetDB();
    const tx = db.transaction(this.state.resourceEndpoint, "readonly");
    const store = tx.objectStore(this.state.resourceEndpoint);
    const index = store.index(columnName);
    const results = await index.getAll(value);
    await tx.done;
    return results;
  }

  async get(id) {
    if (!(await this.storeExists())) {
      return null;
    }
    const db = await this.checkAndGetDB();
    return db.get(this.state.resourceEndpoint, id);
  }

  async saveItems(items) {
    const db = await this.checkAndGetDB();
    const tx = db.transaction(this.state.resourceEndpoint, "readwrite");
    const store = tx.objectStore(this.state.resourceEndpoint);
    await Promise.all(items.map((item) => store.put(item)));
    await tx.done;
  }

  async saveItem(item) {
    const db = await this.checkAndGetDB();
    return db.put(this.state.resourceEndpoint, item);
  }

  async getItemsByFilters() {
    if (!(await this.storeExists())) {
      return null;
    }
    const db = await this.checkAndGetDB();
    if (Object.keys(this.state.filters).length === 0) {
      return this.getAll();
    }

    const filterPromises = Object.entries(this.state.filters).map(
      async ([key, value]) => {
        const column = this.state.columns.find((col) => col.name === key);
        if (column && (column.sortable || column.externalFilter === false)) {
          return this.getItemsByColumn(key, value);
        }
        return null;
      }
    );

    const filterResults = await Promise.all(filterPromises);
    return filterResults.reduce((acc, curr) => {
      if (!acc || acc.length === 0) return curr;
      return acc.filter((item) => curr.some((result) => result.id === item.id));
    }, []);
  }
}
