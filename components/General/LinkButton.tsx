"use client";

import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  label: string;
  link?: string;
  className?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  link = "/",
  className = "",
  icon,
  rightIcon,
}) => {
  return (
    <Link
      href={link}
      className={`w-full bg-white text-black flex items-center justify-center py-2 rounded-lg transition duration-300 hover:underline underline-offset-3 ${className}
        `}
    >
      <div className="flex items-center justify-center w-full">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </Link>
  );
};

export default LinkButton;
