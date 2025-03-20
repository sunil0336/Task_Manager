import Link from "next/link"
import { ModeToggle } from "./mode-toggle"

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="text-xl font-bold">
          Task Manager
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/tasks" className="hover:underline">
            All Tasks
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

