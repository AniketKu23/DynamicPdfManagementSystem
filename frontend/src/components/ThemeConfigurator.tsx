import { Palette } from "lucide-react";
import { useTemplateStore } from "../store/templateStore";

export const ThemeConfigurator = () => {
  const configuration = useTemplateStore((state) => state.configuration);
  const setConfiguration = useTemplateStore((state) => state.setConfiguration);

  return (
    <section id="theme" className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-center gap-2">
        <Palette size={18} className="text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Theme Configuration</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["primaryColor", "Primary Color"],
          ["secondaryColor", "Secondary Color"]
        ].map(([key, label]) => (
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200" key={key}>
            {label}
            <div className="flex h-10 items-center gap-3 rounded-md border border-slate-300 px-2 dark:border-slate-700">
              <input
                className="h-7 w-9 cursor-pointer border-0 bg-transparent p-0"
                onChange={(event) => setConfiguration({ [key]: event.target.value })}
                type="color"
                value={configuration[key as "primaryColor" | "secondaryColor"]}
              />
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                {configuration[key as "primaryColor" | "secondaryColor"]}
              </span>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
};
