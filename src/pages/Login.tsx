// src/pages/Login.tsx (esboço)
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
        }
        function handleEsc(e: KeyboardEvent) { if (e.key === "Escape") setOpen(false); }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Botão/ícone que abre/fecha */}
            <button
                type="button"
                aria-label="Login"
                onClick={() => setOpen((v) => !v)}
                className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50
          transform transition-all duration-200 ease-out
          ${open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95 pointer-events-none"}
        `}
            >
                <Link to="/login" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setOpen(false)}>
                    Login
                </Link>
                <Link to="/register" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setOpen(false)}>
                    New account
                </Link>
            </div>
        </div>
    );
}