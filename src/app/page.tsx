import Link from "next/link";

const games = [
  {
    title: "Sliding Puzzle",
    description: "Slide the tiles to solve the picture puzzle",
    href: "/puzzle",
    icon: "🧩",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <h1 className="text-4xl font-bold">Norah&apos;s Games</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link
            key={game.href}
            href={game.href}
            className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-700 bg-neutral-800 p-8 transition-colors hover:border-neutral-500 hover:bg-neutral-700"
          >
            <span className="text-5xl">{game.icon}</span>
            <span className="text-xl font-semibold">{game.title}</span>
            <span className="text-sm text-neutral-400">
              {game.description}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
