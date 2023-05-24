import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () =>
  openDB('cards', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('cards')) {
        console.log('cards database already exists');
        return;
      }
      db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
      console.log('cards database created');
    },
  });




// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email)  => {
    const cardsDb = await openDB('cards', 1);
    const tx = cardsDb.transaction('cards', 'readwrite');
    const store = tx.objectStore('cards');
    const request = store.add({ name: name, home: home, cell: cell, email: email });
    const result = await request;
    console.log('data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
    const cardsDb = await openDB('cards', 1);
    const tx = cardsDb.transaction('cards', 'readonly');
    const store = tx.objectStore('cards');
    const request = store.getAll();
    const result = await request;
    console.log('data retrieved from the database', result);
    return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    const cardsDb = await openDB('cards', 1);
    const tx = cardsDb.transaction('cards', 'readwrite');
    const store = tx.objectStore('cards');
    const request = store.delete({id});
    const result = await request;
    console.log('data deleted from the database', result);
    return result;
};

initdb();
