import { h } from 'preact';

const Header = ({ className = '' }) => {
  return (
    <header className={`${className} font-bold text-xl py-3`}>
      ToDo PWA (PreactJS)
    </header>
  );
};

export default Header;
