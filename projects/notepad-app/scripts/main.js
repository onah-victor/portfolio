const get = document.getElementById.bind(document)
const saveNoteTitle = e => {
    e.preventDefault()
    document.forms['note-title-input'].style.display = 'none'
    return false
}
const setNoteTitle = () => {
    let title = get('new-note-title-input').value.trim()
    get('new-note-title').textContent = title
}
const editNoteTitle = () => {
    document.forms['note-title-input'].style.display = 'grid'
}

const returnToHome = () => {
    history.back()
}



export default {
    saveNoteTitle,
    editNoteTitle,
    returnToHome,
    setNoteTitle
}