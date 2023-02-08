import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultBookImg } from "../../url";

const SingleBookDetails = () => {
  const { state } = useLocation();
  const { bookInfo } = state;
  const navigate = useNavigate();

  return (
    <div className="px-5 min-h-screen">
      <h3
        className="text-lg text-slate-700 text-center capitalize px-3 border-b-2 border-slate-700 w-fit mx-auto pb-1 mt-5 mb-1 font-bold hover:cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Book Details
      </h3>
      <div className="flex flex-col my-6 sm:grid sm:grid-cols-[auto_1fr] gap-4 ">
        <img
          src={bookInfo.bookPhotoUrl || defaultBookImg}
          alt=""
          className="w-60 mx-auto rounded-md object-fill aspect-[3/4]"
        />
        <div className="flex flex-col gap-y-2 text-sm">
          <div className="font-bold text-center mb-1 text-base sm:text-left">
            {bookInfo.title + "(" + bookInfo.edition + ")"}
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Author - </div>
            <div>{bookInfo.author}</div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Available Chapters -</div>
            <div>
              {bookInfo.availableChapters.some(
                (chapter: number) => chapter === 99
              )
                ? "1 - End"
                : bookInfo.availableChapters.join(", ")}
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-x-1">
            <div>Price - </div>
            <div>{bookInfo.price} Kyats</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBookDetails;
