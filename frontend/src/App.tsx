import React from "react";
import UserForm from "./components/userForm";
import AdminDashboard from "./components/adminDashboard";

const App: React.FC = () => {
  return (
    <div>
      <div className="center-align">
        <h4
          className="teal-text text-darken-3"
          style={{
            borderBottom: "2px solid #4caf50",
            display: "inline-block",
            paddingBottom: "10px",
          }}
        >
          👥 User Management
        </h4>
      </div>
      <UserForm />
      <AdminDashboard />
    </div>
  );
};

export default App;
