"use strict"

// import
import { initializeEditPage, generateLastEdited } from "./views";
import { updateNote, removeNote } from "./notes";

// element selectors
const titleEl = document.querySelector("#note-title");
const bodyEl = document.querySelector("#note-body");
const lastEditedEl = document.querySelector("#last-edited")
const removeEl = document.querySelector("#remove-note");

// retrieve noteId from location hash
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

// save changes to note title and update updatedAt property
titleEl.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    lastEditedEl.textContent = generateLastEdited(note.updatedAt);
});

// listener to save changes to note body and update updatedAt property
bodyEl.addEventListener("input", (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    lastEditedEl.textContent = generateLastEdited(note.updatedAt);
});

// listener for remove note button
removeEl.addEventListener("click", (e) => {
    removeNote(noteId);
    location.assign("/index.html");
});

// window is a global variable provided by browser
// storage is a function which is triggered on change to global storage
// updates other tabs with newValue information from e
window.addEventListener("storage", (e) => {
    if (e.key === "notes") {
        initializeEditPage(noteId);
    }
});