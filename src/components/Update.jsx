import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData();
    const navigate = useNavigate();

    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updatedUser = { name, email }

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert(`User information updated successfully!`);
                }
            })
    }

    const goToUsers = () => {
        navigate('/users');
    }

    return (
        <div>
            <h3>Update information of: {loadedUser.name}</h3>
            <form action="" onSubmit={handleUpdate}>
                <input type="text" name='name' defaultValue={loadedUser?.name} />
                <br />
                <input type="email" name='email' defaultValue={loadedUser?.email} />
                <br />
                <button type="submit">Update Information</button>
            </form>
            <br />
            <button onClick={goToUsers}>All Users Page</button>
        </div>
    );
};

export default Update;