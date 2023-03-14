import App from './main.js'
import note from './note.js'
import views from './views.js'


const get = document.getElementById.bind(document)
const backBtns = document.querySelectorAll('.back-btn')
backBtns.forEach(btn => {
    btn.addEventListener('click', App.returnToHome)
})
const removeTrailingHash = () => {
    if (location.hash) location.hash = ''
}
get('save-edit-btn').addEventListener('click', note.saveEditedNote)
get('delete-btn').addEventListener('click', note.deleteNote)
get('edit-btn').addEventListener('click', note.editNote)
get('note-save-btn').addEventListener('click', note.createNewNote)
get('new-note-title').addEventListener('click', App.editNoteTitle)
document.forms['note-title-input']['new-note-title-input'].addEventListener('keyup', App.setNoteTitle)
document.forms['note-title-input'].addEventListener('submit', App.saveNoteTitle)
addEventListener('load', removeTrailingHash)
addEventListener('hashchange', views.toggleViews)