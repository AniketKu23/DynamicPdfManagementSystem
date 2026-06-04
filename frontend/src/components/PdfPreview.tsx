import { Download, Eye, FileText } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { pdfApi } from "../services/api";
import { useTemplateStore } from "../store/templateStore";
import { categories } from "../utils/sampleData";
import { DocumentCategory } from "../types";

export const PdfPreview = () => {
  const previewCategory = useTemplateStore((state) => state.previewCategory);
  const previewData = useTemplateStore((state) => state.previewData);
  const configuration = useTemplateStore((state) => state.configuration);
  const selectedTemplate = useTemplateStore((state) => state.selectedTemplate);
  const setPreviewCategory = useTemplateStore((state) => state.setPreviewCategory);
  const setPreviewData = useTemplateStore((state) => state.setPreviewData);

  const getPdfPayload = () => ({
    documentType: previewCategory,
    data: previewData,
    templateName: selectedTemplate?.name,
    configuration: {
      primaryColor: configuration.primaryColor,
      secondaryColor: configuration.secondaryColor,
      headerFont: configuration.headerFont,
      bodyFont: configuration.bodyFont,
      footerFont: configuration.footerFont,
      headerSize: configuration.headerSize,
      bodySize: configuration.bodySize,
      footerSize: configuration.footerSize,
      headerBold: configuration.headerBold,
      bodyBold: configuration.bodyBold,
      footerBold: configuration.footerBold,
      alignment: configuration.alignment,
      logo: configuration.logo ?? ""
    }
  });

  const previewMutation = useMutation({
    mutationFn: () => pdfApi.preview(getPdfPayload()),
    onError: () => toast.error("PDF preview failed")
  });

  const downloadMutation = useMutation({
    mutationFn: () => pdfApi.generateBlob(getPdfPayload(), true),
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "generated-document.pdf";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded");
    },
    onError: () => toast.error("PDF download failed")
  });

  return (
    <section id="pdf-output" className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-center gap-2">
        <FileText size={18} className="text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">PDF Preview</h2>
      </div>
      <div className="grid gap-3 md:grid-cols-[180px_1fr]">
        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          onChange={(event) => setPreviewCategory(event.target.value as DocumentCategory)}
          value={previewCategory}
        >
          {categories
            .filter((item) => item.value)
            .map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
        </select>
        <input
          className="h-10 rounded-md border border-slate-300 bg-white px-3 font-mono text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          onChange={(event) => {
            try {
              setPreviewData(JSON.parse(event.target.value));
            } catch {
              return;
            }
          }}
          value={JSON.stringify(previewData)}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950"
          disabled={previewMutation.isPending}
          onClick={() => previewMutation.mutate()}
          type="button"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
          disabled={downloadMutation.isPending}
          onClick={() => downloadMutation.mutate()}
          type="button"
        >
          <Download size={16} />
          Download
        </button>
      </div>
      <div className="mt-4 h-[480px] overflow-hidden rounded-md border border-slate-200 dark:border-slate-800">
        {previewMutation.data ? (
          <iframe className="h-full w-full bg-white" srcDoc={previewMutation.data} title="PDF preview" />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-50 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            Generate a preview to inspect the server-rendered document.
          </div>
        )}
      </div>
    </section>
  );
};
