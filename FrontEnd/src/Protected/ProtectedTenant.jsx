import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast'
const ProtectedTenant = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      toast.error("Your need to login first");
      return <Navigate to="/login" replace />;
    } else {
      if(user?.user?.role==="T"){
        return children;
      }
    }
  }
};
export default ProtectedTenant;
