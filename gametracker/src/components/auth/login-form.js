'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Voce precisa colocar valores')
        }
        try {
            const result = await signIn('credentials', {
                username: username,
                password: password,
                redirect: false
            });
            if (result.error) {
                setError("Usuario ou senha invalidos")
                return;
            }
            router.push('/dashboard');
            router.refresh();
        } catch (error) {
            setError("Ocorreu um erro insesperado. Tente novamente")
        }
    }

    return (
         <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-300"
            >
              Nome de Usuário
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border-none rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300"
            >
              Senha
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border-none rounded-md text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
          
          {error && (
            <p className="text-center text-sm text-red-400">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-colors"
            >
              Entrar
            </button>
          </div>
        </form>
    )
}