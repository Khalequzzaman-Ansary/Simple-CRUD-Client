import { useState } from 'react'
import './App.css'
import { data, useNavigate } from 'react-router-dom';

function App() {
  const handleAddUser = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.insertedId) {
          alert("User added successfully")
          form.reset();
        }
      })
  }

  const navigate = useNavigate();
  const goToUsers = () => {
    navigate('/users');         /* Navigate to the Users page */
  }

  return (
    <>

      <h1>Simple CRUD Operation</h1>
      <form action="" onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Enter User Name' />
        <br />
        <input type="email" name='email' placeholder='Enter User Email' />
        <input type="submit" value="Add User" />
      </form>
      <br />
      <button onClick={goToUsers}>View All Users</button>

    </>
  )
}

export default App
