import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home'
import Authors from './pages/authors'
import Books from './pages/books'
import Orders from './pages/orders'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
