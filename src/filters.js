"use strict";

// create filters object
const filters = {
    searchText: "",
    sortBy: "byEdited"
}

// function to return filters
const getFilters = () => filters

// function to setFilter properties
const setFilters = (updates) => {
    if (typeof updates.searchText === "string") {
        filters.searchText = updates.searchText;
    }
    if (typeof updates.sortBy === "string") {
        filters.sortBy = updates.sortBy;
    }
}

// exports
export { getFilters, setFilters };