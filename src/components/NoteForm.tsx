import React,{useRef} from 'react'
import {Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateableReactSelect from "react-select/creatable"
import {Link} from "react-router-dom"

const NoteForm = ({obSubmit}) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const textRef = useRef<HTMLTextAreaElement>(null)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

    }
  return (
    <Form onSubmit={handleSubmit}>
        <Stack gap={4}>
            <Row>
                <Col>
                    <Form.Group controlId = "title">
                        <Form.Label>
                            Title
                        </Form.Label>
                        <Form.Control ref={titleRef} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId = "tags">
                        <Form.Label>
                            Tags
                        </Form.Label>
                        <CreateableReactSelect isMulti/>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group controlId = "markdown">
                <Form.Label>
                    Body
                </Form.Label>
                <Form.Control required as="textarea" ref={textRef} rows={10}/>
            </Form.Group>
            <Stack direction="horizontal" gap={3} className="justify-content-end">
                <Button type="submit" variant="success">Save</Button>
                <Link to="..">
                <Button type="button" variant="outline-secondary">Cancel</Button>
                </Link>
            </Stack>
        </Stack>
    </Form>
  )
}

export default NoteForm