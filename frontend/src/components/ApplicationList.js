import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedApplications = [...applications].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    const filteredApplications = sortedApplications.filter(application =>
        getJobName(application.job.id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeApplication = (applicationId) => {
        const isConfirmed = window.confirm("Czy na pewno chcesz usunąć użytkownika?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8082/api/applications/${applicationId}`)
                .then(() => {
                    setApplications(prevApplications => prevApplications.filter(app => app.id !== applicationId));
                })
                .catch(error => console.error('Error removing application:', error));
        }
    };

    const generatePdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(12);

        doc.text("Lista aplikacji w systemie", 20, 20);

        const tableData = applications.map((application) => [
            application.id,
            application.date_of_application,
            application.education,
            application.experience,
            application.other_info === "" ? "-" : application.other_info,
            getUserName(application.user.user_id),
            getEmail(application.user.user_id),
            getJobName(application.job.id),
        ]);

        const tableHeaders = [
            "ID",
            "Data dodania",
            "Edukacja",
            "Doswiadczenie",
            "Inne",
            "Imie i nazwisko uzytkownika",
            "Email",
            "Stanowisko",
        ];

        doc.setFontSize(12);
        doc.setFont("bold");

        doc.setDrawColor(0);
        doc.setLineWidth(0.1);

        doc.setFontSize(10);
        doc.setFont("normal");

        autoTable(doc, {
            head: [tableHeaders],
            body: tableData,
            theme: "striped",
            margin: { top: 0 },
            columnStyles: { 0: { cellWidth: 15 } },
            startY: 30,
        });

        const pdfBlob = doc.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, "_blank");
    };

    return (
        <div className="container mt-4">
            <h2 className="card-title">Aplikacje</h2>
            <div className="card">
                <div className="card-body">
                    <button onClick={generatePdf} className="btn btn-info btn-block">
                        <i className="fas fa-file-export"></i> Eksportuj PDF
                    </button>
                    <div className="card-body">

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Wyszukaj stanowisko..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                            <thead>
                            <tr>
                                <th onClick={() => handleSort('id')}>ID</th>
                                <th onClick={() => handleSort('date_of_application')}>Data dodania</th>
                                <th onClick={() => handleSort('education')}>Edukacja</th>
                                <th onClick={() => handleSort('experience')}>Doświadczenie</th>
                                <th onClick={() => handleSort('other_info')}>Inne</th>
                                <th onClick={() => handleSort('user.lastName')}>Imię i nazwisko użytkownika</th>
                                <th onClick={() => handleSort('user.email')}>Email</th>
                                <th onClick={() => handleSort('job.title')}>Stanowisko</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredApplications.map((application) => (
                                <tr key={application.id}>
                                    <td>{application.id}</td>
                                    <td>{application.date_of_application}</td>
                                    <td>{application.education}</td>
                                    <td>{application.experience}</td>
                                    <td>{application.other_info === "" ? "-" : application.other_info}</td>
                                    <td>{getUserName(application.user.user_id)}</td>
                                    <td>{getEmail(application.user.user_id)}</td>
                                    <td>{getJobName(application.job.id)}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => removeApplication(application.id)}
                                        >
                                            Usuń
                                        </button>
                                    </td>
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
