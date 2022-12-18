import "bootstrap/dist/css/bootstrap.min.css"
import {Routes, Route, Navigate} from "react-router-dom"
import {Container} from "react-bootstrap"

import NewNote from "./components/NewNotes"

type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
type Tag ={
  id: string
  lable: string
}
function App() {
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
