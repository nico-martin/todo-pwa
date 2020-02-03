import { h, render } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import uuid from 'uuid/v4';

import idb from './app/helpers/db';
import Header from './app/Header';
import Form from './app/Form';
import List from './app/List';
import Footer from './app/Footer';

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

  useEffect(() => mounted && idb.set('items', items), [items]);
  useEffect(() => {
    setMounted(true);
    idb.get('items').then(items => setItems(items || []));
  }, []);

  return (
    <div className="flex flex-col justify-start">
      <Header className="w-full max-w-lg mx-auto" />
      <Form className="w-full max-w-lg mx-auto mt-10" itemsAdd={itemsAdd} />
      <List
        className="w-full max-w-lg mx-auto my-16"
        items={items}
        itemsRemove={itemsRemove}
        itemsSet={itemsSet}
      />
      <Footer className="m-auto max-w-2xl" />
    </div>
  );
};

render(<App />, document.querySelector('body'));
