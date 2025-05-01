import React, { useContext, useState } from 'react';
import { filtercontextObj } from '../../Contexts/FilterContext';
import './filter.css';

function Filter() {
    const {filters, setFilters} = useContext(filtercontextObj);
    const [searchTerm, setSearchTerm] = useState('');
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    
    function handleSearch(e) {
        const value = e.target.value;
        setSearchTerm(value);
        
        setFilters((prev) => ({
            ...prev,
            searchTerm: value
        }));
    }
    
    return (
        <div className="filter-container">
            <div className="search-box mb-3">
                <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search meals..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <i className="bi bi-search search-icon"></i>
            </div>
            
            <div className="filter-options">
                <div className="row g-2">
                    <div className="col-md-6">
                        <label className="form-label small fw-medium text-muted mb-1">Food Type</label>
                        <select 
                            name="type" 
                            value={filters.type} 
                            onChange={handleChange} 
                            className="form-select form-select-sm shadow-sm"
                        >
                            <option value="">All Types</option>
                            <option value="Vegetarian">Vegetarian</option>
                            <option value="Non-vegetarian">Non-vegetarian</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Keto">Keto</option>
                        </select>
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label small fw-medium text-muted mb-1">Meal Category</label>
                        <select 
                            name="mealType" 
                            value={filters.mealType} 
                            onChange={handleChange} 
                            className="form-select form-select-sm shadow-sm"
                        >
                            <option value="">All Meals</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Snack">Snack</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;