import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import User from "./User/User";
import { Table } from "react-bootstrap";
import "./Users.css";

function Users({ users, setUsers }) {
  useEffect(() => {
    async function getUsers() {
      await axios
        .get("/api/data/data-get")
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
        })
        .catch((err) => console.error(err.message));
    }
    getUsers();
  }, []);

  return (
    <div className={"users"}>
      <Table striped bordered hover size={"lg"} className={"users-table"}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user) => {
              return (
                <User key={user.username} user={user} setUsers={setUsers} />
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default Users;
