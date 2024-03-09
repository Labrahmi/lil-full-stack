import React from "react";
import { Link } from 'react-router-dom';

function Sections(parms) {
  return (
    <div className=''>
      <div className='text-justify py-4'>
        <div className='flex items-center space-x-4 text-xl'>
          <Link to='/authors' className={ 'hover:underline ' + (parms.page === 'authors' ? 'underline font-semibold' : '') }>Authors</Link>
          <Link to='/books' className={ 'hover:underline ' + (parms.page === 'books' ? 'underline font-semibold' : '') }>Books</Link>
          <Link to='/orders' className={ 'hover:underline ' + (parms.page === 'orders' ? 'underline font-semibold' : '') }>Orders</Link>
        </div>
        <hr className='my-4' />
      </div>
      <div className='py-2'></div>
    </div>
  );
}

export default Sections;