import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../socket";
import M from "materialize-css";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetchUsers();

    socket.on("userAdded", (newUser: User) => {
      setUsers((prev) => {
        const exists = prev.some((user) => user._id === newUser._id);
        return exists ? prev : [newUser, ...prev];
      });
      M.toast({ html: "New User Event", classes: "green" });
    });

    return () => {
      socket.off("userAdded");
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/users");
      setUsers(res.data);
    } catch (error: any) {
      M.toast({ html: "Failed to fetch users", classes: "red" });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <div
        className="row"
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div className="input-field" style={{ width: "50%" }}>
          <input
            id="search"
            type="text"
            className="validate"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label htmlFor="search" className={searchTerm ? "active" : ""}>
            Search users...
          </label>
        </div>
      </div>

      <table
        className="highlight responsive-table z-depth-2"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          marginTop: "10px",
          width: "100%",
        }}
      >
        <thead className="teal darken-3 white-text">
          <tr>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                fingerprint
              </i>
              ID
            </th>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                person
              </i>
              Name
            </th>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                email
              </i>
              Email
            </th>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                verified_user
              </i>
              Role
            </th>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                calendar_today
              </i>
              Created At
            </th>
            <th style={{ padding: "16px 12px", textAlign: "center" }}>
              <i
                className="material-icons small"
                style={{ verticalAlign: "middle", marginRight: "6px" }}
              >
                update
              </i>
              Updated At
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {user._id}
                </td>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {user.name}
                </td>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {user.email}
                </td>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {user.role === "admin" ? (
                    <span
                      className="new badge green white-text"
                      data-badge-caption={user.role}
                      style={{ borderRadius: "12px", padding: "0 12px" }}
                    ></span>
                  ) : (
                    <span
                      className="new badge red white-text"
                      data-badge-caption={user.role}
                      style={{ borderRadius: "12px", padding: "0 12px" }}
                    ></span>
                  )}
                </td>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td style={{ padding: "16px 12px", textAlign: "center" }}>
                  {new Date(user.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
