import React from "react";

const Inputbox = ({ labelfor, label, type, placeholder }) => {
  return (
    <div className="">
      <label htmlFor={labelfor}> {label} </label>
      <input
        required="required"
        className="mt-1 mb-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Inputbox;
