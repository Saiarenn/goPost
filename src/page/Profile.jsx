import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {deleteUser, updateUser} from "../http/userAPI";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const Profile = () => {
    const {userStorage} = useContext(Context)
    console.log(userStorage.user)
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(userStorage.user);
    const router = useNavigate()

    const handleInputChange = (e) => {
        const {name, value, type, checked} = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setEditedUser({...editedUser, [name]: inputValue});
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        updateUser(editedUser.id, editedUser);
        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteUser(editedUser.id).then(() => {
            userStorage.setUser({})
            userStorage.setIsAuth(false)
            router(LOGIN_ROUTE)
        })
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Profile</h5>
                    <div className="form-group">
                        <label>Name:</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            <p>{userStorage.user.name}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        ) : (
                            <p>{userStorage.user.email}</p>
                        )}
                    </div>
                    <div className="form-group">
                        {isEditing && <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={editedUser.password}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                        }
                    </div>
                    <div className="form-group">
                        <label>Admin:</label>
                        <p>{userStorage.user.isAdmin ? 'Yes' : 'No'}</p>
                    </div>
                    {isEditing ? (
                        <button onClick={handleSave} className="btn btn-primary me-2">Save</button>
                    ) : (
                        <button onClick={handleEdit} className="btn btn-secondary me-2">Edit</button>
                    )}
                    <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Profile;
