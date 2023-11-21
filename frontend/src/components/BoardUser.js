import React, { useState, useEffect } from "react";
import axios from "axios";

const BoardUser = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8082/api/jobs")
            .then((response) => setJobs(response.data))
            .catch((error) => console.error("Error fetching jobs:", error));
    }, []);

    const handleApply = (jobId) => {
        // Implement the logic for applying to a job
        console.log(`Aplikowanie do pracy: ${jobId}`);
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Oferty pracy</h3>
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
                                onClick={() => handleApply(job.id)}
                            >
                                <b>Aplikuj</b>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardUser;
