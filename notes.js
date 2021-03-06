// dependencies //

const fs = require("fs");
const util = require("util");
                // read/write//
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

//constructor defines notes//
class Notes {
    constructor() {
        this.noteposition = 0;
    }
    read() {
        return readFileAsync("db/db.json", "utf8");

    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }
    getNotes() {
        console.log("get notes")
        return this.read().then(notes => {
            console.log(notes)
            let notesArray;
            try {
                notesArray = [].concat(JSON.parse(notes));
            }
            catch (err) {
                notesArray = [];
            }
            return notesArray;
        })

    }
    addNotes(note) {
        console.log("add notes");
        const { title, text } = note;
        const newNote = { title, text, id: ++this.noteposition }
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updateNotes => this.write(updateNotes))
            .then(() => newNote)

    }
    removeNote(id) {
        console.log("remove notes");
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== parseInt(id)))
            .then(updatedNotes => this.write(updatedNotes))
    }
}

module.exports = new Notes();