import axiosClient from '../../api/axiosClient'

export default function Login() {
  const handleLogin = async () => {
    await axiosClient.post('/login', {
      email: 'test@gmail.com',
      password: '123456',
    })
  }

  return (
    <div>
      <h1 className="text-xl mb-4">Login</h1>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  )
}
