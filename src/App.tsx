import "bootstrap/dist/css/bootstrap.min.css"
import {useMemo} from "react";
import {Routes, Route, Navigate} from "react-router-dom"
import {Container} from "react-bootstrap"
import {v4 as uuidV4} from "uuid"

import NewNotes from "./components/NewNotes"
import {useLocalStorage} from "./utils/useLocalStorage"

export type Note ={
  id: string
} & NoteData

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
export type Tag ={
  id: string
  lable: string
}
export type RawNote = {
  id: string
} & RawNoteData;

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return {...notes, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
  },[notes, tags])

  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prev => [...prev, tag])
  }

  return (
    <Container className = "my-4">
      <Routes>
          <Route path="/" element={<h1>Hi</h1>}/>
          <Route path="/new" element={<NewNotes onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />}/>
          <Route path="/:id">
            <Route index element={<h1> Show</h1>} />
            <Route path="edit" element={<h1> edit</h1>} />
          </Route>
          <Route path="/new" element={<h1>new</h1>}/>
          <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
  </Container>
  )
}

export default App
