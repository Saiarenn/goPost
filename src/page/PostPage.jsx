import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {HOME_ROUTE} from "../utils/consts";
import {Button, Card, Container, FormControl, Spinner} from "react-bootstrap";
import {deletePostById, fetchPostById, updatePostById} from "../http/postAPI";

const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [editedPost, setEditedPost] = useState(null);
    const {userStorage} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPostById(id).then((data) => {
            console.log(data)
            setPost(data);
            setEditedPost({...data});
        });
    }, []);

    const handleDelete = async () => {
        deletePostById(id).then(() => navigate(HOME_ROUTE));
    };

    const handleEdit = async () => {
        try {
            await updatePostById(id, editedPost);
            navigate(HOME_ROUTE);
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedPost({...editedPost, [name]: value});
    };

    if (!post) {
        return <Spinner animation={"grow"}/>
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Post Detail Page</h1>
            <Card>
                <Card.Body>
                    <FormControl
                        type="text"
                        name="title"
                        value={editedPost.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className={"mb-3"}
                    />
                    <FormControl
                        type="text"
                        name="description"
                        value={editedPost.description}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className={"mb-3"}
                    />
                    <Button className="mt-3" variant="primary" onClick={handleEdit}>
                        Save Changes
                    </Button>
                    <Button className="mt-3 ms-2" variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PostPage;
