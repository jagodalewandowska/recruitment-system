import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/jobs")
            .then((response) => {
                setJobs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching jobs:", error);
            });
    }, []);

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Oferty pracy</h3>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nazwa</th>
                    <th scope="col">Opis</th>
                </tr>
                </thead>
                <tbody>
                {jobs.map((job) => (
                    <tr key={job.id}>
                        <td>{job.title}</td>
                        <td>{job.description}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
