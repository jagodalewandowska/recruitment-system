import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from 'axios';
import authHeader from "../services/auth-header";
import Modal from "react-modal";
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

Modal.setAppElement('#root'); // Set the app element here

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    experience: "",
    phoneNumber: ""
  });
  const [editingUser, setEditingUser] = useState(null);
  const [sortField, setSortField] = useState("lastName");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    const valueA = a[sortField].toLowerCase();
    const valueB = b[sortField].toLowerCase();

    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    } else {
      return 0;
    }
  });

  const handleAddModalClose = () => {
    setAddModalOpen(false);
    setNewUser({
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      postalCode: "",
      experience: "",
      phoneNumber: "",
    });
  };

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

  useEffect(() => {
    UserService.getAdminBoard().then(
        (response) => {
          setContent(response.data);
        },
        (error) => {
          const _content =
              (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
              error.message ||
              error.toString();

          setContent(_content);

          if (error.response && error.response.status === 401) {
            EventBus.dispatch("logout");
          }
        }
    );

    getUsers();
  }, []);

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };


  const handleAddUser = async () => {
    console.log(newUser);
    try {
      await axios.post("http://localhost:8082/api/users", newUser, { headers: authHeader() });
      setAddModalOpen(false);
      getUsers();
      setNewUser({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        experience: "",
        phoneNumber: "",
        roles: ""
      });
    } catch (error) {
      console.error(`Error adding user: ${error}`);
    }
  };


  const handleEditUser = async () => {
    console.log("Editing User Data:", editingUser);

    try {
      await axios.put(
          `http://localhost:8082/api/users/${editingUser.user_id}`,
          editingUser,
          { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
      );
      setEditingUser(null);
      setEditModalOpen(false);
      getUsers();
    } catch (error) {
      console.error(`Error editing user: ${error}`);
    }
  };




  const handleDeleteUser = async () => {
    console.log("Editing User Data:", editingUser);
    try {
      await axios.delete(`http://localhost:8082/api/users/${editingUser.user_id}`, { headers: authHeader() });
      setDeleteModalOpen(false);
      setEditingUser(null);
      getUsers();
    } catch (error) {
      console.error(`Error deleting user: ${error}`);
    }
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;

    setEditingUser((prevUser) => {
      if (prevUser) {
        return {
          ...prevUser,
          [name]: value,
        };
      }

      return {
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        experience: "",
        phoneNumber: "",
        [name]: value,
      };
    });
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFont("Arial", "normal");
    doc.setFontSize(12);

    doc.text("Lista kandydatów w systemie", 20, 20);

    const tableData = sortedUsers.map((user) => [user.firstName, user.lastName, user.username, user.email, user.address, user.city, user.postalCode, user.phoneNumber]);
    const tableHeaders = ["Imie", "Nazwisko", "Username", "Adres e-mail", "Adres", "Miasto", "Kod pocztowy", "Numer telefonu"];

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      theme: 'striped',
      margin: { top: 0 },
      styles: { font: 'Arial', fontSize: 8 },
      columnStyles: { 0: { cellWidth: 25 } },
      startY: 30,
    });

    doc.setFontSize(12);
    doc.setFont("bold");

    doc.setDrawColor(0);
    doc.setLineWidth(0.1);

    doc.setFontSize(10);
    doc.setFont("normal");

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    window.open(pdfUrl, "_blank");
  };


  return (
      <div className="container">
        {/*<h3 className="mb-4">Zarządzaj kandydatami</h3>*/}

        {users.length === 0 && (
            <p>Brak użytkowników</p>
        )}

        <button onClick={handleAddModalOpen} className="btn btn-info btn-block">
          Dodaj użytkownika
        </button>

        <button onClick={generatePdf} className="btn btn-light btn-block">
          <i className="fas fa-file-export"></i> Eksportuj PDF
        </button>

        <br></br>

        {users.length > 0 && (
            <div className="table">
              <table className="table">
                <thead>
                <tr>
                  {/*<th scope="col">*/}
                  {/*  Numer*/}
                  {/*</th>*/}
                  <th scope="col" onClick={() => handleSort("firstName")}>
                    Imię {sortField === "firstName" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("lastName")}>
                    Nazwisko {sortField === "lastName" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("username")}>
                    Username {sortField === "username" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("email")}>
                    Adres e-mail {sortField === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("address")}>
                    Adres {sortField === "address" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("city")}>
                    Miasto {sortField === "city" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col" onClick={() => handleSort("postalCode")}>
                    Kod pocztowy {sortField === "postalCode" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  {/*<th scope="col" onClick={() => handleSort("experience")}>*/}
                  {/*  Doświadczenie {sortField === "experience" && (sortOrder === "asc" ? "▲" : "▼")}*/}
                  {/*</th>*/}
                  <th scope="col" onClick={() => handleSort("phoneNumber")}>
                    Numer telefonu {sortField === "phoneNumber" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th scope="col">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {sortedUsers.map((user, index) => (
                    <tr key={user.id}>
                      {/*<td>{index + 1}</td>*/}
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.address}</td>
                      <td>{user.city}</td>
                      <td>{user.postalCode}</td>
                      {/*<td>{user.experience}</td>*/}
                      <td>{user.phoneNumber}</td>
                      <td>
                        <button onClick={() => { setEditingUser(user); setEditModalOpen(true); }}
                                className="btn btn-light btn-block">
                          Edytuj
                        </button>
                        <button onClick={() => { setEditingUser(user); handleDeleteModalOpen(true); }}
                                className="btn btn-light btn-block">
                          Usuń
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>

        )}

        {/* Modal for Adding User */}
        <Modal
            isOpen={isAddModalOpen}
            onRequestClose={handleAddModalClose}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "50%",
                height: "50%",
                background: "white",
                borderRadius: "10px",
                marginLeft: "25%",
              },
            }}
        >
          <h2>Dodaj użytkownika</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddUser(); }}>

            <label>
              Imię:
              <br />
              <input
                  type="text"
                  name="firstName"
                  value={newUser.firstName}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Nazwisko:
              <br />
              <input
                  type="text"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Nazwa użytkownika:
              <br />
              <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Adres e-mail:
              <br />
              <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>


            <label>
              Adres:
              <br />
              <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Miasto:
              <br />
              <input
                  type="text"
                  name="city"
                  value={newUser.city}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Kod pocztowy:
              <br />
              <input
                  type="text"
                  name="postalCode"
                  value={newUser.postalCode}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Doświadczenie:
              <br />
              <textarea
                  name="experience"
                  value={newUser.experience}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Numer telefonu:
              <br />
              <input
                  type="text"
                  name="phoneNumber"
                  value={newUser.phoneNumber}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <label>
              Hasło:
              <br />
              <input
                  type="text"
                  name="password"
                  value={newUser.password}
                  onChange={(e) => handleAddInputChange(e)}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Dodaj użytkownika
            </button>
            <button onClick={handleAddModalClose} className="btn btn-secondary">
              Anuluj
            </button>
          </form>
        </Modal>


        {/* Modal for Editing User */}
        <Modal
            isOpen={isEditModalOpen}
            onRequestClose={() => setEditModalOpen(false)}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "50%",
                height: "50%",
                background: "white",
                borderRadius: "10px",
                marginLeft: "25%",
              },
            }}
        >
          <h2>Edytuj użytkownika</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleEditUser(); }}>
            <label>
              Imię:
              <br />
              <input
                  type="text"
                  name="firstName"
                  value={editingUser ? editingUser.firstName || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Nazwisko:
              <br />
              <input
                  type="text"
                  name="lastName"
                  value={editingUser ? editingUser.lastName || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Adres e-mail:
              <br />
              <input
                  type="email"
                  name="email"
                  value={editingUser ? editingUser.email || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>


            <label>
              Adres:
              <br />
              <input
                  type="text"
                  name="address"
                  value={editingUser ? editingUser.address || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Miasto:
              <br />
              <input
                  type="text"
                  name="city"
                  value={editingUser ? editingUser.city || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Kod pocztowy:
              <br />
              <input
                  type="text"
                  name="postalCode"
                  value={editingUser ? editingUser.postalCode || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Doświadczenie:
              <br />
              <textarea
                  name="experience"
                  value={editingUser ? editingUser.experience || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <label>
              Numer telefonu:
              <br />
              <input
                  type="text"
                  name="phoneNumber"
                  value={editingUser ? editingUser.phoneNumber || '' : ''}
                  onChange={(e) => handleEditInputChange(e)}
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Zapisz zmiany
            </button>
            <button onClick={() => setEditModalOpen(false)} className="btn btn-secondary">
              Anuluj
            </button>
          </form>
        </Modal>

        <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={handleDeleteModalClose}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              },
              content: {
                width: "50%",
                height: "50%",
                background: "white",
                borderRadius: "10px",
                marginLeft: "25%",
              },
            }}
        >
          <h2>Czy na pewno chcesz usunąć użytkownika?</h2>
          <button onClick={handleDeleteUser} className="btn btn-danger">
            Tak, usuń
          </button>
          <button onClick={handleDeleteModalClose} className="btn btn-secondary">
            Anuluj
          </button>
        </Modal>

      </div>
  );
};

export default BoardAdmin;
