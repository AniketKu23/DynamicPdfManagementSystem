import axios from "axios";
import { ApiResponse, PdfRequest, Template, TemplateConfiguration } from "../types";

const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

  if (typeof window !== "undefined") {
    try {
      const apiUrl = new URL(configuredUrl, window.location.origin);
      if (apiUrl.origin === window.location.origin) {
        console.error(
          "VITE_API_URL points to the frontend domain. Set it to the Render backend URL, for example https://your-service.onrender.com/api"
        );
      }
    } catch {
      console.error("VITE_API_URL is not a valid URL", configuredUrl);
    }
  }

  return configuredUrl;
};

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60000
});

export const templateApi = {
  list: async (params: { search?: string; category?: string }) => {
    const { data } = await api.get<ApiResponse<Template[]>>("/templates", { params });
    return data.data;
  },
  getConfiguration: async () => {
    const { data } = await api.get<ApiResponse<TemplateConfiguration>>("/templates/configuration");
    return data.data;
  },
  saveConfiguration: async (payload: TemplateConfiguration) => {
    const templateId = typeof payload.templateId === "string" ? payload.templateId : payload.templateId._id;
    const { data } = await api.post<ApiResponse<TemplateConfiguration>>("/templates/save", {
      ...payload,
      templateId
    });
    return data.data;
  },
  reorder: async (templateIds: string[]) => {
    const { data } = await api.post<ApiResponse<Template[]>>("/templates/reorder", { templateIds });
    return data.data;
  },
  exportConfiguration: () => `${api.defaults.baseURL}/templates/configuration/export`,
  importConfiguration: async (payload: TemplateConfiguration) => {
    const { data } = await api.post<ApiResponse<TemplateConfiguration>>("/templates/configuration/import", payload);
    return data.data;
  }
};

export const uploadApi = {
  logo: async (file: File) => {
    const form = new FormData();
    form.append("logo", file);
    const { data } = await api.post<ApiResponse<{ url: string }>>("/upload/logo", form);
    return data.data.url;
  }
};

export const pdfApi = {
  preview: async (payload: PdfRequest) => {
    const { data } = await api.post<string>("/pdf/preview", payload, { responseType: "text" });
    return data;
  },
  generateBlob: async (payload: PdfRequest, download = false) => {
    const { data } = await api.post<Blob>(download ? "/pdf/download" : "/pdf/generate", payload, {
      responseType: "blob"
    });
    return data;
  }
};
