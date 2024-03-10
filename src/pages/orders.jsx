import React, { useMemo, useRef, useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import Header from '../components/Header.jsx'
import Sections from '../components/Sections.jsx'
import { Dialog } from '@headlessui/react'
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

function Orders() {
  
  let [isOpen, setIsOpen] = useState(false);
  const [selectedBooks, setselectedBooks] = useState([]);
  const [fetchedOrders, setFetchedOrders] = useState([]);
  // const [authors, setAuthors] = useState([]);
  // const [countryInputRef, nameInputRef] = [useRef(null), useRef(null)];
  
  
  
  useEffect(() => {
    async function fetchOrders() {
      try {
        const endpoint = 'http://localhost:3000/api/orders';
        const response = await fetch(endpoint);
        const data = await response.json();
        setFetchedOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    
    fetchOrders();
    
  } , []);
  
  const fetchUserList = async function(title) {
    return await fetch('http://localhost:3000/api/books/search?' + new URLSearchParams({ title }))
      .then((response) => response.json())
      .then((body) =>
        body.map((book) => ({
          label: book.title,
          value: book._id,
        })),
      );
  }
  
  const addOrder = async () => {    
    try {
      let orderItems = [];
      for (let book of selectedBooks) {
        let orderItem = {
          "bookId": book.value,
          "amount": 1
        }
        orderItems.push(orderItem);
      }
      let body = {
        items: orderItems
      }
      const endpoint = 'http://localhost:3000/api/orders/add';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      setFetchedOrders([...fetchedOrders, data]);
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  }
  
  return (
    <>
      <Header />
      <Sections page="orders" />
      <div className="flex justify-between items-center">
        <div className="text-lg">List of all orders</div>
        <div><button onClick={() => setIsOpen(true)}  className="text-white bg-black rounded p-2 px-4 hover:shadow-md">New Order</button></div>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 flex w-screen h-screen items-center justify-center md:p-4 bg-black bg-opacity-20 backdrop-blur-[6px]">
            <Dialog.Panel className="flex flex-col justify-center w-full h-full md:h-auto max-w-full md:max-w-md md:rounded-lg bg-white p-4 md:p-6 md:border border-black md:shadow-xl">
              <Dialog.Title><b className="text-xl">New Order</b></Dialog.Title>
              <div className="p-2">
                <div className="py-4 flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Search for your books</label>
                    <DebounceSelect
                      mode="multiple"
                      value={selectedBooks}
                      placeholder="Select Books"
                      fetchOptions={fetchUserList}
                      onChange={(newValue) => {
                        setselectedBooks(newValue);
                      }}
                      style={{
                        width: '100%',
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex space-x-6 justify-evenly p-2">
                <button onClick={addOrder} className="w-full border border-black text-white bg-black rounded p-2 px-4">Add</button>
                <button onClick={() => {
                  setIsOpen(false);
                  setselectedBooks([]);
                }} className="w-full border border-black text-black rounded p-2 px-4">Cancel</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
      <div className="py-4"></div>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center p-4 font-semibold md:justify-start justify-between">
          <div className="md:w-[60%] text-base">Order ID</div>
          <div className="md:w-[15%] text-base">Total Price</div>
          <div className="md:w-[25%] text-center text-base hidden md:block">Date</div>
        </div>
        {fetchedOrders.map((order) => (
          <div key={order._id} className="flex items-center md:justify-start justify-between bg-white p-4 rounded-md border border-zinc-900 hover:shadow-lg transition-all duration-200 ease-in cursor-default">
            <div className="md:w-[60%]"><div className="hover:bg-gray-50 border w-fit p-2 px-4 rounded">{order._id}</div></div>
            <div className="md:w-[15%] flex md:justify-start justify-between">
              <div className='text-center bg-green-400 p-2 rounded-md border border-green-700 min-w-24 h-fit'>{order.totalPrice}$</div>
            </div>
            <div className="md:w-[25%] text-center hidden md:block">{
              new Date(order.date).toLocaleDateString("en-US")
            }</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Orders;