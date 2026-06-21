export default function Navbar() {
  return (
    <header className="flex items-center justify-between py-8">
      <h1 className="text-xl font-semibold tracking-tight">Maxim Brna</h1>

      <a
        href="/cv.pdf"
        className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold hover:bg-indigo-500"
      >
        Download CV
      </a>
    </header>
  );
}