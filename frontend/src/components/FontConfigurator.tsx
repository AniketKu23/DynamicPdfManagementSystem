import { AlignCenter, AlignLeft, AlignRight, Bold, Type } from "lucide-react";
import { FontFamily } from "../types";
import { useTemplateStore } from "../store/templateStore";

const fonts: FontFamily[] = ["Arial", "Roboto", "Times New Roman", "Open Sans"];

const fontRows = [
  { key: "header", label: "Header" },
  { key: "body", label: "Body" },
  { key: "footer", label: "Footer" }
] as const;

export const FontConfigurator = () => {
  const configuration = useTemplateStore((state) => state.configuration);
  const setConfiguration = useTemplateStore((state) => state.setConfiguration);

  return (
    <section id="typography" className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-center gap-2">
        <Type size={18} className="text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Font Configuration</h2>
      </div>
      <div className="space-y-4">
        {fontRows.map(({ key, label }) => {
          const fontKey = `${key}Font` as "headerFont" | "bodyFont" | "footerFont";
          const sizeKey = `${key}Size` as "headerSize" | "bodySize" | "footerSize";
          const boldKey = `${key}Bold` as "headerBold" | "bodyBold" | "footerBold";

          return (
            <div className="grid gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-slate-800 md:grid-cols-[1fr_90px_44px]" key={key}>
              <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {label} Font
                <select
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  onChange={(event) => setConfiguration({ [fontKey]: event.target.value as FontFamily })}
                  value={configuration[fontKey]}
                >
                  {fonts.map((font) => (
                    <option key={font} value={font}>
                      {font}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                Size
                <input
                  className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  max={48}
                  min={8}
                  onChange={(event) => setConfiguration({ [sizeKey]: Number(event.target.value) })}
                  type="number"
                  value={configuration[sizeKey]}
                />
              </label>
              <button
                aria-pressed={Boolean(configuration[boldKey])}
                className={`mt-6 inline-flex h-10 w-10 items-center justify-center rounded-md border ${
                  configuration[boldKey]
                    ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                    : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
                onClick={() => setConfiguration({ [boldKey]: !configuration[boldKey] })}
                title={`${label} bold`}
                type="button"
              >
                <Bold size={17} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex gap-2">
        {[
          ["left", AlignLeft],
          ["center", AlignCenter],
          ["right", AlignRight]
        ].map(([value, Icon]) => (
          <button
            className={`inline-flex h-10 w-10 items-center justify-center rounded-md border ${
              configuration.alignment === value
                ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
            }`}
            key={value as string}
            onClick={() => setConfiguration({ alignment: value as "left" | "center" | "right" })}
            title={`Align ${value as string}`}
            type="button"
          >
            <Icon size={17} />
          </button>
        ))}
      </div>
    </section>
  );
};
