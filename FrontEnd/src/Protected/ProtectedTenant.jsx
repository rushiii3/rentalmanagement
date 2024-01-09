import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast'
const ProtectedTenant = ({ children }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      toast.error("Your need to login first");
      return <Navigate to="/login" replace />;
    } else {
      return children;
    }
  }
};

export default ProtectedTenant;
