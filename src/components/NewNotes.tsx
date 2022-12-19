import React from 'react'
import NoteForm from "./NoteForm"
import NoteData from "NoteForm"


type NewNoteProps = {
  onSubmit: (data: NoteData) => void
}

const NewNotes = ({onSubmit}: NewNoteProps) => {
  return (
    <>
    <h1 className="mb-4">New Notes</h1>
    <NoteForm onSubmit={onSubmit} />
    </>
  )
}

export default NewNotes