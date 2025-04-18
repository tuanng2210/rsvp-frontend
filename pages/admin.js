// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Papa from "papaparse"; // Import PapaParse

// export default function Admin() {
//   const [rsvps, setRsvps] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch RSVPs from the backend
//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/rsvp`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRsvps(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching RSVPs:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Function to export data as CSV
//   const exportToCSV = () => {
//     const csv = Papa.unparse(rsvps); // Convert JSON to CSV
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "rsvps.csv"; // Set the filename for the download
//     link.click(); // Simulate click to trigger the download
//   };

//   if (loading) {
//     return <p className="text-center text-xl">Loading...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-10">
//       <nav className="mb-6 border-b border-gray-200 pb-4">
//         <ul className="flex justify-center gap-8 text-sm font-semibold tracking-wide uppercase">
//           <li>
//             <Link href="/" className="hover:underline">
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/rsvp" className="hover:underline">
//               RSVP
//             </Link>
//           </li>
//         </ul>
//       </nav>

//       <div className="container mx-auto bg-white p-8 rounded-md shadow-md">
//         <h2 className="text-3xl font-semibold text-center mb-6">
//           Admin Dashboard
//         </h2>

//         {/* Export CSV Button */}
//         <div className="flex justify-end mb-6">
//           <button
//             onClick={exportToCSV}
//             className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
//           >
//             Export as CSV
//           </button>
//         </div>

//         {/* RSVP Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Attending
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Guests
//                 </th>
//                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
//                   Submitted At
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {rsvps.map((rsvp) => (
//                 <tr
//                   key={rsvp._id}
//                   className="border-b border-gray-200 hover:bg-gray-50"
//                 >
//                   <td className="px-6 py-4 text-sm text-gray-700">
//                     {rsvp.name}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">
//                     {rsvp.attending ? "Yes" : "No"}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">
//                     {rsvp.guests}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-700">
//                     {new Date(rsvp.createdAt).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Admin() {
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch RSVPs from the backend
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/rsvp`)
      .then((res) => res.json())
      .then((data) => {
        setRsvps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching RSVPs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <nav className="mb-6 border-b border-gray-200 pb-4">
        <ul className="flex justify-center gap-8 text-sm font-semibold tracking-wide uppercase">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/rsvp" className="hover:underline">
              RSVP
            </Link>
          </li>
        </ul>
      </nav>

      <div className="container mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Admin Dashboard
        </h2>

        {/* Export CSV Button */}
        <div className="flex justify-end mb-6">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/rsvp/download-csv`}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Export as CSV
          </a>
        </div>

        {/* RSVP Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Attending
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Guests
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {rsvps.map((rsvp) => (
                <tr
                  key={rsvp._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {rsvp.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {rsvp.attending ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {rsvp.guests}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(rsvp.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
