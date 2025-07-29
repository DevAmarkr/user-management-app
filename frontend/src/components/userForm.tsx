import React, { useState } from "react";
import axios from "axios";
import M from "materialize-css";

const UserForm: React.FC = () => {
  const [formState, setFormState] = useState({ name: "", email: "", role: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5001/api/users", formState);
      if (res.status === 201) {
        M.toast({ html: "Success", classes: "green" });
      }
      setFormState({ name: "", email: "", role: "" });
    } catch (error) {
      M.toast({ html: "Error on adding user", classes: "red" });
    }
  };

  return (
    <div className="row">
      <div className="col s12 m8 l6 offset-m2 offset-l3">
        <div className="card-panel z-depth-2" style={{ padding: "20px" }}>
          <h6 className="center-align">Add New User</h6>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
              />
              <label className={formState.name ? "active" : ""}>Name</label>
            </div>

            <div className="input-field">
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
              />
              <label className={formState.email ? "active" : ""}>Email</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                name="role"
                value={formState.role}
                onChange={handleChange}
                required
              />
              <label className={formState.role ? "active" : ""}>Role</label>
            </div>

            <div className="center-align" style={{ marginTop: "16px" }}>
              <button
                className="btn-small waves-effect waves-light"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
