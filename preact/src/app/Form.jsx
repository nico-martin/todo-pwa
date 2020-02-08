import { h, Fragment } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import ContactPicker from './Form/ContactPicker';

const Form = ({ className = '', itemsAdd }) => {
  const input = useRef(null);
  const [value, setValue] = useState(
    new URL(window.location).searchParams.get('title') || ''
  );

  useEffect(() => {
    const params = new URL(window.location).searchParams;
    const v = [
      ...(params.get('title') ? [params.get('title')] : []),
      ...(params.get('text') ? [params.get('text')] : []),
      ...(params.get('url') ? [params.get('url')] : []),
    ];

    setValue(v.join(' - '));
  }, []);

  return (
    <div className={className}>
      <form
        className="flex items-stretch"
        autocomplete="off"
        onSubmit={e => {
          e.preventDefault();
          if (value !== '') {
            itemsAdd(value);
            setValue('');
            input.current.focus();
          }
        }}
      >
        <input
          type="text"
          name="title"
          id="title"
          className="appearance-none border rounded rounded-r-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ref={input}
          value={value}
          onKeyUp={e => setValue(e.target.value)}
          autocomplete="off"
        />
        <button
          type="submit"
          className="font-bold rounded rounded-l-none text-white px-4 hover:bg-indigo-700 bg-indigo-800 text-center no-underline block focus:shadow-outline focus:outline-none"
        >
          Add
        </button>
      </form>
      <ContactPicker value={value} setValue={setValue} className="w-full" />
    </div>
  );
};

export default Form;
