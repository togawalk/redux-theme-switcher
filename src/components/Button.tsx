import * as React from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../features/theme/ThemeSlice";
import { cn } from "../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    selectButton: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ name, className, selectButton, ...props }, ref) => {
    const dispatch = useDispatch();
    return (
      <button
      onClick={() => dispatch(changeTheme(name))}
        className={cn('px-3 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:text-gray-200 dark:bg-[#ffffff1a]', className, `${selectButton ? "bg-gray-100 dark:bg-gray-700" : undefined}`)}
        ref={ref}
        {...props}
      />
    )
  }
)

export { Button }
