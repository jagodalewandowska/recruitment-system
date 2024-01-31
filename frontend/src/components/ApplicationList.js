import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {responsivePropType} from "react-bootstrap/createUtilityClasses";
import authHeader from "../services/auth-header";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);



    useEffect(() => {
        axios.get('http://localhost:8082/api/applications')
            .then(response => setApplications(response.data))
            .catch(error => console.error('Error fetching applications:', error));

        getUsers();
        fetchData();

        }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/users", { headers: authHeader() });
            const filteredUsers = response.data.filter(user => user.username.toLowerCase() !== 'admin');
            setUsers(filteredUsers);
            console.log(filteredUsers);
        } catch (error) {
            console.error(`Error fetching users: ${error}`);
        }
    };

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

    const getUserName = (userId) => {
        console.log(userId)
        const user = users.find(user => user.user_id === userId);
        return user ? user.firstName + " " + user.lastName : 'Nieznany użytkownik';
    };

    const getEmail = (userId) => {
        const user = users.find(user => user.user_id === userId);
        return user ? user.email : 'Nieznany użytkownik';
    };

    const getJobName = (jobId) => {
        const job = jobs.find(job => job.id === jobId);
        return job ? job.title : 'Unknown Job';
    };

    return (
        <div className="container mt-4">

            <h2 className="card-title">Aplikacje</h2>


            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Data dodania</th>
                                <th>Edukacja</th>
                                <th>Doświadczenie</th>
                                <th>Inne</th>
                                <th>Imię i nazwisko użytkownika</th>
                                <th>Email</th>
                                <th>Stanowisko</th>
                            </tr>
                            </thead>
                            <tbody>
                            {applications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.date_of_application}</td>
                                    <td>{application.education}</td>
                                    <td>{application.experience}</td>
                                    <td>{application.other_info}</td>
                                    <td>{getUserName(application.user.user_id)}</td>
                                    <td>{getEmail(application.user.user_id)}</td>
                                    <td>{getJobName(application.job.id)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationList;
