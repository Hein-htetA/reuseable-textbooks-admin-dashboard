import React, { ChangeEvent, useState } from "react";
import AddNewBookBtn from "./AddNewBookBtn";
import { newBookDataTransform } from "./NewBookDataTransform";
import { validateNewBookInfo } from "./ValidateNewBookInfo";

// interface SingleDepartmentInterface {
//   fullName: string;
//   shortName: string;
// }

// export const departmentList: SingleDepartmentInterface[] = [
//   {
//     fullName: "Architecture",
//     shortName: "Arch",
//   },
//   {
//     fullName: "Civil Engineering",
//     shortName: "C",
//   },
//   {
//     fullName: "Chemical Engineering",
//     shortName: "ChE",
//   },
//   {
//     fullName: "Computer Engineering and Information Technology",
//     shortName: "CEIT",
//   },
//   {
//     fullName: "Electronic Engineering",
//     shortName: "EC",
//   },
//   {
//     fullName: "Electrical Power Engineering",
//     shortName: "EP",
//   },
//   {
//     fullName: "Food Engineering",
//     shortName: "FE",
//   },
//   {
//     fullName: "Mechanical Engineering",
//     shortName: "Mech",
//   },
//   {
//     fullName: "Mechatronic Engineering",
//     shortName: "McE",
//   },
//   {
//     fullName: "Metallurgical Engineering",
//     shortName: "Met",
//   },
//   {
//     fullName: "Mining Engineering",
//     shortName: "Mn",
//   },
//   {
//     fullName: "Textile Engineering",
//     shortName: "Tex",
//   },
// ];

export interface FormValues {
  title: string;
  author: string;
  edition: string;
  price: string;
  year: string;
  availableChapters: string;
  departments: string;
  ownerName: string;
  ownerRollNo: string;
  amountInStock: string;
}

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
    ownerName: "",
    ownerRollNo: "",
    amountInStock: "",
  });

  const [formErrors, setFormErrors] = useState({
    titleError: false,
    authorError: false,
    editionError: false,
    priceError: false,
    yearError: false,
    availableChaptersError: false,
    departmentsError: false,
    ownerNameError: false,
    ownerRollNoError: false,
    amountInStockError: false,
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleNewBookUpload = () => {
    const formValuesAfterTransform = newBookDataTransform(formValues);
    const errors = validateNewBookInfo(formValuesAfterTransform);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("uploading...book");
    }
  };

  return (
    <div className="flex flex-col p-5 gap-3 text-sm">
      <h1 className="text-center text-lg px-3 mb-3 py-2 border-2 border-slate-500 rounded-xl">
        Add A New Book
      </h1>
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
          value={formValues.year.toString()}
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
          value={formValues.availableChapters.toString()}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Departments - </div>
        <input
          className={formErrors.departmentsError ? inputErrorClass : inputClass}
          placeholder="McE, Mech, EP, C"
          name="departments"
          value={formValues.departments.toString()}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Name - </div>
        <input
          className={formErrors.ownerNameError ? inputErrorClass : inputClass}
          placeholder="Enter Last Owner's Name"
          name="ownerName"
          value={formValues.ownerName}
          onChange={onChangeInput}
        />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-1 items-center">
        <div>Owner Roll No - </div>
        <input
          className={formErrors.ownerRollNoError ? inputErrorClass : inputClass}
          placeholder="Enter Last Owner's Roll Number"
          name="ownerRollNo"
          value={formValues.ownerRollNo}
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
    </div>
  );
};

export default AddNewBook;
