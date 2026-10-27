'use client';
import useUserStore from '../app/stores/userStore';
import Link from 'next/link';

export default function Header() {
const { user,isAuthenticated, clearUser } = useUserStore();

const handleLogout = () => {
    clearUser();
  };
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-300">
            MovieWatch
          </Link>
        </div>
          {isAuthenticated ? (<Link href="/profil">Bonjour {user} | <button onClick={handleLogout}>
      Se déconnecter 
    </button> | <Link href="/favoris" className="hover:text-gray-300">
               Favoris 
            </Link></Link>) : (<div><Link href="/login" className="hover:text-gray-300">
              Se connecter 
            </Link> |  <Link href="/signup" className="hover:text-gray-300">
               S'inscrire
            </Link></div>)}        
      </nav>
    </header>
  );
}