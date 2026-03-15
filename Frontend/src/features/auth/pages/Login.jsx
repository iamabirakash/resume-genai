import React,{useState} from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (<main className="min-h-screen flex items-center justify-center bg-gray-900"><h1 className="text-white text-xl">Loading...</h1></main>)
    }


    return (
        <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 px-4">
            <div className="w-full max-w-md">
                <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Login</h1>
                    <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                onChange={(e) => { setEmail(e.target.value) }}
                                type="email" 
                                id="email" 
                                name='email' 
                                placeholder='you@example.com'
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <input
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" 
                                id="password" 
                                name='password' 
                                placeholder='••••••••'
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </div>
                        <button className='w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold rounded-lg transition transform duration-150 shadow-lg'>Login</button>
                    </form>
                    <p className="mt-6 text-center text-gray-400 text-sm">Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-400 font-medium transition">Register</Link></p>
                </div>
            </div>
        </main>
    )
}

export default Login