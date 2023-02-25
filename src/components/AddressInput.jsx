import React from "react";

export default function InputText({
  id,
  value,
  handleInputChange,
  placeholder,
  children,
  setError,
  error,
}) {
  return (
    <div className={`flex justify-evenly border-b-4 relative gap-4`}>
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
        onFocus={() => {
          setError(null);
        }}
        className="focus:outline-0 placeholder:text-center w-96"
      />
    </div>
  );
}
