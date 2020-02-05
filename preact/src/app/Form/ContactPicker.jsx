import { h } from 'preact';

const ContactPicker = ({ value, setValue, className }) => {
  if (!('contacts' in navigator) || !('ContactsManager' in window)) {
    return;
  }

  let text;
  if (value.toLowerCase().indexOf('text') !== -1) {
    text = ['Do you want to text someone?', 'Write message to {contact}'];
  }

  if (value.toLowerCase().indexOf('call') !== -1) {
    text = ['Do you want to call someone?', 'Call {contact}'];
  }

  if (!text) {
    return;
  }

  return (
    <button
      onClick={async () => {
        try {
          const contact = await navigator.contacts.select(['name', 'tel'], {
            multiple: false,
          });
          setValue(
            text[1].replace(
              '{contact}',
              contact[0].name[0] + ' - ' + contact[0].tel[0]
            )
          );
        } catch (ex) {
          alert('Contact Pick failed');
        }
      }}
      className={`text-sm text-gray-500 hover:text-black mt-2 ${className}`}
    >
      {text[0]}
    </button>
  );
};

export default ContactPicker;
