import { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const Input = ({ ...props }: IProps) => {
  return (
    <input
      className="border-[1px] border-gray-300 shadow-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500  px-2 py-1  rounded-md mb-2"
      {...props}
    />
  );
};

export default Input;
