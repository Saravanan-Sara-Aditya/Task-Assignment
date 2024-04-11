import React, { useState } from 'react';
import { Tag } from 'antd';

const options = ['UI/UX', 'Frontend', 'Backend', 'QA', 'DevOps', 'Graphic Designing'];

const MultiSelectOptions = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      {options.map((option) => (
        <Tag
          key={option}
          color={selectedOptions.includes(option) ? 'blue' : ''}
          style={{
            cursor: 'pointer',
            marginBottom: '5px',
            paddingLeft:"10px",
            paddingRight:"10px",
            paddingTop:"4px",
            paddingBottom:"4px",
            border:selectedOptions.includes(option) ? 'none' : '1px solid #c9ccce',
            backgroundColor: selectedOptions.includes(option) ? '#4945c4' : '#f3f3f3',
            color: selectedOptions.includes(option) ? 'white' : '#464f60'
          }}
          onClick={() => toggleOption(option)}
        >
          {option}
        </Tag>
      ))}
    </div>
  );
};

export default MultiSelectOptions;
