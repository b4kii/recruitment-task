import React from "react";

export default function InputText({
  id,
  value,
  handleInputChange,
  placeholder,
  children,
  error,
}) {
  return (
    <div className={`flex justify-evenly border-b-4 ${error ? "border-red-600" : "border-gray-300"} relative gap-4`}>
      <label htmlFor={id} className="font-bold">
        {children}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          handleInputChange(event.target.value);
        }}
        className="focus:outline-0 placeholder:text-center w-96"
      />
    </div>
  );
}
