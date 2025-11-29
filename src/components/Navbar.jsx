// src/components/Navbar.jsx
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const linkBase =
    "text-sm md:text-base font-medium px-3 py-2 rounded-lg transition";
  const active =
    "text-indigo-700 bg-indigo-50";
  const inactive =
    "text-slate-600 hover:text-indigo-700 hover:bg-indigo-50";

  return (
    <header className="bg-white/80 backdrop-blur border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            EC
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-slate-900">
              EarCare Clinic
            </p>
            <p className="text-[11px] text-slate-500">
              Ear Health Screening
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Privacy
          </NavLink>
        </nav>

        {/* CTA */}
        <button
          onClick={() => navigate("/diagnose")}
          className="ml-3 text-sm md:text-base bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl shadow-md"
        >
          Start Diagnosis
        </button>
      </div>
    </header>
  );
}
