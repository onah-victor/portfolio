const get = document.getElementById.bind(document)
const viewNote = event => {
    let note = event.currentTarget
    let noteId = note.id
    let notes = window.notes
    for (let note of notes) {
        if (note.id == noteId) {
            let noteIndex = notes.indexOf(note)
            let noteViewerTitle = get('note-viewer-title')
            noteViewerTitle.textContent = notes[noteIndex].title
            noteViewerTitle.dataset.id = notes[noteIndex].id
            get('note-viewer-content').textContent = notes[noteIndex].content
        }
    }
}
