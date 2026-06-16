import {
    CalendarDays,
    Cloud,
    Code2,
    Music,
    Palette,
    Search,
    Settings2,
    Sparkles,
} from "lucide-react"

const apps = [
    { title: "Finder", icon: Search },
    { title: "Spotlight", icon: Sparkles },
    { title: "Calendar", icon: CalendarDays },
    { title: "Music", icon: Music },
    { title: "Settings", icon: Settings2 },
    { title: "Cloud", icon: Cloud },
    { title: "Design", icon: Palette },
    { title: "Dev", icon: Code2 },
]

export default function LaunchpadMenu() {
    return (
        <main className="relative overflow-hidden bg-slate-950 px-4 py-16 text-slate-100 sm:px-6 lg:px-8 dark:bg-background dark:text-foreground">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.55),transparent_30%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.65),transparent_30%)]" />
            <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 text-center">
                <div className="max-w-2xl">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">
                        Launchpad
                    </p>
                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
                        Projects
                    </h1>
                </div>

                <div className="grid w-full max-w-5xl grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {apps.map(({ title, icon: Icon }) => (
                        <button
                            key={title}
                            type="button"
                            style={{ width: 150, height: 150 }}
                            className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-5 text-center text-slate-100 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:scale-[1.04] hover:shadow-[0_26px_70px_-32px_rgba(15,23,42,0.65)] hover:bg-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30"
                        >
                            <span className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 text-slate-200 shadow-sm shadow-slate-900/20 transition duration-300 group-hover:bg-slate-800/70 group-hover:text-slate-100">
                                <Icon className="h-7 w-7" />
                            </span>
                            <span className="mt-1 text-sm font-medium tracking-tight text-slate-100">
                                {title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </main>
    )
}
