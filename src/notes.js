"use strict"

// imports
import uuidv4 from "uuid/v4";
import moment from "moment";

let notes = [];

// load exisiting notes from localStorage and convert from JSON format or provide an empty array
const loadNotes = () => {
    const notesJSON = localStorage.getItem("notes");
    // try...catch blocks handles error of invalid data in storage, but does not crash program
    try {
        notes = notesJSON ? JSON.parse(notesJSON) : [];
    } catch (e) {
        notes = [];
    }
}

// function that returns notes
const getNotes = () => notes

// function that creates a new note and calls saveNotes
const createNote = () => {
    const timestampNow = moment().valueOf();
    const id = uuidv4();
    notes.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestampNow,
        updatedAt: timestampNow
    });
    saveNotes();
    // returns id so that index can use it to redirect
    return id
}

// function to save notes
// notes not required as function arg - accessed from global scope
const saveNotes = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// function to remove a note from the array and calls saveNotes
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
        notes.splice(noteIndex, 1);
        saveNotes();
    }
}

// function to sort notes byEdited, byCreated, alphabetical
const sortNotes = (sortBy) => {
    if (sortBy === "byEdited") {
        return notes.sort((a, b) => {
            if (a.updatedAt > b.updatedAt) {
                return -1;
            } else if (a.updatedAt < b.updatedAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "byCreated") {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1;
            } else if (a.createdAt < b.createdAt) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === "alphabetical") {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else {
                return 0;
            }
        });
    }
    else {
        return notes;
    }
}

// function to update note title and body - updates updatedAt property for either
const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id);
    if (!note) {
        return
    }
    if (typeof updates.title === "string") {
        note.title = updates.title
        note.updatedAt = moment().valueOf();
    }
    if (typeof updates.body === "string") {
        note.body = updates.body
        note.updatedAt = moment().valueOf();
    }
    saveNotes();
    return note
}

// call loadNotes
notes = loadNotes();

// exports
export { getNotes, createNote, removeNote, sortNotes, updateNote }