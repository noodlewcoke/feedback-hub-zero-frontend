import { useState } from "react";

export function TextInput({ labelName, placeHolder, inputSetVariable }) {
  return (
    <div className="flex md:flex-auto md:flex-grow-0 md:flex-shrink-0 md:w-1/2 w-full px-2">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-base font-semibold">
            {labelName}
          </span>
        </div>
        <input
          type="text"
          placeholder={placeHolder}
          className="input input-bordered input-md w-full  h-10"
          required={true}
          onChange={(e) => {
            inputSetVariable(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export function TextInputSearch({ labelName, placeHolder, inputSetVariable }) {
  return (
    <div className="flex w-full px-2">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-base font-semibold">
            {labelName}
          </span>
        </div>
        <input
          type="text"
          required={true}
          placeholder={placeHolder}
          className="input input-bordered input-md w-full  h-10"
          onChange={(e) => {
            inputSetVariable(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export function TextLargeInput({
  labelName,
  placeHolder,
  inputSetVariable,
  wFull,
}) {
  return (
    <div className="flex w-full px-2">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-base font-semibold">
            {labelName}
          </span>
        </div>
        <textarea
          placeholder={placeHolder}
          className={`textarea textarea-bordered input-md w-full ${
            wFull ? "h-40" : "h-20"
          } `}
          onChange={(e) => {
            inputSetVariable(e.target.value);
          }}
        />
      </label>
    </div>
  );
}

export function SelectInput({
  labelName,
  placeHolder,
  inputSetVariable,
  options,
}) {
  return (
    <div className="flex md:flex-auto md:flex-grow-0 md:flex-shrink-0 md:w-1/2 w-full px-2">
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-base font-semibold">
            {labelName}
          </span>
        </div>
        <select required className="select select-bordered select-md w-full" onChange={(e) => {inputSetVariable(e.target.value);}}>
          <option disabled selected>Select {placeHolder}</option>
          {options.map((option, index) => (
            <option key={option+"132"} value={index+1}>{option}</option>
          )) }
        </select>
      </label>
    </div>
  );
}

export function FileInput({ inputSetVariable }) {
  return (
    <div className="flex md:flex-auto md:flex-grow-0 md:flex-shrink-0 md:w-1/2 w-full px-2">
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text font-semibold">Choose File Here</span>
        </div>
        <input
          type="file"
          multiple
          className="file-input file-input-bordered file-input-md w-full max-w-xs "
          onChange={(e) => {
            inputSetVariable(e.target.files);
          }}
        />
      </label>
    </div>
  );
}

export const CustomFileInput = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("No file chosen");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Custom label styled as a button */}
      <label
        htmlFor="fileInput"
        className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Choose File
      </label>

      {/* Display the selected file name */}
      <p className="mt-2 text-gray-600">{fileName}</p>
    </div>
  );
};
