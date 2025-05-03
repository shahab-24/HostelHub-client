import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Shared/Loader";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({children}) => {
        const {user, loading} = useAuth()
        // console.log(user)
        const location = useLocation()
        // if(loading) return <Loader></Loader>
        if(user) return children;

        return <Navigate to='/login' state={{ from: location }} replace='true' />
}

        


export default PrivateRoute;