import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

const Form = ({ className = '', itemsAdd }) => {
  const input = useRef(null);
  const [value, setValue] = useState(
    new URL(window.location).searchParams.get('title') || ''
  );

  return (
    <form
      className={`flex items-stretch ${className}`}
      onSubmit={e => {
        e.preventDefault();
        if (value !== '') {
          itemsAdd(value);
          setValue('');
          input.current.focus();
        }
      }}
    >
      <label htmlFor="title" className="self-center font-bold">
        New:
      </label>
      <input
        type="text"
        name="title"
        id="title"
        className="appearance-none border rounded rounded-r-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
        ref={input}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="font-bold rounded rounded-l-none text-white px-4 hover:bg-blue-700 bg-blue-500 text-center no-underline block focus:shadow-outline focus:outline-none"
      >
        Add
      </button>
    </form>
  );
};

export default Form;
