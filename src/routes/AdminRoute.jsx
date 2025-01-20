import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader";

import useRole from "../hooks/useRole";


const AdminRoute = ({children}) => {
        
        const [role, isLoading] = useRole()

        if(isLoading) return <Loader></Loader>
        if(role === 'admin') return children;

        return <Navigate to='/dashboard'  replace='true' />
};

export default AdminRoute;