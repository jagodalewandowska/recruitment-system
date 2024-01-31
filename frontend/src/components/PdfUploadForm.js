import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Card, Button, Modal } from 'react-bootstrap';
import authHeader from '../services/auth-header';

const PdfUploadForm = () => {
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/users', {
                headers: authHeader(),
            });
            const filteredUsers = response.data.filter(
                (user) => user.username.toLowerCase() !== 'admin'
            );
            setUsers(filteredUsers);
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
        }
    };

    const getUserName = (userId) => {
        const user = users.find((user) => user.user_id === userId);
        return user ? user.firstName + ' ' + user.lastName : 'Nieznany użytkownik';
    };

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const onSubmit = async () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const userId = userData.id;

        const formData = new FormData();
        const userName = getUserName(userId);

        formData.append('file', file, `CV-${userName}.pdf`);
        formData.append('user_id', userId);

        try {
            await axios.post('http://localhost:8082/api/pdf/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Show modal on successful upload
            setShowModal(true);

            // Clear file state after successful upload
            setFile(null);
        } catch (error) {
            console.error('Error uploading PDF:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Card style={{ width: '18rem', margin: 'auto', marginTop: '50px' }}>
                <Card.Body>
                    <Card.Text>
                        <Dropzone onDrop={onDrop} accept=".pdf">
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    {...getRootProps()}
                                    style={{
                                        border: '2px dashed #17a2b8',
                                        borderRadius: '4px',
                                        padding: '20px',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <input {...getInputProps()} />
                                    {file ? <p> Wciśnij przycisk wyślij, aby wysłać na serwer. </p> : <p> Przeciągnij lub kliknij tutaj, aby dodać plik.</p>}
                                </div>
                            )}
                        </Dropzone>
                    </Card.Text>
                    <button className="btn btn-info btn-block" onClick={onSubmit}>
                        Wyślij CV
                    </button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Udało się dodać plik</Modal.Title>
                </Modal.Header>
                <Modal.Body>Twoje CV zostało poprawnie dodane.</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-info" onClick={handleCloseModal}>
                        Zamknij
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PdfUploadForm;
