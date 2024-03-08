import React, {useContext, useEffect, useState} from "react";
import {Button, Container} from "react-bootstrap";
import {Context} from "../index";
import PostFilter from "../components/PostFilter";
import {useBooks} from "../hooks/useBooks";
import {useNavigate} from "react-router-dom";
import {fetchPosts} from "../http/postAPI";
import CreatePost from "../components/modals/createPost";
import {HOME_ROUTE} from "../utils/consts";

function Home() {
    const [postVisible, setPostVisible] = useState(false);
    const [postData, setPostData] = useState([]);
    const {userStorage} = useContext(Context);
    const [filter, setFilter] = useState({sort: "", query: ""});
    const sortedAndSearchedBooks = useBooks(postData, filter.sort, filter.query);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPosts().then((data) => {
            console.log(data)
            data ? setPostData(data) : setPostData([])
        });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndSearchedBooks.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    function formatDate(dateString) {
        const date = new Date(dateString);

        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        }).format(date);
    }

    return (
        <Container className="d-flex flex-column">
            <h1 className="mt-4 mb-3">Posts</h1>
            <Button className="my-4 p-2" variant={"outline-dark"} onClick={() => setPostVisible(true)}>
                Add Post
            </Button>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <CreatePost show={postVisible} onHide={() => setPostVisible(false)}/>
            {postData ?
                <div className="list-group">
                    {currentItems.map((post) => (
                        <div
                            key={post.id}
                            className="list-group-item list-group-item-action"
                            onClick={() => navigate("/" + post.id)}
                        >
                            <h5 className="mb-1">{post.title}</h5>
                            <p className="mb-1">{post.description}</p>
                            <p className="mb-1">{formatDate(post.createdPost)}</p>
                        </div>
                    ))}
                </div>
                :
                <div>
                    <h2>No Posts</h2>
                </div>
            }
            <nav className={'mt-3 mx-auto'}>
                <ul className="pagination">
                    {[...Array(Math.ceil(sortedAndSearchedBooks.length / itemsPerPage)).keys()].map((number) => (
                        <li key={number + 1} className="page-item">
                            <a onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </Container>
    );
}

export default Home;
