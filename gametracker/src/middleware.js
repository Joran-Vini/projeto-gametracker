import { withAuth } from 'next-auth/middleware'


//Qual pagina o usuario sera direcionado se nao estiver logado
export default withAuth({
    pages: {
        signIn: '/login',
    },
});

export const config = {
    // O "matcher" define quais rotas o middleware deve proteger.
    matcher: [
        "/dashboard/:path*"
    ]
};