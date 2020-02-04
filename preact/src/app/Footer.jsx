import { h } from 'preact';

const Footer = ({ className = '' }) => {
  return (
    <footer className={`${className} text-center text-gray-500 text-xs`}>
      Created by{' '}
      <a href="https://nico.dev" target="_blank" className="underline">
        Nico Martin
      </a>{' '}
      - Source Code on{' '}
      <a
        href="https://github.com/nico-martin/todo-pwa"
        target="_blank"
        className="underline"
      >
        GitHub
      </a>
    </footer>
  );
};

export default Footer;
