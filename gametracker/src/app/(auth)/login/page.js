import LoginForm from "@/components/auth/login-form"
import Link from "next/link"


export default function LoginPage() {

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-200">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Login</h1>
        <p className="text-center text-gray-400">
          Não possui uma conta?{' '}
          <Link href="/register" className="font-medium text-sky-400 hover:text-sky-500">
            Cadastrar
          </Link>
        </p>
        <LoginForm />
      </div>
      </div>
    )
}