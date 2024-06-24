"use client"
import { useState } from 'react';

export default function Home() {
    const [content, setContent] = useState('');

    const displayMessage = (message) => {
        setContent(message);
    };

    const login = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

        if (username === 'admin' && password === 'password') {
            displayMessage(`<p>Welcome, ${username}!</p>`);
        } else {
            displayMessage('<p>Invalid credentials</p>');
        }
    };

    const performArrayWrite = () => {
        let arr = [1, 2, 3];
        arr[5] = 10;
        console.log(arr);
    };

    const useObjectAfterNullify = () => {
        let obj = { name: "test" };
        let ref = obj;
        obj = null;
        console.log(ref.name);
    };

    const runCommand = () => {
        const userInput = document.getElementById('username').value;
        const command = `ls ${userInput}`;
        console.log(`Executing command: ${command}`);
    };

    const handleFormSubmit = () => {
        const userInput = document.getElementById('userInput').value;
        displayMessage(`<p>User input was: ${userInput}</p>`);
    };

    const readArrayOutOfBounds = () => {
        let arr = [1, 2, 3];
        console.log(arr[5]);
    };

    const fetchFile = (filename) => {
        fetch(`/files/${filename}`)
            .then(response => response.text())
            .then(data => displayMessage(`<pre>${data}</pre>`))
            .catch(error => displayMessage(`<p>Error reading file: ${error}</p>`));
    };

    const changeUserEmail = () => {
        fetch('/change-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: 'newemail@example.com' })
        })
            .then(response => response.json())
            .then(data => displayMessage('<p>Email changed successfully</p>'))
            .catch(error => displayMessage(`<p>Error changing email: ${error}</p>`));
    };

    const handleFileUpload = () => {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => displayMessage(`<p>File uploaded successfully: ${data.filename}</p>`))
            .catch(error => displayMessage(`<p>Error uploading file: ${error}</p>`));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl">Welcome to My Website</h1>
            <form id="loginForm" className="mb-4">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" className="border p-2"/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="border p-2"/>
                <button type="button" onClick={login} className="bg-blue-500 text-white p-2">Login</button>
            </form>
            <div id="content" dangerouslySetInnerHTML={{ __html: content }}></div>
            <button onClick={runCommand} className="bg-red-500 text-white p-2">Execute Command</button>
            <button onClick={handleFileUpload} className="bg-green-500 text-white p-2">Upload File</button>
            <button onClick={readArrayOutOfBounds} className="bg-yellow-500 text-white p-2">Read Out of Bounds</button>
        </div>
    );
}
