import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { Button } from "./Button";

export const ContainerButtons = () => {
  const themeValue = useSelector((state: RootState) => state.theme.theme);
  const htmlDoc = document.documentElement;
  const themeSystem = window.matchMedia("(prefers-color-scheme: dark)");

  if (themeValue === "light") {
    htmlDoc.classList.remove("dark");
    localStorage.theme = "light";
  }
  if (themeValue === "dark") {
    htmlDoc.classList.add("dark");
    localStorage.theme = "dark";
  }
  if (themeValue === "system") {
    localStorage.removeItem("theme");
    if (!("theme" in localStorage) && themeSystem.matches) {
      console.log(themeSystem.matches);
      htmlDoc.classList.add("dark");
    } else {
      htmlDoc.classList.add("light");
    }
  }

  const changeSystemDark = (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        htmlDoc.classList.add("dark");
      } else {
        htmlDoc.classList.remove("dark");
      }
    }
  };

  useEffect(() => {
    themeSystem.addEventListener("change", changeSystemDark);
    return () => {
      window.removeEventListener("change", changeSystemDark);
    };
  }, [themeValue]);

  return (
    <div className="inline-flex shadow-sm" role="group">
      <Button name="light" selectButton={themeValue === "light"} className="rounded-l-md">Light</Button>
      <Button name="dark" selectButton={themeValue === "dark"} className="ml-[-1px]">Dark</Button>
      <Button name="system" selectButton={themeValue === "system"} className="ml-[-1px] rounded-r-md">System</Button>
    </div>
  );
};
