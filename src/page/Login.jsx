import React, {useState} from 'react';
import Text from '../components/elements/Text';
import { useSignInEmailPassword } from '@nhost/react'
import { NavLink, Navigate } from 'react-router-dom'

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signInEmailPassword, isLoading, isSuccess, needsEmailVerification, isError, error } =
    useSignInEmailPassword()        

    const onLogin = (e) => {
        e.preventDefault();
        console.log("e")
        // navigate("/home");
        signInEmailPassword(email, password)
    }

    
    if (isSuccess) {
        return <Navigate to="/home" replace={true} />
    }

    const disableForm = isLoading || needsEmailVerification
    return(
        <>
            <main >        
                <section>
                    <div className="flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-md space-y-8">
                            <div>
                                <Text className="text-4xl text-white text-center font-bold mb-2">
                                    Focus<span className="text-tertiary">App</span>
                                </Text>

                                <h2 className="text-white text-center text-base  tracking-tight text-gray-900">
                                    Welcome, Name Name
                                </h2>                        
                            </div>

                            {needsEmailVerification ? (
                                <p>
                                    Please check your mailbox and follow the verification link to verify your email.
                                </p>
                            ) : (
                                <form className="mt-8 space-y-6" >
                                {/* <input type="hidden" name="remember" /> */}
                                    <div className=" space-y-6 rounded-md shadow-sm">
                                                                                
                                        
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">
                                            Email address
                                            </label>
                                            <input
                                                id="email-address"
                                                name="email"
                                                type="email"                                    
                                                required
                                                disabled={disableForm}
                                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Email address"
                                                onChange={(e)=>setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="sr-only">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                name="password"
                                                type="password"                                    
                                                required
                                                disabled={disableForm}
                                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                                placeholder="Password"
                                                onChange={(e)=>setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>                        

                                    <div>
                                        <button
                                            // type="submit"
                                            onClick={onLogin}
                                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >                                
                                            {isLoading ? "Logging in . . ." : 'Login'}
                                        </button>
                                    </div>

                                    {isError ? <p className={{fontSize:"14px", color:"red"}}>{error?.message}</p> : null}
                                </form>
                            )}

                            <p className="text-sm text-white text-center">
                                No account yet?{' '}
                                <NavLink to="/" className="underline text-tertiary">
                                    Sign up
                                </NavLink>
                            </p>
                            
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login