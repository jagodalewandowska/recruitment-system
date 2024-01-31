import React, { useState, useEffect } from 'react';
import './css/FileService.css';

const FileManagement = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const userTokenObject = JSON.parse(localStorage.getItem('user'));
    const token = userTokenObject.accessToken;

    const fetchFiles = () => {
        fetch('http://localhost:8082/api/files', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => setFiles(data.content))
            .catch(error => console.error('Błąd pobierania listy plików:', error));
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const headers = new Headers({
                'Authorization': `Bearer ${token}`,
            });

            setIsLoading(true);

            fetch('http://localhost:8082/api/files', {
                method: 'POST',
                body: formData,
                headers: headers,
            })
                .then(response => {
                    if (response.ok) {
                        setUploadSuccess(true);
                        setTimeout(() => setUploadSuccess(false), 3000);
                        document.getElementById('fileInput').value = '';
                        setSelectedFile(null);
                        fetchFiles();
                    } else {
                        console.error('Błąd przesyłania pliku:', response.statusText);
                        throw new Error('Błąd przesyłania pliku');
                    }
                })
                .catch(error => console.error('Błąd odświeżania listy plików:', error))
                .finally(() => setIsLoading(false));
        }
    };

    const handleDownload = (fileId, fileName) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `http://localhost:8082/api/files/download/${fileId}`;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="container">
            <div className="file-list">
                <h2>Lista plików:</h2>
                <ul>
                    {files.map(file => (
                        <li key={file.fileId}>
                            <span className="file-name">{file.name}</span>
                            <button className="download-button" onClick={() => handleDownload(file.fileId, file.name)}>
                                Pobierz
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="upload-section">
                <h2>Przesyłanie pliku:</h2>
                {uploadSuccess && <p id="uploadSuccessMessage" className="file-upload-success">Plik został pomyślnie przesłany!</p>}
                <div className="file-input-container">
                    <label htmlFor="fileInput" className="custom-file-input">
                        {isLoading ? <div className="loading-indicator-container"><div className="loading-indicator"></div></div> : 'Wybierz plik'}
                    </label>
                    <input type="file" id="fileInput" className="file-input" onChange={handleFileChange} accept=".txt, .png, .pdf" />
                </div>
                <button className="upload-button" onClick={handleUpload} disabled={isLoading}>
                    {isLoading ? 'Przesyłanie...' : 'Prześlij plik'}
                </button>
            </div>
        </div>
    );
};

export default FileManagement;
