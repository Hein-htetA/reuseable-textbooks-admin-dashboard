import { FormValues } from "./AddNewBook";

export const newBookDataTransform = (formValues: FormValues) => {
  const { year, availableChapters, departments } = formValues;
  const yearArray = year.split(",").map((year) => parseInt(year.trim()));
  const availableChaptersArray = availableChapters
    .split(",")
    .map((chapter) => parseInt(chapter.trim()));
  const departmentsArray = departments
    .split(",")
    .map((department) => department.trim());

  return {
    ...formValues,
    year: yearArray,
    availableChapters: availableChaptersArray,
    departments: departmentsArray,
    amountInStock: parseInt(formValues.amountInStock),
    price: parseInt(formValues.price),
  };
};
