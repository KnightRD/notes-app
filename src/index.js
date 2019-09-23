"use strict"

// imports
import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

// intial render
renderNotes();

// listener for create note button - and save to local storage in JSON format
document.querySelector("#create-note").addEventListener("click", (e) => {
    const id = createNote();
    // redirect to newly created note using unique id
    location.assign(`/edit.html#${id}`)
});

// listener for search input - input event reacts to every input change
document.querySelector("#search").addEventListener("input", (e) => {
    // changes contents of filter.searchText to input text value
    setFilters({
        searchText: e.target.value
    });
    renderNotes();
});

// listener for drop down filter feature
document.querySelector("#filter-by").addEventListener("change", (e) => {
    setFilters({
        sortBy: e.target.value
    });
    renderNotes();
});

// updates duplicate tabs with newValue information from e
window.addEventListener("storage", (e) => {
    if (e.key = "notes") {
        // no longer required - not sure why
        // notes = JSON.parse(e.newValue);
        renderNotes();
    }
});