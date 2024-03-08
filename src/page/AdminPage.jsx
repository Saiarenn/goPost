import React, {useEffect, useState} from 'react';
import {deleteUser, getAllUsers, updateUser} from "../http/userAPI";
import Container from "react-bootstrap/Container";
import {BsPencilSquare, BsTrash} from 'react-icons/bs';

const AdminPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(data => {
            setUsers(data.map(user => ({...user, isEditing: false})));
        });
    }, []);

    const handleEdit = (id) => {
        setUsers(prevUsers => prevUsers.map(user => user.id === id ? {...user, isEditing: !user.isEditing} : user));
    };

    const handleDelete = (id) => {
        deleteUser(id).then(() => setUsers(prevUsers => prevUsers.filter(user => user.id !== id)))
    };

    const handleSave = (id) => {
        const editedUserData = users.find(user => user.id === id);
        updateUser(id, editedUserData).then(() => {
            setUsers(prevUsers => prevUsers.map(user => user.id === id ? {...user, isEditing: false} : user));
        }).catch(error => {
            console.error('Error updating user:', error);
        });
    };

    return (
        <Container style={{maxWidth: '600px', margin: 'auto'}}>
            <div className="list-group mt-5">
                {users.map(user => (
                    <div
                        key={user.id}
                        className="list-group-item list-group-item-action"
                        style={{
                            borderRadius: '10px',
                            marginBottom: '10px',
                            padding: '15px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <h5 style={{marginBottom: '5px'}}>
                            Username: {user.isEditing ? <input type="text" defaultValue={user.name}/> : user.name}
                        </h5>
                        <p style={{marginBottom: '5px'}}>
                            Email: {user.isEditing ? <input type="email" defaultValue={user.email}/> : user.email}
                        </p>
                        {/*{user.isEditing && <div>*/}
                        {/*    <label>Password:</label>*/}
                        {/*    <input*/}
                        {/*        type="password"*/}
                        {/*        name="password"*/}
                        {/*        value={user.password}*/}
                        {/*        onChange={() => {*/}
                        {/*            */}
                        {/*        }*/}
                        {/*        }*/}
                        {/*        className="form-control"*/}
                        {/*    />*/}
                        {/*</div>*/}
                        {/*}*/}
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <label style={{marginRight: '10px'}}>Is Admin:</label>
                            {user.isEditing ? (
                                <input type="checkbox" checked={user.isAdmin}/>
                            ) : (
                                <input type="checkbox" checked={user.isAdmin} disabled/>
                            )}
                        </div>
                        <div style={{marginTop: '10px'}}>
                            {user.isEditing ? (
                                <button className="btn btn-success me-2" onClick={() => handleSave(user.id)}>
                                    <BsPencilSquare/> Save</button>
                            ) : (
                                <button className="btn btn-primary me-2" onClick={() => handleEdit(user.id)}>
                                    <BsPencilSquare/> Edit</button>
                            )}
                            <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                                <BsTrash/> Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default AdminPage;
