import React from "react";
import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'


function Home() {
  return (
    <>
      <Header />
      <Sections />
      <div>Hello and welcome to the Bookstore</div>
      <div className="py-4">
        <p>
          This is a simple bookstore application that allows you to manage authors, books and orders, it is built using React and TailwindCSS.
          it does use a REST API to store the data, so you can add, edit, delete and view the authors, books and orders.
          simply click on the links above to navigate to the different pages.
        </p>
      </div>
      <div className="py-4 md:py-2"></div>
      <div className="grid gap-8 md:grid-cols-3 grid-cols-1">
        <Link to='/authors' className="bg-white p-6 py-16 rounded-lg border flex flex-col justify-center items-center relative select-none cursor-pointer transition-all duration-200 ease-in-out">
          <h2 className="text-2xl font-semibold">Authors</h2>
          <p>Authors page</p>
          <img className="w-32 absolute blur-[1px] left-16 opacity-20 select-none" src="/one.png" alt="Authors" />
        </Link>
        <Link to='/books' className="bg-white p-6 py-16 rounded-lg border flex flex-col justify-center items-center relative select-none cursor-pointer transition-all duration-200 ease-in-out">
          <h2 className="text-2xl font-semibold">Books</h2>
          <p>Books page</p>
          <img className="w-32 absolute blur-[1px] left-16 opacity-20 select-none" src="/two.png" alt="Books" />
        </Link>
        <Link to='/orders' className="bg-white p-6 py-16 rounded-lg border flex flex-col justify-center items-center relative select-none cursor-pointer transition-all duration-200 ease-in-out">
          <h2 className="text-2xl font-semibold">Orders</h2>
          <p>Orders page</p>
          <img className="w-32 absolute blur-[1px] left-16 opacity-20 select-none" src="/three.png" alt="Orders" />
        </Link>
      </div>
    </>
  );
}

export default Home;