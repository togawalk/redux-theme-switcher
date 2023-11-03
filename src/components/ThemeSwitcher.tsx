import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../features/theme/ThemeSlice";

function ThemeSwitcher() {
  const dispatch = useDispatch();
  const settingTheme: { value: string; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
  ];

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
    <fieldset className="mt-5 dark:text-white">
      <div className="inline-grid gap-2 gap-x-8 gap-y-5 grid-cols-4">
        {settingTheme.map((item) => (
          <div className="flex items-center" key={item.value}>
            <input
              type="radio"
              name="default-radio"
              value={item.value}
              onChange={(e) => dispatch(changeTheme(e.target.value))}
              checked={themeValue === item.value}
              id={`theme-section-${item.value}`}
              className="rounded-full text-indigo-600 bg-white border-gray-300 border-2 focus:ring-indigo-500 without-ring dark:bg-gray-700 dark:border-gray-600 dark:checked:bg-indigo-600 dark:checked:border-indigo-600"
            />
            <label
              htmlFor={`theme-section-${item.value}`}
              className="text-sm font-medium ml-3"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export default ThemeSwitcher;
