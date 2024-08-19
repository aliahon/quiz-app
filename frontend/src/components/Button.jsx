import { cn } from "../utils/utils";

export default function Button({
  children,
  float = false,
  className,
  ...props
}) {
  return (
    <button
      {...props}
      className={cn(
        `${buttonClasses} ${buttonHoverClasses} ${buttonDisabledHoverClasses} ${
          float ? buttonUiClasses + buttonOptionHoverClasses : ""
        }`,
        className
      )}
    >
      {children}
    </button>
  );
}

const buttonClasses = `
  block
  font-inherit
  text-inherit
  text-[2rem]
  border-[2px]
  border-dark
  bg-dark
  py-[1.2rem]
  px-[2.4rem]
  cursor-pointer
  rounded-full
  transition
  duration-300
`;

const buttonHoverClasses = `
  hover:bg-darkest
`;

const buttonOptionHoverClasses = `
  hover:translate-x-3
`;

const buttonDisabledHoverClasses = `
  disabled:hover:cursor-not-allowed
`;

const buttonUiClasses = `
  float-right
`;
