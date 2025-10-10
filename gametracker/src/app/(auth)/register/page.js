import RegisterForm from '@/components/auth/register-form';
import Link from 'next/link';

export const metadata = {
  description: "Pagina para se registrar no site",
};
export default function RegisterPage() {
    
    return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">Criar Conta</h1>
        <p className="text-center text-gray-400">
          Já tem uma conta?{' '}
          <Link href="/login" className="font-medium text-sky-400 hover:text-sky-500">
            Faça login
          </Link>
        </p>
      <RegisterForm />
    </div>
    </div>
  );
}