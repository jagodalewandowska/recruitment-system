import React, { useState } from 'react';

const FileDrop = () => {
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = Array.from(e.dataTransfer.files);
        // Process dropped files (you can handle the files here)
        console.log('Dropped files:', files);
    };

    return (
        <div
            className={`file-drop-area ${dragging ? 'dragging' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <h3>Drag & Drop files here</h3>
            <p>or</p>
            <input type="file" onChange={handleDrop} multiple />
            <p>Click to upload</p>
        </div>
    );
};

export default FileDrop;
