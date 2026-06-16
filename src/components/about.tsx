import { Mail, MapPin } from "lucide-react";

export default function About() {
    return (
        <main className="relative overflow-hidden bg-zinc-950/40 px-4 py-16 text-slate-100 sm:px-6 lg:px-8 dark:bg-background dark:text-foreground">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    I'm Arnav Singh,
                </h1>

                <div className="mt-1 ml-1">
                    <a href="mailto:arnav4c@gmail.com" className="flex gap-1 items-center text-zinc-400 hover:text-zinc-200 transition duration-300">
                        <Mail size={20} />arnav4c@gmail.com
                    </a>

                    <p className="flex gap-1 items-center text-zinc-400 hover:text-zinc-200 transition duration-300">
                        <MapPin size={20} /> Greater Noida, India
                    </p>
                </div>

                <p className="mt-4 text-lg text-slate-300">
                    A developer who loves solving problems using computers and software. I enjoy turning ideas into real projects and learning new technologies along the way.
                </p>

                <p className="mt-4 text-lg text-slate-300">
                    Currently, I work with modern web technologies. On the frontend, I use HTML, CSS, JavaScript, React, and TypeScript to build responsive and interactive user interfaces. On the backend, I work with Node.js, Express, PostgreSQL, and MongoDB to create scalable and reliable applications. I also build cross-platform desktop applications using Electron.
                </p>

                <p className="mt-4 text-lg text-slate-300">
                    I enjoy learning new technologies, experimenting with ideas, and turning concepts into products that people can use and enjoy.
                </p>
            </div>
        </main>
    )
}