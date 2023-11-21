import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = ({ onApply }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('/api/jobs')
            .then(response => setJobs(response.data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    return (
        <div>
            <h2>Oferty pracy</h2>
            <ul>
                {jobs.map(job => (
                    <li key={job.id}>
                        {job.title} - {job.description}{' '}
                        <button onClick={() => onApply(job.id)}>Apply</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
