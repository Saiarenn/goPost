import React, {useContext, useState} from "react";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {Context} from "../../index";
import {createPost} from "../../http/postAPI";

const CreatePost = ({ show, onHide }) => {
    const { userStorage } = useContext(Context);
    const [post, setPost] = useState({
        title: "",
        description: ""
    })
    const addPost = () => {
        createPost(post).then(data => {
            setPost({
                title: "",
                description: ""
            })
            onHide()
        })
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new Post
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Enter the post title"}
                        value={post.title}
                        onChange={e => setPost({...post, title: e.target.value})}
                        className={'mb-3'}
                    />
                    <Form.Control
                        placeholder={"Enter the post description"}
                        value={post.description}
                        onChange={e => setPost({...post, description: e.target.value})}
                        className={'mb-3'}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addPost}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreatePost;