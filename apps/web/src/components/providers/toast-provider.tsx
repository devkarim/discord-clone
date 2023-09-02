import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {}

const ToastProvider: React.FC<ToastProviderProps> = ({}) => {
  return (
    <ToastContainer
      position="top-center"
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      bodyClassName="font-sans"
    />
  );
};

export default ToastProvider;
