import React, { useState, useEffect, useRef } from "react";
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'
import { Dialog } from '@headlessui/react'
import { Link } from 'react-router-dom';


function Authors() {
  let [isOpen, setIsOpen] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [countryInputRef, nameInputRef] = [useRef(null), useRef(null)];

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const endpoint = 'http://127.0.0.1:3000/api/authors';
        const response = await fetch(endpoint);
        const authorsData = await response.json();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    }

    fetchAuthors();
  }, []);
  
  console.log("authors:", authors);
  
  const addAuthor = async () => {
    try {
      const name = nameInputRef.current.value;
      const country = countryInputRef.current.value;
      if (!name || !country) {
        console.error("Name and country are required");
        setIsOpen(false);
        return;
      }
      const query = `name=${name}&country=${country}`;
      const endpoint = 'http://127.0.0.1:3000/api/authors/add?' + query;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("data:", data);
      setAuthors([...authors, data]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding author:", error);
    }
  }
  
  return (
    <>
      <Header />
      <Sections page="authors" />
      <div className="flex items-center justify-between">
        <div className="text-lg">List of all authors</div>
        <div><button onClick={() => setIsOpen(true)} className="text-white bg-black rounded p-2 px-4 hover:shadow-md">Add an author</button></div>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen h-screen items-center justify-center md:p-4 bg-black bg-opacity-20 backdrop-blur-[6px]">
            <Dialog.Panel className="flex flex-col justify-center w-full h-full md:h-auto max-w-full md:max-w-md md:rounded-lg bg-white p-4 md:p-6 md:border border-black md:shadow-xl">
              <Dialog.Title><b className="text-xl">Add new Author</b></Dialog.Title>
              <div className="p-2">
                <div className="py-4 flex flex-col space-y-4">
                  {/*  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author name</label>
                    <input ref={nameInputRef} type="text" placeholder="Name" className="w-full border border-black rounded p-2 px-4 bg-transparent" />     
                  </div>
                  {/*  */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input ref={countryInputRef} type="text" placeholder="Country" className="w-full border border-black rounded p-2 px-4 bg-transparent" />
                  </div>
                  {/*  */}
                </div>
              </div>
              <div className="flex space-x-6 justify-evenly p-2">
                <button onClick={addAuthor} className="w-full border border-black text-white bg-black rounded p-2 px-4">Add</button>
                <button onClick={() => setIsOpen(false)} className="w-full border border-black text-black rounded p-2 px-4">Cancel</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
      <div className="py-4"></div>
      {authors.length === 0 && <div className="text-lg font-thin">No authors found!</div>}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6">
        {authors.map((author, index) => {
          return (
            <Link to="/books" key={index} className="bg-white border p-4 rounded relative transition-all duration-300 ease-in-out">
              <div className="">{author.name}</div>
              <div className="font-light">{author.country}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Authors;