// FileUploadComponent.js
import React, { useState } from "react";
import FilesService from "./FilesService";

const FileUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const userTokenObject = JSON.parse(localStorage.getItem('user'));
            const accessToken = userTokenObject.accessToken;

            FilesService.uploadFile(selectedFile, accessToken)
                .then(() => {
                    console.log("File uploaded successfully");
                    setUploadStatus("Plik przesłano pomyślnie.");
                    setFileList([...fileList, selectedFile]); // Assuming you want to update the list locally
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                    setUploadStatus("Błąd podczas przesyłania pliku.");
                });
        } else {
            setUploadStatus("Proszę wybrać plik przed przesłaniem.");
        }
    };

    const handleGetFileList = async () => {
        try {
            const result = await FilesService.getFileList();
            setFileList(result);
        } catch (error) {
            console.error("Błąd podczas pobierania listy plików:", error);
        }
    };

    return (
        <div>
            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleFileUpload}>Prześlij plik</button>
            </div>
            <div>
                <button onClick={handleGetFileList}>Pobierz listę plików</button>
                <ul>
                    {fileList.map((file, index) => (
                        <li key={index}>{file.fileName}</li>
                    ))}
                </ul>
            </div>
            <div>{uploadStatus && <p>{uploadStatus}</p>}</div>
        </div>
    );
};

export default FileUploadComponent;
