import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import axios from 'axios';
import authHeader from "../services/auth-header";


const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);

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

    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/users", { headers: authHeader() });
        const filteredUsers = response.data.filter(user => user.username.toLowerCase() !== 'admin');
        // setUsers(response.data);
        setUsers(filteredUsers);
      } catch (error) {
        console.error(`Error fetching users: ${error}`);
      }
    };
    getUsers();

  }, []);

  return (
      <div className="container">
        <h3 className="mb-4">Lista kandydatów</h3>
        <div className="table-responsive">
          <table className="table">
            <thead>
            <tr>
              <th scope="col">Numer</th>
              <th scope="col">Adres e-mail</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.email}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default BoardAdmin;
