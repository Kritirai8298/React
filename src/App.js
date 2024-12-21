import React from "react";
import Product from "./component/Product";
import Card from "./component/Card";
import Dashboard from "./component/Dashboard";
import AddProduct from "./component/AddProduct";
import Routelayout from "./component/Routelayout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbarpanel from './component/Navbarpanel'
import Login from "./component/Login";
import Register from "./component/Register";

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Routelayout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/Card" element={<Card />}></Route>
      <Route path="/Product" element={<Product />}></Route>
      <Route path="/AddProduct" element={<AddProduct />}></Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Register" element={<Register />}></Route>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div >
  );
}

export default App;
