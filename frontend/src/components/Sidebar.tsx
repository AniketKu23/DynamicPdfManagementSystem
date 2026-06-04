import { FileText, Layers, Palette, Type } from "lucide-react";

export const Sidebar = () => (
  <aside className="hidden w-64 border-r border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950 lg:block">
    <nav className="space-y-1">
      {[
        { label: "Templates", icon: Layers },
        { label: "Theme", icon: Palette },
        { label: "Typography", icon: Type },
        { label: "PDF Output", icon: FileText }
      ].map(({ label, icon: Icon }) => (
        <a
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          href={`#${label.toLowerCase().replace(" ", "-")}`}
          key={label}
        >
          <Icon size={17} />
          {label}
        </a>
      ))}
    </nav>
  </aside>
);
