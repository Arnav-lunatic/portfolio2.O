import { X } from "lucide-react"
import { useRef, useState } from "react"
import type { WindowType } from "../App"



export default function Window({ title, content, zIndex, onClose, initialPosition }: WindowType) {
    const [position, setPosition] = useState({
        x: initialPosition?.x ?? 64,
        y: initialPosition?.y ?? 64,
    })
    const [dragging, setDragging] = useState(false)
    const dragRef = useRef<{
        startX: number
        startY: number
        originX: number
        originY: number
    } | null>(null)

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        if (event.button !== 0) return

        dragRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            originX: position.x,
            originY: position.y,
        }
        setDragging(true)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!dragging || !dragRef.current) return

        const deltaX = event.clientX - dragRef.current.startX
        const deltaY = event.clientY - dragRef.current.startY

        setPosition({
            x: dragRef.current.originX + deltaX,
            y: dragRef.current.originY + deltaY,
        })
    }

    function endDrag(event: React.PointerEvent<HTMLDivElement>) {
        if (!dragging) return
        setDragging(false)
        dragRef.current = null
        event.currentTarget.releasePointerCapture(event.pointerId)
    }

    return (
        <div
            className="absolute"
            style={{ left: position.x, top: position.y, zIndex: zIndex ?? 20, touchAction: "none" }}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
        >
            <div className="relative h-full rounded-xl border border-white/10 bg-gradient-to-tr from-black/60 via-slate-950/60 to-black/50 text-slate-100 shadow-[0_36px_80px_-36px_rgba(0,0,0,0.75)] backdrop-blur-2xl">
                <div
                    className="relative flex cursor-move items-center justify-between rounded-t-xl Zbg-gradient-to-b from-black/80 via-black/60 to-black/30 px-2 py-1 text-slate-200 shadow-inner shadow-black/30"
                    onPointerDown={handlePointerDown}
                >

                    <div className="pointer-events-none flex-1 text-center text-sm font-medium tracking-tight text-slate-100/90">
                        {title ?? ""}
                    </div>

                    <button
                        type="button"
                        onPointerDown={(event) => event.stopPropagation()}
                        onClick={onClose}
                        className="relative z-10 inline-flex h-6 w-6 items-center justify-center bg-white/5 text-slate-100 transition duration-200 hover:bg-white/10 active:scale-95 rounded-full"
                        aria-label="Close window"
                    >
                        <span className="relative text-3xl font-semibold text-amber-50"><X /></span>
                    </button>
                </div>
                <div className="relative p-1 h-full">{content}</div>
            </div>
        </div>
    )
}
