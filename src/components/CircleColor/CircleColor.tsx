import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color: string;
}
const CircleColor = ({ color, ...props }: IProps) => {
  return (
    <span
      className={`block size-5 rounded-full cursor-pointer`}
      style={{
        backgroundColor: color,
      }}
      {...props}
    ></span>
  );
};

export default CircleColor;
