import "bootstrap/dist/css/bootstrap.min.css"
import {Routes, Route, Navigate} from "react-router-dom"
import {Container} from "react-bootstrap"

import NewNote from "./components/NewNotes"

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
}
export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", [])
  return (
    <Container className = "my-4">
      <Routes>
          <Route path="/" element={<h1>Hi</h1>}/>
          <Route path="/new" element={<NewNote />}/>
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
