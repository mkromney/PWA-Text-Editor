import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Opens the database and stores it in a variable
const dbPromise = initdb();

// A method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const newItem = { text: content, timestamp: Date.now() };
  await store.add(newItem);
  await tx.complete;
  console.log('Added to database:', newItem);
};

// A method that gets all the content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const allItems = await store.getAll();
  return allItems;
};

initdb();
