interface FormValues {
  year: string[];
  availableChapters: string[];
  departments: string[];
  title: string;
  author: string;
  edition: string;
  price: number;
  ownerName: string;
  ownerRollNo: string;
  amountInStock: number;
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

export const validateNewBookInfo = (formValues: FormValues) => {
  const errors: any = {};

  for (const property in formValues) {
    if ((formValues as any)[property].toString().trim().length === 0) {
      //toString() is for year,chapters,departments arrays and price,amountInStock number
      (errors as any)[`${property}Error`] = true;
    }
  }

  const { year, availableChapters, departments, price, amountInStock } =
    formValues;

  if (price < 0) {
    errors.priceError = true;
  }

  if (amountInStock < 0) {
    errors.amountInStockError = true;
  }

  year.every((year) => {
    if (parseInt(year) > 7) {
      errors.yearError = true;
      return false;
    }
    return true;
  });

  availableChapters.every((chapter) => {
    if (chapter.length > 2) {
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
