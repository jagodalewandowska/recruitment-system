import React, { useState } from "react";
import axios from "axios";

const AddJob = ({ fetchJobs }) => {
    const [newJob, setNewJob] = useState({
        title: "",
        description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("http://localhost:8082/api/jobs", newJob)
            .then(() => {
                fetchJobs(); // Update jobs after successful addition
                setNewJob({
                    title: "",
                    description: ""
                });
            })
            .catch((error) => {
                console.error("Error adding job:", error);
            });
    };

    return (
        <div className="mt-4">
            <h3>Dodaj nową ofertę pracy</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Nazwa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={newJob.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Opis</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={newJob.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Dodaj ofertę</button>
            </form>
        </div>
    );
};

export default AddJob;
