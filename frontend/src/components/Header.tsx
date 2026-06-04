import { Download, Moon, Sun, Upload } from "lucide-react";
import { useTemplateStore } from "../store/templateStore";

type HeaderProps = {
  onImportClick: () => void;
};

export const Header = ({ onImportClick }: HeaderProps) => {
  const darkMode = useTemplateStore((state) => state.darkMode);
  const toggleDarkMode = useTemplateStore((state) => state.toggleDarkMode);

  return (
    <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-center md:justify-between md:px-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-950 dark:text-white">Dynamic PDF Templates</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage templates, styling, previews, and generated documents.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <a
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          href={`${import.meta.env.VITE_API_URL ?? "http://localhost:5000/api"}/templates/configuration/export`}
        >
          <Upload size={16} />
          Export
        </a>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          onClick={onImportClick}
          type="button"
        >
          <Download size={16} />
          Import
        </button>
        <button
          aria-label="Toggle dark mode"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-slate-950 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
          type="button"
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
};
