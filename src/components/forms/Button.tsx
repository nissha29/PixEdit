"use client";

import { IButton } from "../../types/types";

const Button = ({ children, className, ...rest }: IButton) => {
  return (
    <button
      className={`rounded-lg hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;