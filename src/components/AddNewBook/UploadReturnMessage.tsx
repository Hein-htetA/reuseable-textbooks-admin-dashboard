import React from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import {
  SelectAddedBook,
  SelectAddNewBookStatus,
} from "../../features/book/bookSlice";

const UploadReturnMessage = () => {
  const addedBook = useSelector(SelectAddedBook);
  const addNewBookStatus = useSelector(SelectAddNewBookStatus);

  return (
    <div className="min-h-[600px]">
      {addNewBookStatus === "updated" && (
        <div className="flex flex-col justify-center items-center gap-3">
          <div>
            The same Book{" "}
            <span className="mx-2 text-lg text-green-500 font-bold">
              {addedBook.title}
            </span>{" "}
            was found in database. The Amount in Stock is updated
          </div>
          <div className="self-start">
            <pre className="w-fit">{JSON.stringify(addedBook, null, 2)}</pre>
          </div>
        </div>
      )}
      {addNewBookStatus === "succeeded" && (
        <div className="flex flex-col justify-center items-center gap-3 overflow-hidden">
          <div>
            <span className="mx-2 text-lg text-green-500 font-bold">
              {addedBook.title}
            </span>{" "}
            was uploaded successfully.
          </div>
          <div className="self-start">
            <pre>{JSON.stringify(addedBook, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadReturnMessage;
