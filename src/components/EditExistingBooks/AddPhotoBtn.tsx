import React from "react";

interface Props {
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  removePhoto: () => void;
}

const AddPhotoBtn = ({ onChangeImage, removePhoto }: Props) => {
  return (
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
  );
};

export default AddPhotoBtn;
