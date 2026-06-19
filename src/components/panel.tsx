import { useEffect, useState } from "react"
import { Info } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "#lib/utils"

export type TopPanelProps = {
    onInfoClick?: () => void
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}

function formatDate(date: Date): string {
    return date.toLocaleDateString([], { day: "numeric", month: "long" })
}

function formatDay(date: Date): string {
    return date.toLocaleDateString([], { weekday: "short" })
}

export default function TopPanel({ onInfoClick }: TopPanelProps) {
    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 z-50 flex h-8 w-full items-center justify-between px-2 backdrop-blur-xl",
                "bg-[rgba(17,17,17,0.50)] transition-colors duration-200 hover:bg-[rgba(24,24,24,0.60)]",
            )}
        >
            <button
                type="button"
                onClick={onInfoClick}
                aria-label="About information"
                className={cn(
                    "flex gap-2 h-9 w-20 items-center justify-center text-zinc-300 transition-all duration-200",
                    "hover:scale-105 hover:border-zinc-500 hover:text-zinc-100 active:scale-95 cursor-pointer",
                )}
            >
                <Info size={16} />
                <span className="text-sm font-medium">info</span>
            </button>

            <time
                dateTime={now.toISOString()}
                className="font-mono text-sm tracking-widest text-zinc-300 select-none"
            >
                <span> {formatDay(now)} </span>
                <span> {formatDate(now)} </span>
                <span> {formatTime(now)} </span>
            </time>
        </motion.header>
    )
}
