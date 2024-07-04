import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AddProduct from "./Pages/AddProduct";
import EditProduct from "./Pages/EditProduct";
import ProductDetail from "./Pages/ProductDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./route-portection/ProtectedRoute";
import OpenRoute from "./route-portection/OpenRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <OpenRoute>
        <Login />
      </OpenRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <OpenRoute>
        <Register />
      </OpenRoute>
    ),
  },

  {
    path: "/add-product",
    element: (
      <ProtectedRoute>
        <AddProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/product-details/:id",
    element: (
      <ProtectedRoute>
        <ProductDetail />

      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-product/:id",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
]);
//create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
