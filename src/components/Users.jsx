import React, { useState } from 'react';
import { use } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = id => {
        console.log(id);
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    alert('User deleted successfully');
                    const remaining = users.filter(user => user._id != id);
                    setUsers(remaining);
                }
            });
    }

    return (
        <div>
            <h3>Number of Users: {users.length}</h3>
            <div>
                {
                    users.map(user => <p key={user._id}>Name: {user.name},
                        Email: {user.email},
                        <Link to={`/update/${user._id}`}>
                            <button>Update</button>
                        </Link>
                        <button onClick={() => handleDelete(user._id)}>DEL</button>
                    </p>)
                }
            </div>
        </div>
    );
};

export default Users;