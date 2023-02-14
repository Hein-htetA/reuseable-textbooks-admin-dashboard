import React, { ChangeEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { resetUpdateStatus, updateBook } from "../../features/book/bookSlice";
import { defaultBookImg } from "../../url";
import { resizeFile } from "../AddNewBook/AddNewBook";
import AddPhotoBtn from "./AddPhotoBtn";
import UpdateBookBtn from "./UpdateBookBtn";
import { updateBookDataTransform } from "./UpdateBookDataTransform";
import { validateUpdateBookInfo } from "./ValidateUpdateBookInfo";

export interface FormValues {
  _id: string;
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
  bookPhotoId: string;
  bookPhotoUrl: string;
}

const inputClass =
  "px-2 py-1 border-2 border-slate-500 rounded-lg outline-none w-full";
const inputErrorClass =
  "px-2 py-1 border-2 border-red-500 rounded-lg outline-none w-full";

const SingleBookDetails = () => {
  const { state } = useLocation();
  const { bookInfo } = state;
  const [formValues, setFormValues] = useState<FormValues>({
    ...bookInfo,
    bookImage: "",
    year: bookInfo.year.toString(),
    availableChapters: bookInfo.availableChapters.toString(),
    departments: bookInfo.departments.toString(),
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
  const navigate = useNavigate();

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
      bookPhotoUrl: "",
    });
  };

  const handleUpdateBook = () => {
    const formValuesAfterTransform = updateBookDataTransform(formValues);
    const errors = validateUpdateBookInfo(formValuesAfterTransform);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(updateBook(formValuesAfterTransform));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetUpdateStatus());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 text-sm">
      <button
        className="my-3 p-3 bg-red-600 w-fit text-white rounded-full text-xl"
        onClick={() => navigate(-1)}
      >
        {"<---"}
      </button>
      <img
        src={formValues.bookImage || formValues.bookPhotoUrl || defaultBookImg}
        alt="uploadImg"
        className="w-40 rounded-lg aspect-[3/4] mx-auto object-cover"
      />
      <AddPhotoBtn onChangeImage={onChangeImage} removePhoto={removePhoto} />
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
      <UpdateBookBtn handleUpdateBook={handleUpdateBook} />
    </div>
  );
};

export default SingleBookDetails;
