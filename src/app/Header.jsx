import { h } from 'preact';

const Header = ({ className = '' }) => {
  return (
    <header className={`${className} font-black text-center text-3xl`}>
      ToDo PWA
    </header>
  );
};

export default Header;
