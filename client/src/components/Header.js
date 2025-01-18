import { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router";

const Header = () => {

    const [user, setUser] = useState(localStorage.getItem('user'))
    const navigate = useNavigate();

    useEffect(() => {
        setUser(localStorage.getItem('user'))
    })

    const handleLogout = (e) => {

        e.preventDefault();

        localStorage.removeItem('user')
        setUser(null)

        navigate("/login", { replace: true })



    }

    return (
        <div className="p-2 bg-yellow-400  flex justify-between px-10 py-2">
            <div className="text-blue-800 font-bold text-2xl flex gap-2 w-1/2">
                <img src={'https://quantumitinnovation.com/assets/web_icon.png'} />
                Quantum IT Innovation
            </div>
            {
                (user) ? (

                    <button className="bg-blue-950 px-4 py-2 rounded-md text-white" onClick={handleLogout}>Logout</button>
                ) : (null)
            }
        </div>
    )
}

export default Header;