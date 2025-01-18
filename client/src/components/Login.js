import { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router";

const Login = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/', { replace: true })
        }
    })

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null)
        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json();

        if (!data.success) {
            setError(data.message)
        }
        else {
            localStorage.setItem('user', JSON.stringify(data.user))
            navigate('/', { replace: true })
        }
    }

    return (
        <div className="flex justify-center items-center h-[90vh] bg-blue-500">
            <div className="bg-gray-800 p-5 rounded-lg text-white flex flex-col items-center text-lg w-[22%]">
                <span className="bg-blue-200 font-medium text-xl px-10 py-2  relative bottom-10 text-blue-950">Login</span>
                <form className="flex flex-col w-[90%] gap-4">
                    {
                        (error) ? (
                            <span className="text-red-500 text-sm self-center">{error}</span>
                        ) : (null)
                    }
                    <label htmlFor="email">Email</label>
                    <input className="text-black px-2 rounded-sm py-1 focus:outline-none" id="email" type="email" name="email" placeholder="abc@mail.com" value={user.email} onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input className="text-black px-2 rounded-sm py-1 focus:outline-none" id="password" type="password" name="password" placeholder="Xyz@2025" value={user.password} onChange={handleChange} />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8" onClick={handleSubmit}>Login</button>
                </form>
                <span className="text-sm mt-8">Don't have an account? <Link to="/register" className="text-blue-300">Register</Link></span>
            </div>
        </div>
    )
}
export default Login;  