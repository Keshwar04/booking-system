// Sidebar.tsx
import { NavLink } from "react-router-dom";
import { BedDouble, Plane } from "lucide-react"; // optional icons

const navItems = [
  { name: "Hotel", to: "/hotels", icon: BedDouble },
  { name: "Flight", to: "/flights", icon: Plane },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-slate-900 text-slate-100 flex flex-col">
      <div className="px-6 py-4 text-lg font-semibold border-b border-slate-700">
        Logo
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  "hover:bg-slate-800 hover:text-white",
                  isActive
                    ? "bg-slate-800 text-white shadow-inner"
                    : "text-slate-300",
                ].join(" ")
              }
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
