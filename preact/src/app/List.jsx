import { h } from 'preact';
import './List.css';
import PushReminder from './List/PushReminder';

const List = ({ className = '', items, itemsSet, itemsRemove }) => {
  if (items.length === 0) {
    return (
      <p className={`${className} text-center`}>Yay, you have nothing to do!</p>
    );
  }
  return (
    <ul className={`${className} border-gray-300 border-b`}>
      {items.map(item => (
        <li className="flex w-full border-gray-300 border-t p-4 items-center text-sm hover:bg-white c-list-item">
          <input
            type="checkbox"
            checked={item.done}
            onChange={() => itemsSet(item.id, !item.done)}
            className={`mr-4 focus:shadow-outline focus:outline-none cursor-pointer ${
              item.done ? 'opacity-25' : ''
            }`}
            title={item.done ? `mark as not yet done` : 'mark as done'}
          />
          <span
            className={`${
              item.done ? `line-through text-gray-400` : ''
            } mr-4 inline-block`}
          >
            {item.title}
          </span>
          {item.done ? (
            <button
              onClick={() => itemsRemove(item.id)}
              className="bg-gray-400 hover:bg-red-700 text-white w-4 h-4 rounded-full relative c-list-item__delete ml-auto"
              title="delete list item"
            >
              delete list item
            </button>
          ) : (
            <PushReminder id={item.id} title={item.title} className="ml-auto" />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
