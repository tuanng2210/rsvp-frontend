import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";

export default function RSVP() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState(true);
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/rsvp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, attending, guests: attending ? guests : 0 }),
    });

    if (response.ok) {
      setSubmitted(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    } else {
      alert("Failed to submit RSVP.");
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-white px-6 py-10">
        {/* Navigation */}
        <nav className="mb-10 border-b border-gray-200 pb-4">
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

        {/* Thank You Card */}
        <div className="flex items-center justify-center">
          <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 max-w-md w-full text-center font-elegant">
            <h2 className="text-2xl mb-2">Thank you for your RSVP!</h2>
            <p className="text-sm text-gray-600">
              We can't wait to celebrate with you 🥂
            </p>
            <Link
              href="/"
              className="inline-block mt-6 text-blue-600 hover:underline text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      {/* Navigation */}
      <nav className="mb-10 border-b border-gray-200 pb-4">
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

      {/* RSVP Card Form */}
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-md shadow-sm p-8 max-w-lg w-full font-elegant space-y-6 text-center"
        >
          <h2 className="text-3xl font-script mb-1">Kindly Reply</h2>
          <p className="text-xs tracking-widest uppercase text-gray-500">
            by February 1st
          </p>

          {/* Full Name Field with underlined style */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Write your name"
                className="w-full border-0 border-b border-gray-400 bg-transparent text-center text-lg tracking-wide font-elegant focus:outline-none focus:border-black placeholder-gray-300"
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Attendance Options */}
          <div className="flex justify-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="response"
                checked={attending === true}
                onChange={() => setAttending(true)}
                className="accent-black"
              />
              <span className="text-sm italic">joyfully accepts</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="response"
                checked={attending === false}
                onChange={() => setAttending(false)}
                className="accent-black"
              />
              <span className="text-sm italic">regretfully declines</span>
            </label>
          </div>

          {/* Guest Count */}
          {attending && (
            <div className="text-sm pt-2">
              <p className="mb-1 tracking-wide text-gray-700">
                There will be
                <span className="inline-block w-16 border-b border-gray-400 mx-2 text-center">
                  {guests}
                </span>
                guests attending
              </p>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                className="w-20 p-1 border border-gray-300 rounded text-sm mt-1"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 border border-gray-800 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 tracking-widest text-sm uppercase"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
