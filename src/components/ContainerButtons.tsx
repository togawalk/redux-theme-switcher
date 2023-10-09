import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../features/theme/ThemeSlice";
import type { RootState } from "../store";
import { useEffect } from "react";

const Button = ({ name, selectButton }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(changeTheme(name))}
      className={`bg-black text-white px-3 py-2 rounded transition-all ${
        selectButton ? "bg-blue-800" : undefined
      }`}
    >
      {name}
    </button>
  );
};

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

  useEffect(() =>{
    themeSystem.addEventListener("change", changeSystemDark)
    return () => {
      window.removeEventListener("change", changeSystemDark)
    }
  }, [themeValue])


  return (
    <div className="flex space-x-4 justify-center">
      <Button name="light" selectButton={themeValue === "light"} />
      <Button name="dark" selectButton={themeValue === "dark"} />
      <Button name="system" selectButton={themeValue === "system"} />
    </div>
  );
};
