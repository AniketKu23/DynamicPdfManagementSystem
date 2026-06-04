import { CheckCircle, GripVertical, Star } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Template } from "../types";

type TemplateCardProps = {
  template: Template;
  selected: boolean;
  isDefault: boolean;
  onSelect: (template: Template) => void;
};

export const TemplateCard = ({ template, selected, isDefault, onSelect }: TemplateCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: template._id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`rounded-md border bg-white shadow-sm transition dark:bg-slate-950 ${
        selected ? "border-slate-950 dark:border-white" : "border-slate-200 dark:border-slate-800"
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-t-md bg-slate-100 dark:bg-slate-900">
        <img alt="" className="h-full w-full object-cover" src={template.thumbnail} />
        <button
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-slate-600 shadow-sm dark:bg-slate-950/90 dark:text-slate-200"
          title="Drag to reorder"
          type="button"
          {...attributes}
          {...listeners}
        >
          <GripVertical size={16} />
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{template.name}</h3>
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{template.description}</p>
          </div>
          {isDefault && <Star className="shrink-0 fill-amber-400 text-amber-400" size={18} />}
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded bg-slate-100 px-2 py-1 text-xs capitalize text-slate-600 dark:bg-slate-900 dark:text-slate-300">
            {template.category}
          </span>
          <button
            className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950"
            onClick={() => onSelect(template)}
            type="button"
          >
            {selected && <CheckCircle size={15} />}
            Select
          </button>
        </div>
      </div>
    </article>
  );
};
