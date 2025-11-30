"use client";


import Link from "next/link";



export default function LoginForm() {


  return (
    <div className="gap-1.5 min-h-screen bg-gray-950 flex justify-evenly items-center px-4">
      <div className="w-full max-w-sm ">
        <h1 className="text-2xl font-normal text-center text-white mb-8">
          Sign in
        </h1>

        <div className="space-y-4">
          <div>
            <div className="text-sm text-white mb-1">Email Address</div>
            <input
              type="email"
              className="w-full px-3 py-2 border-b-1 border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div>
            <div className="text-sm text-white mb-1">Password</div>
            <input
              type="password"
              className="w-full px-3 py-2 border-b-1 border-gray-300 focus:outline-none focus:border-gray-400"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
              Forgot password
            </a>
          </div>

     
          <button
          
            className="w-full bg-emerald-800 text-white py-2 px-4 rounded-none hover:bg-gray-900 focus:outline-none cursor-pointer"
          >
            Sign in
          </button>
      <p className="text-white flex justify-center items-center opacity-50 text-1"><Link href="/cadastro">Cadastrar</Link></p>
        </div>

        <footer className="mt-16 text-center">
          <div className="text-xs text-gray-500">
            Todos direitos autorais para x
          </div>
        </footer>
      </div>

      <div className="shadow-2xl/30 shadow-emerald-900 w-2xl h-96 flex flex-col items-center justify-center rounded-2xl">
        <h1 className="text-center items-center text-4xl text-emerald-800 font-bold font-sans ">
          welcome
        </h1>
        <p className="text-emerald-900 font">Seja bem vindo</p>

      </div>
    </div>
  );
}
