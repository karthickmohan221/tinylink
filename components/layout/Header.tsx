"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Docs", href: "/docs" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  function handleLogout() {
    logout();
  }

  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener("auth:open-login", openLogin);
    return () => window.removeEventListener("auth:open-login", openLogin);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center">
          <Link href="/" className="text-xl font-bold text-slate-900 cursor-pointer">
            TinyLink
          </Link>

          <nav className="hidden lg:flex items-center gap-8 ml-10">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 ml-auto">
            {isLoading ? (
              <div className="w-16 h-8 bg-gray-200 animate-pulse rounded"></div>
            ) : user ? (
              <>
                <div className="flex items-center gap-2 text-sm text-slate-700">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-sm font-medium text-slate-700 hover:text-indigo-600"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowSignup(true)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          <button
            className="lg:hidden ml-auto flex flex-col gap-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
            <span className="w-6 h-[2px] bg-black"></span>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white">
            <div className="flex flex-col p-4 gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-700 font-medium hover:text-indigo-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="mt-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowSignup(true);
                    setMenuOpen(false);
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}
      {showSignup && (
        <SignupForm
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
