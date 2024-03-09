import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className='text-3xl text-left py-8 pb-16'>
      <h1>
        <Link className="font-semibold" to='/'>BookStore manager</Link>
      </h1>
    </header>
  );
}

export default Header;