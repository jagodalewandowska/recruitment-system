import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./css/Offers.css";

const JobForm = ({ onSubmit, buttonText, initialData }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleFormClick = (e) => {
        e.stopPropagation();
    };

    return (
        <form onSubmit={handleSubmit} onClick={handleFormClick}>
            <label>
                Nazwa:
                <br></br>
                <input
                    type="text"
                    name="title"
                    value={formData.title || ""}
                    onChange={handleChange}
                    className="form-control"
                />
            </label>
            <label>
                Opis:
                <br></br>
                <textarea
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    className="form-control"
                />
            </label>
            <button type="submit" class="btn btn-light btn-block">
                {buttonText}
            </button>
        </form>
    );
};

const Home = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const fetchData = () => {
        axios
            .get("http://localhost:8082/api/jobs")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateJob = (jobData) => {
        axios
            .post("http://localhost:8082/api/jobs", jobData)
            .then(() => {
                setAddModalOpen(false);
                fetchData();
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    };

    const handleUpdateJob = (jobId, jobData) => {
        axios
            .put(`http://localhost:8082/api/jobs/${jobId}`, jobData)
            .then(() => {
                setEditingJob(null);
                setEditModalOpen(false);
                fetchData();
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    };

    const handleDeleteJob = (jobId) => {
        axios
            .delete(`http://localhost:8082/api/jobs/${jobId}`)
            .then(() => {
                setDeleteModalOpen(false);
                fetchData();
            })
            .catch((error) => {
                console.error("Błąd:", error);
            });
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Oferty pracy</h3>
            <button onClick={() => setAddModalOpen(true)} class="btn btn-info btn-block">Dodaj ofertę</button>
            <br></br>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Opis</th>
                    <th scope="col">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.description}</td>
                        <td>
                            <button onClick={() => { setEditingJob(job); setEditModalOpen(true); }}
                                    class="btn btn-light btn-block">
                                Edytuj
                            </button>
                            <button onClick={() => { setEditingJob(job); setDeleteModalOpen(true); }}
                                    class="btn btn-light btn-block">
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal
                isOpen={isAddModalOpen}
                onRequestClose={() => setAddModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "50%",
                        height: "40%",
                        background: "white",
                        borderRadius: "10px",
                        marginLeft: "25%"
                    },
                }}
            >
                <h2>Dodaj ofertę pracy</h2>
                <JobForm
                    onSubmit={handleCreateJob}
                    buttonText="Dodaj ofertę"
                />
                <button onClick={() => setAddModalOpen(false)} class="btn btn-light btn-block">Anuluj</button>
            </Modal>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={() => setEditModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "50%",
                        height: "40%",
                        background: "white",
                        borderRadius: "10px",
                        marginLeft: "25%"
                    },
                }}
            >
                <h2>Edytuj ofertę pracy</h2>
                <JobForm
                    onSubmit={(formData) => handleUpdateJob(editingJob.id, formData)}
                    buttonText="Zapisz zmiany"
                    initialData={editingJob}
                />
                <button onClick={() => setEditModalOpen(false)} class="btn btn-light btn-block">Anuluj</button>
            </Modal>

            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={() => setDeleteModalOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                    content: {
                        width: "50%",
                        height: "25%",
                        background: "white",
                        borderRadius: "10px",
                        marginLeft: "25%"
                    },
                }}
            >
                <h2>Czy na pewno chcesz usunąć ofertę pracy?</h2>
                <button onClick={() => handleDeleteJob(editingJob.id)} class="btn btn-light btn-block">Tak</button>
                <button onClick={() => setDeleteModalOpen(false)} class="btn btn-light btn-block">Nie</button>
            </Modal>
        </div>
    );
};

export default Home;

