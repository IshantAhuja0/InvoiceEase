import React, { useContext } from "react";
import {
  Home,
  FileText,
  LayoutTemplate,
  LogIn,
  LogOut,
  UserPlus,
  FileInput
} from "lucide-react";
import { AuthContext } from "../../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ isOpen, sidebarRef }) {
  const { user, logout } = useContext(AuthContext);
  const IconLogout = LogOut;

  const baseMenu = [
    { name: "Home", icon: Home, path: "" },
    { name: "Invoices", icon: FileText, path: "invoices" },
    { name: "Templates", icon: LayoutTemplate, path: "templates" },
    { name: "Documents", icon: FileInput, path: "documents" },
  ];

  const guestMenu = [
    { name: "Login", icon: LogIn, path: "login" },
    { name: "Register", icon: UserPlus, path: "register" },
  ];

  // const authMenu = [
  //   {
  //     name: "Logout",
  //     icon: LogOut,
  //     path: "", // You can handle it with a click event instead of routing
  //     onClick: logout,
  //   },
  // ];
  const menuItems = user
    ? [...baseMenu]
    : [...baseMenu, ...guestMenu];

    const navigate=useNavigate()
  const handleLogout = async () => {
            const baseurl = import.meta.env.VITE_BACKEND_PROTECTED_URL;
        console.log("base" + baseurl);
    try {
      const result = await axios.post(
        `${baseurl}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("logging out")
      logout()
      if (result.status === 200) {
        console.log(result.data.message);
        navigate("/")
      }
      else{
        console.log("problem while logging out user")
      }
    } catch (error) {
      console.log("failed to logout : " + error.message);
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
          {user && (
            <li onClick={handleLogout}>
              <div className="flex items-center gap-3 p-2 rounded-lg transition-colors duration-300 text-white hover:bg-white/10">
                <IconLogout className="w-5 h-5 shrink-0" />
                <span className="truncate">Logout</span>
              </div>
            </li>
          )}
        </ul>
      </div>
    </aside>
  );
}
