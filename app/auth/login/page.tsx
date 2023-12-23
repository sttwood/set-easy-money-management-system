import Link from 'next/link'
import React from 'react'

const Login = () => {
    return (
        <main className='flex justify-center items-center h-screen'>
            <Link
                href="/dashboard"
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
                Go to dashboard
            </Link>
        </main>
    )
}

export default Login