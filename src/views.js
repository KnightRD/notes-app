"use strict";

// imports
import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

// function to generate DOM structure for notes
const generateNoteDom = (note) => {
    // create elements
    const noteEl = document.createElement("a");
    const textEl = document.createElement("p");
    // const button = document.createElement("button");
    const statusEl = document.createElement("p");

    // setup remove note button
    // button.textContent = "x";
    // noteEl.appendChild(button);
    // button.addEventListener("click", (e) => {
    //     removeNote(note.id);
    //     saveNotes(notes);
    //     renderNotes(notes, filters);
    // });

    // setup note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title;
    } else {
        textEl.textContent = "Unnamed note";
    }
    textEl.classList.add("list-item__title");
    noteEl.appendChild(textEl);

    // setup link attribute using unique id
    noteEl.setAttribute("href", `/edit.html#${note.id}`);
    // add class for CSS
    noteEl.classList.add("list-item");

    // setup status message
    statusEl.textContent = generateLastEdited(note.updatedAt);
    // add class for CSS
    statusEl.classList.add("list-item__subtitle");
    noteEl.appendChild(statusEl);

    return noteEl;
}

// render notes to the window
const renderNotes = () => {
    const notesEl = document.querySelector("#notes");

    // declare filters and notes
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);

    // returns filtered array of notes based on content of filters.searchText
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    // reset html of notesEl
    notesEl.innerHTML = "";

    if (filteredNotes.length > 0) {
        // renders new notes to html in #notes div
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDom(note);
            notesEl.appendChild(noteEl);
        });
    } else {
        // render message if there are no notes
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "You have no matching notes";
        // add class using javascript
        emptyMessage.classList.add("empty-message");
        notesEl.appendChild(emptyMessage);
    }
}

// function to render edit page using unique note id
const initializeEditPage = (noteId) => {
    const titleEl = document.querySelector("#note-title");
    const bodyEl = document.querySelector("#note-body");
    const dateEl = document.querySelector("#last-edited")
    const notes = getNotes();

    // find note by id
    const note = notes.find((note) => note.id === noteId);

    // if a note is not returned, redirect to index page
    if (!note) {
        location.assign("/index.html");
    }

    // set values (textContent) for inputs using note data
    titleEl.value = note.title;
    bodyEl.value = note.body;
    dateEl.textContent = generateLastEdited(note.updatedAt);
}

// function to update timestamps and return last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()} `;

// exports
export { generateNoteDom, renderNotes, generateLastEdited, initializeEditPage }