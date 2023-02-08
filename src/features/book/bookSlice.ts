import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { baseUrl } from "../../url";

interface UploadBook {
  title: string;
  edition: string;
  author: string;
  lastOwnerName: string;
  lastOwnerRollNo: string;
  amountInStock: number;
  price: number;
  availableChapters: number[];
  departments: string[];
  year: number[];
}

interface Book {
  _id: string;
  title: string;
  edition: string;
  author: string;
  lastOwnerName: string;
  lastOwnerRollNo: string;
  amountInStock: number;
  bookPhotoId: string;
  bookPhotoUrl: string;
  price: number;
  availableChapters: number[];
  departments: string[];
  year: number[];
}

interface InitialState {
  addedBook: Book;
  addNewBookStatus: "idle" | "loading" | "succeeded" | "updated" | "failed";
  searchResults: Book[];
  searchStatus: "idle" | "loading" | "succeeded" | "updated" | "failed";
}

const initialState: InitialState = {
  addedBook: {
    _id: "",
    title: "",
    edition: "",
    author: "",
    lastOwnerName: "",
    lastOwnerRollNo: "",
    amountInStock: 0,
    bookPhotoId: "",
    bookPhotoUrl: "",
    price: 0,
    availableChapters: [],
    departments: [],
    year: [],
  },
  addNewBookStatus: "idle",
  searchResults: [],
  searchStatus: "idle",
};

const uploadBook = createAsyncThunk<
  { addedNewBook: Book; status: string },
  UploadBook,
  { rejectValue: string; state: RootState }
>("book/uploadBook", async (formValues, { rejectWithValue, getState }) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
    body: JSON.stringify(formValues),
  };

  try {
    const response = await fetch(`${baseUrl}/book`, requestOptions);
    if (!response.ok) {
      throw new Error();
    }
    const { addedNewBook, status } = await response.json();
    return { addedNewBook, status };
  } catch (error) {
    return rejectWithValue("");
  }
});

const searchBookByTitle = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string; state: RootState }
>("book/searchBookByTitle", async (title, { rejectWithValue, getState }) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getState().user.token}`,
    },
  };
  const response = await fetch(
    `${baseUrl}/book/title/${title}`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error();
  }
  const { books } = await response.json();
  return books;
});

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(uploadBook.pending, (state, action) => {
        state.addNewBookStatus = "loading";
      })
      .addCase(uploadBook.fulfilled, (state, action) => {
        if (action.payload.status === "update") {
          state.addNewBookStatus = "updated";
        } else {
          state.addNewBookStatus = "succeeded";
        }

        state.addedBook = action.payload.addedNewBook;
      })
      .addCase(uploadBook.rejected, (state, action) => {
        state.addNewBookStatus = "failed";
      })

      .addCase(searchBookByTitle.pending, (state, action) => {
        state.searchStatus = "loading";
      })
      .addCase(searchBookByTitle.fulfilled, (state, action) => {
        state.searchStatus = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchBookByTitle.rejected, (state, action) => {
        state.searchStatus = "failed";
      });
  },
});

const SelectAddedBook = (state: RootState) => state.book.addedBook;
const SelectAddNewBookStatus = (state: RootState) =>
  state.book.addNewBookStatus;
const SelectSearchStatus = (state: RootState) => state.book.searchStatus;
const SelectSearchResults = (state: RootState) => state.book.searchResults;

export {
  SelectAddedBook,
  SelectAddNewBookStatus,
  SelectSearchResults,
  SelectSearchStatus,
};

export { uploadBook, searchBookByTitle };

export default bookSlice.reducer;
