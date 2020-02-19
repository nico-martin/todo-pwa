import { h } from 'preact';

const Footer = ({ className = '' }) => {
  return (
    <footer className={`${className} text-center text-gray-500 text-xs`}>
      Created by{' '}
      <a
        href="https://nico.dev"
        target="_blank"
        className="underline hover:text-black"
      >
        Nico Martin
      </a>{' '}
      - Source Code on{' '}
      <a
        href="https://github.com/nico-martin/todo-pwa"
        target="_blank"
        className="underline hover:text-black"
      >
        GitHub
      </a>
      <br />
      <a
        className="inline-block mt-2"
        href="https://todo-pwa.nico.dev/vue/"
        target="_blank"
      >
        Looking for the same in <span className="underline">VueJS</span>?
      </a>
    </footer>
  );
};

export default Footer;
