import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Search } from "lucide-react";
import { Template } from "../types";
import { TemplateCard } from "./TemplateCard";
import { categories } from "../utils/sampleData";

type TemplateGridProps = {
  templates: Template[];
  selectedId?: string;
  defaultId?: string;
  search: string;
  category: string;
  loading: boolean;
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onSelect: (template: Template) => void;
  onReorder: (activeId: string, overId: string) => void;
};

export const TemplateGrid = ({
  templates,
  selectedId,
  defaultId,
  search,
  category,
  loading,
  onSearch,
  onCategory,
  onSelect,
  onReorder
}: TemplateGridProps) => {
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.active.id !== event.over.id) {
      onReorder(String(event.active.id), String(event.over.id));
    }
  };

  return (
    <section id="templates" className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">Document Master</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Choose the active template and default layout.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="h-10 w-full rounded-md border border-slate-300 bg-white pl-9 pr-3 text-sm outline-none focus:border-slate-950 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-white sm:w-56"
              onChange={(event) => onSearch(event.target.value)}
              placeholder="Search templates"
              value={search}
            />
          </label>
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            onChange={(event) => onCategory(event.target.value)}
            value={category}
          >
            {categories.map((item) => (
              <option key={item.label} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="h-72 animate-pulse rounded-md bg-slate-200 dark:bg-slate-800" key={index} />
          ))}
        </div>
      ) : templates.length ? (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={templates.map((template) => template._id)} strategy={rectSortingStrategy}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard
                  isDefault={template._id === defaultId}
                  key={template._id}
                  onSelect={onSelect}
                  selected={template._id === selectedId}
                  template={template}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
          No templates found. Seed the backend or create templates through the API.
        </div>
      )}
    </section>
  );
};
