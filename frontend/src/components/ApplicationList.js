import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        axios.get('/api/jobs')
            .then(response => setApplications(response.data))
            .catch(error => console.error('Error fetching applications:', error));
    }, []);

    return (
        <div>
            <h2>Your Applications</h2>
            <ul>
                {applications.map(application => (
                    <li key={application.id}>
                        Applicant ID: {application.applicant.id}, Job ID: {application.job.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ApplicationList;
