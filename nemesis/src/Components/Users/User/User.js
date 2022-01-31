import React from "react";
import "./User.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../../api/axios";

function User({ user, setUsers }) {
  const handleDelete = async () => {
    await axios
      .post("/api/data/data-delete", { dataId: user._id })
      .then((res) => {
        console.log(res.data);
        setUsers((users) => users.filter((data) => data._id !== user._id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <tr className={"user"}>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.address}</td>
      <td>{user.mobile}</td>
      <td>
        <DeleteIcon className={"user-deleteIcon"} onClick={handleDelete} />
      </td>
    </tr>
  );
}

export default User;
