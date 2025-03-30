import { useEffect, useState } from 'react';

export default function Admin() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5001/api/rsvp')
      .then((res) => res.json())
      .then((data) => {
        setRsvps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching RSVPs:', err);
        setLoading(false);
      });
  }, []);

  const exportToCSV = () => {
    const headers = ['Name', 'Attending', 'Guests', 'Submitted At'];
    const rows = rsvps.map(r =>
      [r.name, r.attending ? 'Yes' : 'No', r.guests, new Date(r.createdAt).toLocaleString()]
    );

    const csvContent =
      [headers, ...rows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'rsvps.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading RSVPs...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={exportToCSV}
            className="mb-4 border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            📥 Download CSV
          </button>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border-b">Name</th>
                  <th className="p-2 border-b">Attending</th>
                  <th className="p-2 border-b">Guests</th>
                  <th className="p-2 border-b">Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp._id} className="border-t">
                    <td className="p-2">{rsvp.name}</td>
                    <td className="p-2">{rsvp.attending ? 'Yes' : 'No'}</td>
                    <td className="p-2">{rsvp.guests}</td>
                    <td className="p-2">{new Date(rsvp.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
