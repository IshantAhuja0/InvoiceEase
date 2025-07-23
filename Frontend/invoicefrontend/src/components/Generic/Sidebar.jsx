import React from "react";
import {
  Home,
  FileText,
  LogIn,
  LogOut,
  UserPlus,
  FileInput
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Features/Auth/authSlice";

export default function Sidebar({ isOpen, sidebarRef, setIsOpen }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const baseMenu = [
    { name: "Home", icon: Home, path: "" },
    { name: "Invoices", icon: FileText, path: "invoice" },
    { name: "Documents", icon: FileInput, path: "documents" },
  ];

  const guestMenu = [
    { name: "Login", icon: LogIn, path: "login" },
    { name: "Register", icon: UserPlus, path: "register" },
  ];

  const menuItems =
    user.email.trim().length !== 0
      ? [...baseMenu]
      : [...baseMenu, ...guestMenu];

  const handleLogout = async () => {
    const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL;
    try {
      const result = await axios.post(
        `${baseurl}/logout`,
        {},
        { withCredentials: true }
      );
      console.log("logging out");
      dispatch(logout());
      if (result.status === 200) {
        console.log(result.data.message);
        navigate("/");
      } else {
        console.log("problem while logging out user");
      }
    } catch (error) {
      console.log("failed to logout : " + error.message);
    } finally {
      if (window.innerWidth < 1024) setIsOpen(false); // ✅ Close on mobile after logout
    }
  };

  const handleItemClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false); // ✅ Auto-close after clicking an item
    }
  };

  return (
    <aside
      ref={sidebarRef}
      className={`fixed top-16 left-0 z-40 w-48 lg:w-56 h-[calc(100vh-4rem)] bg-blue-950 text-white transition-transform duration-300 ease-in-out sm:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <NavLink
                  to={`/${item.path}`}
                  onClick={handleItemClick} // ✅ Auto-close on mobile
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? "bg-white text-blue-900 font-semibold"
                        : "text-white hover:bg-white/10"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
          {user.email.trim().length !== 0 && (
            <li onClick={handleLogout}>
              <div className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 text-white hover:bg-white/10">
                <LogOut className="w-5 h-5 shrink-0" />
                <span className="truncate">Logout</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
