import { useEffect, useState } from "react";
import { Navigate } from "react-router";

const Protected = ({ children }) => {

    const [user, setUser] = useState(localStorage.getItem('user'));

    if (!user) {
        return <Navigate to="/login" replace={true} />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected;