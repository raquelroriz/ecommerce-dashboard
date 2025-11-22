import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";

export default function UserMenu() {
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <Link
        to="/login"
        aria-label="Login"
        title="Login"
        className="rounded-full border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 inline-flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    );
  }

  const firstLetter = ((user?.name?.trim() || user?.email || "U").trim()[0] || "U").toUpperCase();

  return (
    <div className="relative" ref={ref}>
      {/* Avatar button with first letter only */}
      <button
        type="button"
        aria-label="User menu"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-neutral-800 hover:bg-gray-50"
        title="Account"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-semibold">
          {firstLetter}
        </span>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="menu"
          aria-label="User actions"
          className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-md border border-brand-200 bg-white py-1 shadow-lg"
        >
          <button
            role="menuitem"
            type="button"
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="block w-full px-3 py-2 text-left text-sm text-neutral-800 hover:bg-brand-50"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
