import React, { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../services/auth-header";
import { Card, Table } from 'react-bootstrap';

const PdfDownload = () => {
    const [pdfs, setPdfs] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/pdf/all'); // Replace with your backend endpoint
                setPdfs(response.data);
                console.log(pdfs)
            } catch (error) {
                console.error('Error fetching PDFs:', error);
            }
        };

        fetchPdfs();
        getUsers();
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

    const getUserName = (userId) => {
        const user = users.find(user => user.user_id === userId);
        return user ? `${user.firstName} ${user.lastName}` : 'Nieznany użytkownik';
    };

    const downloadPdf = async (pdfId) => {
        try {
            const response = await axios.get(`http://localhost:8082/api/pdf/download/${pdfId}`, { responseType: 'arraybuffer' });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            const pdf = pdfs.find(pdf => pdf.id_pdf === pdfId);
            const user = pdf ? pdf.user : null;

            const userName = user ? `${user.firstName} ${user.lastName}` : 'Nieznany użytkownik';

            link.href = url;
            link.download = `CV-${userName}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };


    return (
        <div>
            <h2 className="mb-4">CV kandydatów</h2>
            <Card>
                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imię i nazwisko</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {pdfs.map((pdf) => (
                        <tr key={pdf.id_pdf}>
                            <td>{pdf.id_pdf}</td>
                            <td>{getUserName(pdf.user.user_id)}</td>
                            <td>
                                <button className="btn btn-info"
                                        onClick={() => downloadPdf(pdf.id_pdf)}
                                >
                                    Pobierz CV
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Card>
        </div>
    );
};

export default PdfDownload;
