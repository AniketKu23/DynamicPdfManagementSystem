import { ImageUp } from "lucide-react";
import toast from "react-hot-toast";
import { uploadApi } from "../services/api";
import { useTemplateStore } from "../store/templateStore";

export const LogoUploader = () => {
  const logo = useTemplateStore((state) => state.configuration.logo);
  const setConfiguration = useTemplateStore((state) => state.setConfiguration);

  const handleChange = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }

    const promise = uploadApi.logo(file).then((url) => {
      setConfiguration({ logo: url });
      return url;
    });

    toast.promise(promise, {
      loading: "Uploading logo",
      success: "Logo uploaded",
      error: "Logo upload failed"
    });
  };

  return (
    <section className="rounded-md border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-4 flex items-center gap-2">
        <ImageUp size={18} className="text-slate-500" />
        <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Logo Upload</h2>
      </div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-slate-300 p-5 text-center text-sm text-slate-500 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-900">
        {logo ? <img alt="" className="max-h-16 object-contain" src={logo} /> : <ImageUp size={28} />}
        <span>Upload PNG, JPEG, WEBP, or SVG logo</span>
        <input className="sr-only" onChange={(event) => handleChange(event.target.files?.[0])} type="file" accept="image/*" />
      </label>
    </section>
  );
};
