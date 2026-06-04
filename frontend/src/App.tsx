import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes/AppRoutes";
import { useTemplateStore } from "./store/templateStore";

export const App = () => {
  const darkMode = useTemplateStore((state) => state.darkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" />
    </>
  );
};
