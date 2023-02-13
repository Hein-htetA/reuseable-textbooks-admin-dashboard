import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { uploadBook } from "../../features/book/bookSlice";
import AddNewBookBtn from "./AddNewBookBtn";
import { newBookDataTransform } from "./NewBookDataTransform";
import UploadReturnMessage from "./UploadReturnMessage";
import { validateNewBookInfo } from "./ValidateNewBookInfo";
import Resizer from "react-image-file-resizer";
import { defaultBookImg } from "../../url";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../features/user/userSlice";

export interface FormValues {
  title: string;
  author: string;
  edition: string;
  price: string;
  year: string;
  availableChapters: string;
  departments: string;
  lastOwnerName: string;
  lastOwnerRollNo: string;
  amountInStock: string;
  bookImage: string;
}

export const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      800,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const inputClass =
  "px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full";
const inputErrorClass =
  "px-2 py-1 border-2 border-red-500 rounded-lg outline-none w-full";

const AddNewBook = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    author: "",
    edition: "",
    price: "",
    year: "",
    availableChapters: "",
    departments: "",
    lastOwnerName: "",
    lastOwnerRollNo: "",
    amountInStock: "",
    bookImage: "",
  });

  const [formErrors, setFormErrors] = useState({
    titleError: false,
    authorError: false,
    editionError: false,
    priceError: false,
    yearError: false,
    availableChaptersError: false,
    departmentsError: false,
    lastOwnerNameError: false,
    lastOwnerRollNoError: false,
    amountInStockError: false,
    imageError: false,
  });

  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0].size > 9000000) {
      setFormErrors({ ...formErrors, imageError: true });
      return;
    }
    try {
      const image = (await resizeFile(e.target.files![0])) as string;
      setFormValues({ ...formValues, bookImage: image });
      setFormErrors({
        ...formErrors,
        imageError: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removePhoto = () => {
    setFormValues({
      ...formValues,
      bookImage: "",
    });
  };

  const handleNewBookUpload = () => {
    const formValuesAfterTransform = newBookDataTransform(formValues);
    const errors = validateNewBookInfo(formValuesAfterTransform);
    setFormErrors(errors);
    // console.log("form after transform", formValuesAfterTransform);
    if (Object.keys(errors).length === 0) {
      dispatch(uploadBook(formValuesAfterTransform));
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col p-5 gap-3 text-sm">
      <h1 className="text-center text-lg px-3 mb-3 py-2 border-2 border-slate-500 rounded-xl">
        Add A New Book
      </h1>
      <img
        src={formValues.bookImage || defaultBookImg}
        alt="uploadImg"
        className="w-40 rounded-lg aspect-[3/4] mx-auto object-cover"
      />
      <div className="flex justify-center gap-3">
        <label htmlFor="inputTag">
          <div className="px-3 py-2 text-white bg-gray-600 rounded-lg">
            Add Photo
          </div>
          <input
            id="inputTag"
            type="file"
            accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={onChangeImage}
            style={{ display: "none" }}
          />
        </label>
        <button
          className="px-3 py-2 bg-red-400 text-white rounded-lg"
          onClick={removePhoto}
        >
          Remove
        </button>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Title - </div>
        <input
          className={formErrors.titleError ? inputErrorClass : inputClass}
          placeholder="Enter Book Title"
          name="title"
          value={formValues.title}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Author - </div>
        <input
          className={formErrors.authorError ? inputErrorClass : inputClass}
          placeholder="Enter Author Name"
          name="author"
          value={formValues.author}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Edition - </div>
        <input
          className={formErrors.editionError ? inputErrorClass : inputClass}
          placeholder="Twelveth Edition"
          name="edition"
          value={formValues.edition}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Price - </div>
        <input
          className={formErrors.priceError ? inputErrorClass : inputClass}
          placeholder="Enter Price"
          name="price"
          value={formValues.price}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Year - </div>
        <input
          className={formErrors.yearError ? inputErrorClass : inputClass}
          placeholder="1,2,3"
          name="year"
          value={formValues.year}
          onChange={onChangeInput}
        />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-x-1 items-center">
        <div>Chapters - </div>
        <input
          className={
            formErrors.availableChaptersError ? inputErrorClass : inputClass
          }
          placeholder="1,2,3,4,5"
          name="availableChapters"
          value={formValues.availableChapters}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Departments - </div>
        <input
          className={formErrors.departmentsError ? inputErrorClass : inputClass}
          placeholder="McE, Mech, EP, C"
          name="departments"
          value={formValues.departments}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Name - </div>
        <input
          className={
            formErrors.lastOwnerNameError ? inputErrorClass : inputClass
          }
          placeholder="Enter Last Owner's Name"
          name="lastOwnerName"
          value={formValues.lastOwnerName}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Roll No - </div>
        <input
          className={
            formErrors.lastOwnerRollNoError ? inputErrorClass : inputClass
          }
          placeholder="Enter Last Owner's Roll Number"
          name="lastOwnerRollNo"
          value={formValues.lastOwnerRollNo}
          onChange={onChangeInput}
        />
      </div>

      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Amount In Stock - </div>
        <input
          className={
            formErrors.amountInStockError ? inputErrorClass : inputClass
          }
          placeholder="Enter Available Stock"
          name="amountInStock"
          value={formValues.amountInStock}
          onChange={onChangeInput}
        />
      </div>

      <AddNewBookBtn handleNewBookUpload={handleNewBookUpload} />

      <UploadReturnMessage />
    </div>
  );
};

export default AddNewBook;
