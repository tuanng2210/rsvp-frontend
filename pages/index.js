import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const targetDate = new Date("2026-02-07T19:00:00");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-center text-gray-800 px-6 py-10">
      {/* Top Nav */}
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

      {/* Content Container */}
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Names */}
        <div>
          <h1 className="text-5xl font-script mb-2">Tuan Nguyen</h1>
          <p className="text-base mb-2">and</p>
          <h2 className="text-5xl font-script">An Lac</h2>
        </div>

        {/* Invitation-style Card */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 max-w-lg mx-auto font-elegant text-sm space-y-4">
          {/* Divider + Date */}
          <div className="space-y-2">
            <div className="flex justify-center">
              <div className="w-10 h-px bg-gray-300"></div>
            </div>
            <p className="text-sm text-gray-800 tracking-widest uppercase text-center">
              Saturday, February 7, 2026 • 7:00 PM
            </p>
          </div>

          {/* Venue */}
          <div className="text-center">
            <p className="text-base font-semibold text-gray-900 not-italic">
              Hotel Nikko Saigon
            </p>
            <p className="text-sm text-gray-700 not-italic leading-relaxed">
              235 Đường Nguyễn Văn Cừ, Nguyễn Cư Trinh, Quận 1,
              <br />
              Hồ Chí Minh 700000, Vietnam
            </p>
          </div>

          {/* Countdown */}
          <div className="text-center text-gray-600 text-sm">
            {timeLeft ? (
              <p>
                {timeLeft.days} days {timeLeft.hours} hours {timeLeft.minutes}{" "}
                minutes {timeLeft.seconds} seconds
              </p>
            ) : (
              <p className="text-gray-500 font-light">
                The big day is here! 🎉
              </p>
            )}
          </div>

          {/* RSVP Button */}
          <div className="pt-4 text-center">
            <Link href="/rsvp">
              <span className="inline-block border border-gray-800 text-gray-800 px-6 py-2 rounded hover:bg-gray-100 tracking-wide font-medium transition uppercase">
                RSVP Here
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
