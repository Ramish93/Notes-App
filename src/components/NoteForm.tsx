import React,{useRef, useState} from 'react'
import {Form, Stack, Row, Col, Button } from "react-bootstrap"
import CreateableReactSelect from "react-select/creatable"
import {Link, useNavigate} from "react-router-dom"
import {v4 as uuidV4} from "uuid"


import {NoteData, Tag} from "../App"

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

const NoteForm = ({onSubmit, availableTags, onAddTag}: NoteFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const textRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            markdown: textRef.current!.value,
            tags: selectedTags
        })
        navigate("..")
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
                        <CreateableReactSelect 
                        onCreateOption={label => {
                            const newTag = {id: uuidV4(), label}
                            onAddTag(newTag)
                            setSelectedTags(prev => [...prev, newTag])
                        }} 
                        isMulti 
                        value={selectedTags.map((tag) => {
                            return {label: tag.label, value: tag.id}
                        })}
                        options={availableTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                        })}
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return {label: tag.label, id: tag.value}
                            }))
                        }}

                        />
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