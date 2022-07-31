interface ErrorProps {
  message: string;
}
const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <p className="max-w-sm p-5 mx-auto mt-16 text-lg font-semibold text-center bg-red-400 rounded min-w-min text-light">
      {message}
    </p>
  );
};

export default ErrorMessage;
