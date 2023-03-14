const get = document.getElementById.bind(document)
const views = document.querySelectorAll('.view')

//opens the note editor
const showNoteEditor = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-editor').classList.remove('hidden')
    document.forms['note-title-input'].style.display = 'grid'
    document.forms['note-title-input']['new-note-title-input'].focus()
    get('new-note-title-input').value = ''
    get('new-note-title').textContent = ''
    get('new-note-content').value = ''
    get('note-save-btn').style.display = 'block'
    get('save-edit-btn').style.display = 'none'
    toggleHeader()
}
// opens the search view
const showNoteSearch = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-search').classList.remove('hidden')
    toggleHeader()
}
// this is the default view, it contains a list of the notes
const showNotesList = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('notes-list').classList.remove('hidden')
    document.body.querySelector('header').classList.remove('hidden')
}
// opens the note viewer
const showNoteViewer = () => {
    views.forEach(view => {
        view.classList.add('hidden')
    })
    get('note-viewer').classList.remove('hidden')
    toggleHeader()
}
// basically hides the header :-)
const toggleHeader = () => {
    document.body.querySelector('header').classList.add('hidden')
}
const toggleViews = () => {
    switch (true) {
        case (location.hash == '#note-viewer'):
            showNoteViewer()
            break
        case (location.hash == '#note-search'):
            showNoteSearch()
            break
        case (location.hash == '#note-editor'):
            showNoteEditor()
            break
        default:
            showNotesList()
            break
    }
}


// exporting the functions to be used outside the country
// don't worry they're not contraband ;-]=
export default {
    showNoteViewer,
    showNoteSearch,
    showNoteEditor,
    showNotesList,
    toggleViews
}