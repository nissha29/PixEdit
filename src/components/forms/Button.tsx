"use client";

import { IButton } from "../../types/types";

const Button = ({ children, className, ...rest }: IButton) => {
  return (
    <button
      className={`rounded-full hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 border-accent-dark hover:border-accent-light ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;