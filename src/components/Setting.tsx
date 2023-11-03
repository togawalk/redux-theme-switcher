import { ReactNode } from "react";

interface Props {
  label: string;
  description: string;
  children: ReactNode;
}

function Setting(props: Props) {
  const {label, description, children} = props
  return (
    <div className="border-2 rounded dark:border-gray-700 dark:bg-gray-800 p-5">
      <div className="border-b-2 pb-4 dark:border-gray-700">
        <label htmlFor="" className="font-semibold dark:text-white">
          {label}
        </label>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

export default Setting;
