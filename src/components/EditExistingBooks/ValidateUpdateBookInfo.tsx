interface FormValues {
  _id: string;
  year: number[];
  availableChapters: number[];
  departments: string[];
  title: string;
  author: string;
  edition: string;
  price: number;
  lastOwnerName: string;
  lastOwnerRollNo: string;
  amountInStock: number;
  bookImage: string;
  bookPhotoId: string;
  bookPhotoUrl: string;
}

const departmentsList = [
  "Arch",
  "C",
  "ChE",
  "CEIT",
  "EC",
  "EP",
  "FE",
  "Mech",
  "McE",
  "Met",
  "Mn",
  "Tex",
];

export const validateUpdateBookInfo = (formValues: FormValues) => {
  const errors: any = {};

  for (const property in formValues) {
    if (
      property === "bookImage" ||
      property === "bookPhotoId" ||
      property === "bookPhotoUrl"
    )
      continue;
    if ((formValues as any)[property].toString().trim().length === 0) {
      //toString() is for year,chapters,departments arrays and price,amountInStock number
      (errors as any)[`${property}Error`] = true;
    }
  }

  const { year, availableChapters, departments, price, amountInStock } =
    formValues;

  if (price < 0 || !price) {
    errors.priceError = true;
  }

  if (amountInStock < 0 || !amountInStock) {
    errors.amountInStockError = true;
  }

  year.every((year) => {
    if (year > 7 || !year) {
      errors.yearError = true;
      return false;
    }
    return true;
  });

  availableChapters.every((chapter) => {
    if (chapter > 99 || !chapter) {
      errors.availableChaptersError = true;
      return false;
    }
    return true;
  });

  departments.every((department) => {
    if (departmentsList.some((depInList) => depInList === department)) {
      return true;
    }
    errors.departmentsError = true;
    return false;
  });

  return errors;
};
