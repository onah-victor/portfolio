import App from './main.js'
import callback from './callbacks.js'


const get = document.getElementById.bind(document)
const backBtns = document.querySelectorAll('.back-btn')
backBtns.forEach(btn => {
    btn.addEventListener('click', App.returnToHome)
})
const addedNotes = document.getElementsByClassName('note')
addedNotes.forEach(addedNote => {
    addedNote.addEventListener('click', App.viewNote)
})
const removeTrailingHash = () => {
    if (location.hash) location.hash = ''
}
get('note-save-btn').addEventListener('click', App.createNewNote)
get('new-note-title').addEventListener('click', App.editNoteTitle)
document.forms['note-title-input']['new-note-title-input'].addEventListener('keyup', App.setNoteTitle)
document.forms['note-title-input'].addEventListener('submit', App.saveNoteTitle)
addEventListener('load', removeTrailingHash)
addEventListener('hashchange', App.toggleViews)