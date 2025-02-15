interface IProps {
  msg: string;
}
const Error = ({ msg }: IProps) => {
  return msg ? (
    <span className="block text-red-700 text-sm font-semibold">{msg}</span>
  ) : null;
};

export default Error;
