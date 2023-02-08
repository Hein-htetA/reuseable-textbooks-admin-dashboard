import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Welcome from "./components/Index/Welcome";
import MainSharedLayout from "./SharedLayouts/MainSharedLayout";
import AddNewBook from "./components/AddNewBook/AddNewBook";
import EditExistingBooks from "./components/EditExistingBooks/EditExistingBooks";
import ManageOrders from "./components/ManageOrders/ManageOrders";
import SingleBookDetails from "./components/EditExistingBooks/SingleBookDetails";
import EditBooksSharedLayout from "./SharedLayouts/EditBooksSharedLayout";
import BooksInList from "./components/EditExistingBooks/BooksInList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSharedLayout />}>
          <Route index element={<Welcome />} />
          <Route path="/add-new-book" element={<AddNewBook />} />
          <Route
            path="/edit-existing-books"
            element={<EditBooksSharedLayout />}
          >
            <Route index element={<BooksInList />} />
            <Route path="details" element={<SingleBookDetails />} />
          </Route>
          <Route path="/orders" element={<ManageOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
