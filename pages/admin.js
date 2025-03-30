import { useState, useEffect } from "react";

export default function Admin() {
  const [rsvps, setRsvps] = useState([]);
  useEffect(() => {
    fetch("https://rsvp-backend-13us.onrender.com/api/rsvp")
      .then((response) => response.json())
      .then((data) => setRsvps(data));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Attending</th>
            <th>Guests</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {rsvps.map((rsvp) => (
            <tr key={rsvp._id}>
              <td>{rsvp.name}</td>
              <td>{rsvp.attending ? "Yes" : "No"}</td>
              <td>{rsvp.guests}</td>
              <td>{new Date(rsvp.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
