import React, { useState, useEffect, useRef } from "react";
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'
import { Dialog } from '@headlessui/react'
// import { Link } from 'react-router-dom';

function Books() {
  let [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [
    bookNameRef,
    publishingYearRef,
    genresRef,
    authorRef,
    quantityRef,
    priceRef
    ] = [ useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]
  
  useEffect(() => {
    async function fetchBooks() {
      try {
        const endpoint = 'http://localhost:3000/api/books';
        const response = await fetch(endpoint);
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    async function fetchAuthors() {
      try {
        const endpoint = 'http://localhost:3000/api/authors';
        const response = await fetch(endpoint);
        const authorsData = await response.json();
        setAuthors(authorsData);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    }
  
  fetchAuthors();
  fetchBooks();
  
  }, []);
  
  const addBook = async () => {
    try {
      let bookToAdd = {
        "title": bookNameRef.current.value,
        "publishingYear": publishingYearRef.current.value,
        "genres": genresRef.current.value.split(' '),
        "authors": authorRef.current.value.split(' '),
        "quantity": quantityRef.current.value,
        "price": priceRef.current.value
      }
      let body = {
        booksList: [
          bookToAdd
        ]
      }
      const endpoint = 'http://localhost:3000/api/books/add';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      console.log("data:", data);
      setBooks([...books, bookToAdd]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  }
  
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
              <Dialog.Title><b className="text-xl">Add new Book</b></Dialog.Title>
              <div className="p-2">
                <div className="py-4 flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Book name</label>
                    <input ref={bookNameRef} type="text" placeholder="Name" className="w-full border border-black rounded p-2 px-4 bg-transparent" />     
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Publishing Year</label>
                    <input ref={publishingYearRef} type="text" placeholder="1917" className="w-full border border-black rounded p-2 px-4 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Genres <span className="text-xs">(separate by space)</span></label>
                    <input ref={genresRef} type="text" placeholder="Fiction Drama Anything" className="w-full border border-black rounded p-2 px-4 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <select defaultValue={"0"} ref={authorRef} type="text" className="w-full border border-black rounded p-2 bg-transparent cursor-pointer">
                      <option defaultValue={"0"} disabled value="0">Select an author</option>
                      {authors.map((author, index) => {
                        return <option key={index} value={author._id}>{author.name}</option>
                      })}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input ref={quantityRef} type="number" placeholder="10" className="w-full border border-black rounded p-2 px-4 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input ref={priceRef} type="number" placeholder="137.17" className="w-full border border-black rounded p-2 px-4 bg-transparent" />
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 justify-evenly p-2">
                <button onClick={addBook} className="w-full border border-black text-white bg-black rounded p-2 px-4">Add</button>
                <button onClick={() => setIsOpen(false)} className="w-full border border-black text-black rounded p-2 px-4">Cancel</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
      <div className="py-4"></div>
      {books.length === 0 && <div className="text-lg font-thin">No books found!</div>}
      <div className="grid gap-8 md:grid-cols-3">
        {books.map((book, index) => (
          <div key={index} className="bg-white p-4 rounded-md border">
            <div className="text-lg">
              <span className="font-bold">{
                book.title
              }</span>
              <span className=""> - </span>
              <span className="">
                {
                  book.publishingYear
                }
              </span>
            </div>
            <div className="text-sm font-medium">
              <b>Genres</b>: {
                book.genres.join(', ')
              }
            </div>
            <div className="text-sm font-medium">
              <b>Authors</b>: {
                book.authors.map((authorId, index) => {
                  const author = authors.find(author => author._id === authorId);
                  return author.name;
                }
                ).join(', ')
              }
            </div>
            <div className="text-sm font-medium">
              <b>Quantity</b>: {
                book.quantity
              }
            </div>
            <div className="text-sm font-medium">
              <b>Price</b>: {
                book.price
              } $
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Books;