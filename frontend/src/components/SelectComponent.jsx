// src/components/SelectComponent.jsx
import React, { useState } from 'react';

const SelectComponent = ({ options, onChange,selectedOption }) => {

  const handleChange = (event) => {
    const value = event.target.value;
    if (onChange) onChange(value);
  };

  return (
    <div className="relative">
      <select
        value={selectedOption || ''}
        defaultValue={'SIGN'}
        onChange={handleChange}
        className="block w-full px-4 py-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="" disabled>Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
