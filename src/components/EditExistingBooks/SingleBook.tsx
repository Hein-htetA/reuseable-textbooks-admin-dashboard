import React from "react";
import { defaultBookImg } from "../../url";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
  edition: string;
  author: string;
  amountInStock: number;
  bookPhotoId: string;
  bookPhotoUrl: string;
  price: number;
  availableChapters: number[];
  year: number[];
}

interface Props {
  bookInfo: Book;
}

const SingleBook = ({ bookInfo }: Props) => {
  return (
    <div className="w-40 flex flex-col ">
      <Link to="details" state={{ bookInfo }}>
        <img
          src={bookInfo.bookPhotoUrl || defaultBookImg}
          alt="book"
          className="aspect-[3/4] object-cover rounded-lg"
        />
      </Link>
      <div className="mt-2 font-bold leading-5 grow">{bookInfo.title}</div>
      <div className="mb-2 text-xs font-bold text-pink-600">
        {bookInfo.edition}
      </div>
      <div className="text-xs font-bold text-slate-600 grow">
        {bookInfo.author}
      </div>
      <div className="text-sm text-pink-600">{bookInfo.price} Kyats</div>
    </div>
  );
};

export default SingleBook;
