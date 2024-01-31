import React, { useState, useEffect } from 'react';

const FileManagement = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        // Pobierz listę plików po załadowaniu komponentu
        fetch('http://localhost:8082/api/files')
            .then(response => response.json())
            .then(data => setFiles(data.content))
            .catch(error => console.error('Błąd pobierania listy plików:', error));
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            // Pobierz token z localStorage
            const userTokenObject = JSON.parse(localStorage.getItem('user'));
            const token = userTokenObject.accessToken;

            // Dodaj nagłówek Authorization z tokenem do żądania
            const headers = new Headers({
                'Authorization': `Bearer ${token}`,
            });

            // Wyślij plik na serwer
            fetch('http://localhost:8082/api/files', {
                method: 'POST',
                body: formData,
                headers: headers,
            })
                .then(response => {
                    if (response.ok) {
                        console.log('Plik został pomyślnie przesłany');
                        // Odśwież listę plików po przesłaniu nowego pliku
                        return fetch('http://localhost:8082/api/files');
                    } else {
                        console.error('Błąd przesyłania pliku:', response.statusText);
                        throw new Error('Błąd przesyłania pliku');
                    }
                })
                .then(response => response.json())
                .then(data => setFiles(data.content))
                .catch(error => console.error('Błąd odświeżania listy plików:', error));
        }
    };

    return (
        <div>
            <h2>Lista plików:</h2>
            <ul>
                {files.map(file => (
                    <li key={file.fileId}>{file.name}</li>
                ))}
            </ul>

            <h2>Przesyłanie pliku:</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Prześlij plik</button>
        </div>
    );
};

export default FileManagement;
