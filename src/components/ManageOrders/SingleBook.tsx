import React from "react";
import { Link } from "react-router-dom";

const SingleBookInGrid = ({ book }: any) => {
  return (
    <>
      <Link
        to={"/orders/book-details"}
        state={book}
        className="capitalize text-blue-500 font-bold"
      >
        {book.title + " (" + book.edition + ")"}
      </Link>
      <div className="text-center">{book.count}</div>
      <div className="text-center">{book.count * book.price}</div>
    </>
  );
};

const SingleBookInOrderHistory = ({ books }: any) => {
  return (
    <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 gap-y-1 mb-1 text-xs sm:text-sm">
      <div className="capitalize border-b border-slate-500 pb-1 font-bold text-sm">
        Title
      </div>
      <div className="text-center border-b border-slate-500 pb-1 font-bold text-sm">
        Quantity
      </div>
      <div className="text-center border-b border-slate-500 pb-1 font-bold text-sm">
        Amount
      </div>
      {books.map((book: any) => (
        <SingleBookInGrid key={book._id} book={book} />
      ))}
    </div>
  );
};

export default SingleBookInOrderHistory;
