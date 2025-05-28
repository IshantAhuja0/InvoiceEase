import React from "react";
import {
  Home,
  FileText,
  LayoutTemplate,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";

import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, sidebarRef }) {

const menuItems = [
  {
    name: "Home",
    icon: Home,
    path: "",
  },
  {
    name: "Invoices",
    icon: FileText,
    path: "invoices",
  },
  {
    name: "Templates",
    icon: LayoutTemplate,
    path: "templates",
  },
  {
    name: "Login",
    icon: LogIn,
    path: "login",
  },
  {
    name: "Register",
    icon: UserPlus,
    path: "register",
  },
  {
    name: "Sign out",
    icon: LogOut,
    path: "signout",
  },
];


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
</ul>

      </div>
    </aside>
  );
}
