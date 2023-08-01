import React from 'react';
import './toolbar.css';

function Selector({type, data}){
    return(
        <>
        <div className="toolbar-item-selector">
            <label htmlFor={type}>{type}:</label>
            <select id={type}>
                <option value="">All</option>
                {data.map((item) => {
                    return(
                        <option value={item}>{item}</option>
                    );
                })}
            </select>
        </div>
        </>
    )
  }


export default function ToolBar(){
    const data = ["Toyota", "Mclaren"]
    return (
        <>
        <div className="toolbar-item-container">
            <div className="toolbar-item-searchbar">
                <input type="text" id = "search" placeholder="Search..." />
            </div>
            <div className="toolbar-item-selector">
                <Selector type="Type" data={data}/>
            
            </div>
            <div className="toolbar-item-selector">
                <Selector type="Brand" data={data}/>
            
            </div>
            <div className="toolbar-item-selector">
            <p>Price</p>
            
            </div>
            <div className="toolbar-item-selector">
                <Selector type="Year" data={data}/>
            
            
            </div>
            <div className="toolbar-item-onstock">
                <input type="checkbox" id="onstock" name="onstock" value="onstock" />
                <label htmlFor="onstock">On Stock</label>
            
            </div>
        </div>
        
        </>
    );
}