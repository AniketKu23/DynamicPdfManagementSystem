import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { templateApi } from "../services/api";
import { TemplateConfiguration } from "../types";

export const useTemplates = (search: string, category: string) =>
  useQuery({
    queryKey: ["templates", search, category],
    queryFn: () => templateApi.list({ search, category })
  });

export const useConfiguration = () =>
  useQuery({
    queryKey: ["configuration"],
    queryFn: templateApi.getConfiguration,
    retry: 1
  });

export const useSaveConfiguration = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TemplateConfiguration) => templateApi.saveConfiguration(payload),
    onSuccess: () => {
      toast.success("Configuration saved");
      queryClient.invalidateQueries({ queryKey: ["configuration"] });
    },
    onError: () => toast.error("Unable to save configuration")
  });
};
