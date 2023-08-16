import "./extendedList.css";
import React, { useState } from 'react';

function ChevronUp({className}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  );
}


export default function ExtendedList({ data, title }) {
  const [expanded, setExpanded] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  return (
    <div className={expanded ? 'extendedList-container extendedList-container-expanded' : 'extendedList-container'}>
      <div className="extendedList-title" onClick={toggleExpanded}>
        <p>{title}</p>
        <ChevronUp className={expanded ? 'expanded' : 'notexpanded'} />
      </div>
      {expanded && (
        <div className="extendedList-content">
          {data.map((item) => (
            <label className="item-filter" key={item}>
              <input
                type="checkbox"
                name="item-filter"
                value={item}
                checked={selectedItems.includes(item)}
                onChange={handleCheckboxChange}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
