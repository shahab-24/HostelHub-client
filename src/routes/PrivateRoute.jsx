import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";


const PrivateRoute = ({children}) => {
        const {user, loading} = useAuth()
        const [isLoading] = useRole()
        // console.log(user)
        const location = useLocation()
        // if(loading && isLoading) return <Loader></Loader>
        if(user) return children;

        return <Navigate to='/login' state={{ from: location }} replace />
}

        


export default PrivateRoute;