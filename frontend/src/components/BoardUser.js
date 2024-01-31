import React, { useState, useEffect } from "react";
import axios from "axios";
import {Modal, Button, Form, Alert} from "react-bootstrap";
import authHeader from "../services/auth-header";

const BoardUser = () => {
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    const [education, setEducation] = useState("");
    const [experience, setExperience] = useState("");
    const [otherInfo, setOtherInfo] = useState("");

    const [notification, setNotification] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/jobs")
            .then((response) => setJobs(response.data))
            .catch((error) => console.error("Error fetching jobs:", error));
    }, []);

    const handleApply = (job) => {
        setSelectedJob({ ...job, job_id: job.id });
        setShowModal(true);
        setNotification(null);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedJob(null);
    };

    const handleNotificationClose = () => {
        setNotification(null);
    };

    const handleSubmit = async () => {
        const userData = JSON.parse(localStorage.getItem("user"));
        const userId = userData.id;
        const jobId = selectedJob.job_id;

        try {
            const response = await axios.get(`http://localhost:8082/api/applications`, {
                headers: authHeader(),
            });

            const existingApplication = response.data.find(application => (
                application.user.user_id === userId && application.job.id === jobId
            ));

            if (existingApplication) {
                handleClose();
                setNotification({
                    variant: "danger",
                    message: "Już składałeś aplikację na to stanowisko.",
                });
                return;
            }
        } catch (error) {
            console.error("Error checking for existing application:", error);
            setNotification({
                variant: "danger",
                message: "Błąd podczas sprawdzania aplikacji",
            });
            return;
        }

        const newApplication = {
            education,
            experience,
            other_info: otherInfo,
            user: {
                user_id: userId,
            },
            job: {
                id: jobId,
            },
        };

        try {
            await axios.post("http://localhost:8082/api/applications", newApplication, { headers: authHeader() });
            setNotification({
                variant: "success",
                message: `Dodano pomyślnie aplikację na stanowisko ${selectedJob.title}.`,
            });
            handleClose();
        } catch (error) {
            console.error("Error submitting application:", error);
            setNotification({
                variant: "danger",
                message: "Błąd podczas składania aplikacji",
            });
        }
        handleClose();
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Oferty pracy</h3>

            {notification && (
                <Alert variant={notification.variant} onClose={handleNotificationClose}>
                    {notification.message}
                </Alert>
            )}

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Opis</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.description}</td>
                        <td>
                            <button
                                className="btn btn-light"
                                onClick={() => handleApply(job)}
                            >
                                <b>Aplikuj</b>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Aplikuj do pracy: {selectedJob && selectedJob.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formEducation">
                            <Form.Label>Edukacja</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Podaj swoją edukację"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formExperience">
                            <Form.Label>Doświadczenie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Podaj swoje doświadczenie"
                                value={experience}
                                onChange={(e) => setExperience(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formOtherInfo">
                            <Form.Label>Inne informacje</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dodatkowe informacje"
                                value={otherInfo}
                                onChange={(e) => setOtherInfo(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Anuluj
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Aplikuj
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default BoardUser;
