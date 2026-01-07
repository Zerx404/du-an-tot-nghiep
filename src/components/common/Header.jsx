import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  )
}
