import React, { useState, useEffect, useRef } from "react";
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'
import { Dialog } from '@headlessui/react'
// import { Link } from 'react-router-dom';

function Books() {
  // Books schema:
  // title: {
  // type: String,
  //   default: 'Unknown',
  // },
  // publishingYear: Number,
  // genres: [String],
  // authors: [Types.ObjectId],
  // quantity: Number,
  // price: Number,
  
  const [books, setBooks] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  let [nameInputRef, countryInputRef] = [useRef(null), useRef(null)];
  
  useEffect(() => {
    async function fetchBooks() {
      try {
        const endpoint = 'http://127.0.0.1:3000/api/books';
        const response = await fetch(endpoint);
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
  fetchBooks();
  }, []);
  
  console.log("books:", books);
  
  return (
    <>
      <Header />
      <Sections page="books" />
      <div className="flex justify-between items-center">
        <div className="text-lg">List of all books</div>
        <div><button onClick={() => setIsOpen(true)}  className="text-white bg-black rounded p-2 px-4 hover:shadow-md">Add a book</button></div>
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
                <button /*onClick={addAuthor} */ className="w-full border border-black text-white bg-black rounded p-2 px-4">Add</button>
                <button onClick={() => setIsOpen(false)} className="w-full border border-black text-black rounded p-2 px-4">Cancel</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
      <div className="py-4"></div>
      <div className="grid gap-8 md:grid-cols-3">
        {books.map((book, index) => (
          <div key={index} className="bg-white p-4 rounded-md border">
            <div className="text-lg">
              <span className="font-bold">{
                book.title
              }</span>
              <span className=""> - </span>
              <span className="">1997</span>
            </div>
            <div className="text-sm font-medium">
              <b>Genres</b>: Fiction, Fantasy, Adventure
            </div>
            <div className="text-sm font-medium">
              <b>Authors</b>: Ahmed Sliman, John Doe
            </div>
            <div className="text-sm font-medium">
              <b>Quantity</b>: 342
            </div>
            <div className="text-sm font-medium">
              <b>Price</b>: 1024Dhs
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;