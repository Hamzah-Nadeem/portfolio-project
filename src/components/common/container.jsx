import React from "react";

export default function Container({
  children,
  className = "",
  style = {},
  ...rest
}) {
  return (
    <div
      className={`m-auto w-[min(calc(100%-2rem),1280px)] ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}
