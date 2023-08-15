import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./allcarpage.css"

import axios from 'axios';

function SortItem({data,title}) {
    return (
      <div className="title-link">
        <label>{title}:</label>
          <select>
          {data.map((item) => (
            <option value={item}>{item}</option>
          ))}
          </select>
      </div>
    );
  }
export default function AllCarView({brand, type}) {
    return (
        <>
        <div className="dashboard-display-container">
        <div className="dashboard-title">
            <div className="title">
                <h1>All Cars</h1>
            </div>
            <div className="title-links">
        
          
        <SortItem data = {brand} title="Brand"/>
        <SortItem data = {brand} title="Type"/>
        
      </div>
    </div>
    </div>
        </>
    );
}
