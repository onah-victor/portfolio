const get = document.getElementById.bind(document)
const noteEditor = get('note_editor')
const notesList = get('notes_list')
const noteSearch = get('note_search')
const views = document.getElementsByClassName('view')
class Note{
    constructor(title, content, dateCreated, timeCreated, id, edited) {
        this.title = title
        this.content = content
        this.dateCreated = dateCreated
        this.timeCreated = timeCreated
        this.id = id
        this.edited = false
    }
}
const notes = []
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months = ['January', 'February','March','April','May','June','July','August','September','October','November','December']
const createNewNote = (title, content) => {
    const date = new Date()
    let month, day, monthDay, year
    day = days[date.getDay(date)]
    monthDay = date.getDate()
    month = months[date.getMonth()]
    year = date.getFullYear()
    let dateCreated = `${day} ${monthDay}, ${year}`
    let timeCreated = `${date.getHours()} : ${date.geMinutes}`
    let id = date.getTime()
    let note = new Note(title, content, dateCreated, timeCreated, id, false)
    notes.push(note)
    let HTMLNoteFragment = `
    <div class="note" id="${id}">
      <div class="note_title">${title}</div>
      <div class="note_title">${content.substring(17)}...</div>
    </div>
    `
    get('notes').insertAdjacentHTML('beforeend', HTMLNoteFragment)
}
const saveNote = () => {
    let title = get('note_title').textContent.trim()
    let content = get('note').textContent.trim()
    if (title == '') {
        history.back()
    } else {
        createNewNote(title, content)
        history.back()
    }
    console.log(notes.length)
}
const showNoteEditor = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    noteEditor.classList.remove('hidden_view')
    get('note_title_input').focus()
}
const showNoteSearch = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    noteSearch.classList.remove('hidden_view')
    get('searchbox').focus()
}
const showNotesList = () => {
    for (let view of views) {
        if (!(view.classList.contains('hidden_view'))) view.classList.add('hidden_view')
    }
    notesList.classList.remove('hidden_view')
}
const updateNoteTitle = () => {
    get('note_title').textContent = get('note_title_input').value
}
const saveNoteTitle = (event) => {
    event.preventDefault()
    get('new_note_title').style.display = 'none'
    get('note').focus()
    return false
}
const toggleViewsOnHashChange = (event) => {
    event.preventDefault()
    if (location.hash != '') {
        let hashFragment = location.hash
        switch (hashFragment) {
            case ('#note_editor'):
            showNoteEditor()
            document.body.children[0].style.display = 'none'
            break
            case ('#note_search'):
            showNoteSearch()
            document.body.children[0].style.display = 'none'
            break
            default:
            showNotesList()
            document.body.children[0].style.display = 'flex'
            break
        }
    } else {
        showNotesList()
        document.body.children[0].style.display = 'flex'
    }
}
get('note_title_input').addEventListener('keyup', updateNoteTitle)
document.forms['new_note_title'].addEventListener('submit', saveNoteTitle)
addEventListener('hashchange', toggleViewsOnHashChange)
get('note_editor_back_btn').addEventListener('click', () => history.back())
get('note_search_back_btn').addEventListener('click', () => history.back())
get('done').addEventListener('click', saveNote)
addEventListener('load', () => {
    if (location.hash) {
        location.hash = ''
    }
})