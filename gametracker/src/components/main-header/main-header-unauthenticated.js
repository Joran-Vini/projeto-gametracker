import Link from "next/link";

export default function MainHeaderUnauthenticated() {
    return (
        <>
         <li>
                    <Link href="/register" className="hover:text-sky-400 transition-colors">
                        Registrar
                    </Link>
                </li>
                <li>
                    <Link href="/login" className="hover:text-sky-400 transition-colors">
                        Logar
                    </Link>
                </li>
        </>
    )
}