import { ToastContainer } from 'react-toastify';

interface ToastProviderProps {}

const ToastProvider: React.FC<ToastProviderProps> = ({}) => {
  return (
    <ToastContainer
      containerId="main"
      position="top-center"
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      bodyClassName="font-sans"
      enableMultiContainer
    />
  );
};

export default ToastProvider;
