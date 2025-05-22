import { Navigate } from "react-router-dom";
import Loader from "../Components/Shared/Loader";

import useRole from "../hooks/useRole";
import { useContext } from "react";
import useAuth from "../hooks/useAuth";


const AdminRoute = ({children}) => {
        const {loading} = useAuth()
        const [role, isLoading] = useRole()

        if(isLoading) return <Loader></Loader>
        if(role === 'admin') return children;

        return <Navigate to='/dashboard'  replace />
};

export default AdminRoute;