export default function Home() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to DATN Project 🚀
        </h1>

        <div className="mt-6 flex gap-4">
          <a
            href="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Login
          </a>
          <a
            href="/register"
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600"
          >
            Register
          </a>
        </div>
      </section>

    </div>
  )
}

function Feature({ title, desc }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  )
}
