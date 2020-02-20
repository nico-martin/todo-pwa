import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import uuid from 'uuid/v4';

import idb from './app/vendor/db';
import Header from './app/Header';
import Form from './app/Form';
import List from './app/List';
import Footer from './app/Footer';
import A2H from './app/A2H';

const App = () => {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  const itemsAdd = title =>
    setItems([
      {
        title,
        id: uuid(),
        done: false,
      },
      ...items,
    ]);
  const itemsRemove = id => setItems(items.filter(item => id !== item.id));
  const itemsSet = (id, done) =>
    setItems(items.map(item => (item.id === id ? { ...item, done } : item)));

  // Whenever the items Array changes, the new Values should be stored in idb
  useEffect(() => mounted && idb.set('items', items), [items]);

  // on mount, the items from the idb should be set
  useEffect(() => {
    setMounted(true);
    idb.get('items').then(items => setItems(items || []));
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <div className="bg-indigo-800 text-white w-full shadow-lg sticky top-0">
        <Header className="w-11/12 max-w-lg mx-auto" />
      </div>
      <Form className="w-11/12 max-w-lg mx-auto mt-10" itemsAdd={itemsAdd} />
      <List
        className="w-11/12 max-w-lg mx-auto my-16"
        items={items}
        itemsRemove={itemsRemove}
        itemsSet={itemsSet}
      />
      <Footer className="m-auto w-11/12 max-w-2xl" />
      <A2H />
    </div>
  );
};

render(<App />, document.querySelector('body'));
