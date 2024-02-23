import React from "react";
import "./MechViewStyles.css"
const Table = ({ data, handleAccept, handleDecline }) => {

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Phone Number</th>
            <th>Make</th>
            <th>Model</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.user}</td>
            <td>{row.phoneNo}</td>
            <td>{row.make}</td>
            <td>{row.model}</td>
            <td>{row.description}</td>
            <td>
                <button onClick={() => handleAccept(row)} className="accept-button">Accept</button>
                <button onClick={() => handleDecline(row)} className="decline-button">Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
