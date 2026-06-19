import { X } from "lucide-react"
import { useContext, useRef, useState } from "react"
import { windowContext, type WindowType } from "../App"

export default function Window({ title, content, zIndex = 0, onClose, initialPosition }: WindowType) {
    const { setWindows } = useContext(windowContext);

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

    const [size, setSize] = useState<{ width: number; height: number }>({
        width: initialPosition?.width ?? 1200,
        height: initialPosition?.height ?? 750,
    })
    const [resizing, setResizing] = useState(false)
    const resizeRef = useRef<{
        startX: number
        startY: number
        startW: number
        startH: number
        originX: number
        originY: number
        dir: string
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
        // Resizing has priority over dragging
        if (resizing && resizeRef.current) {
            const dx = event.clientX - resizeRef.current.startX
            const dy = event.clientY - resizeRef.current.startY

            let newW = resizeRef.current.startW
            let newH = resizeRef.current.startH
            let newX = position.x
            let newY = position.y

            const minW = 200
            const minH = 120

            const dir = resizeRef.current.dir
            if (dir.includes("e")) newW = Math.max(minW, resizeRef.current.startW + dx)
            if (dir.includes("s")) newH = Math.max(minH, resizeRef.current.startH + dy)
            if (dir.includes("w")) {
                newW = Math.max(minW, resizeRef.current.startW - dx)
                newX = resizeRef.current.originX + (resizeRef.current.startW - newW)
            }
            if (dir.includes("n")) {
                newH = Math.max(minH, resizeRef.current.startH - dy)
                newY = resizeRef.current.originY + (resizeRef.current.startH - newH)
            }

            setSize({ width: newW, height: newH })
            setPosition({ x: newX, y: newY })
            return
        }

        if (!dragging || !dragRef.current) return

        const deltaX = event.clientX - dragRef.current.startX
        const deltaY = event.clientY - dragRef.current.startY

        setPosition({
            x: dragRef.current.originX + deltaX,
            y: dragRef.current.originY + deltaY,
        })
    }

    function endDrag(event: React.PointerEvent<HTMLDivElement>) {
        if (dragging) {
            setDragging(false)
            dragRef.current = null
        }
        if (resizing) {
            setResizing(false)
            resizeRef.current = null
        }
        try {
            event.currentTarget.releasePointerCapture(event.pointerId)
        } catch (e) {
            // ignore if pointer was not captured by this target
        }
    }

    function handleResizePointerDown(event: React.PointerEvent<HTMLDivElement>, dir: string) {
        event.stopPropagation()
        if (event.button !== 0) return

        resizeRef.current = {
            startX: event.clientX,
            startY: event.clientY,
            startW: size.width,
            startH: size.height,
            originX: position.x,
            originY: position.y,
            dir,
        }
        setResizing(true)
        event.currentTarget.setPointerCapture(event.pointerId)
    }

    return (
        <div
            className="absolute"
            style={{ left: position.x, top: position.y, zIndex: zIndex + 20, touchAction: "none" }}
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
                <div className="relative p-1" style={{ width: size.width, height: size.height }}>
                    {content}
                </div>
                {/* Resize handles */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-3 -translate-y-1/2 cursor-ns-resize"
                    style={{ width: size.width - 50 }}
                    onPointerDown={(e) => handleResizePointerDown(e, "n")}
                />
                <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 translate-y-1/2 cursor-ns-resize"
                    style={{ width: size.width - 50 }}
                    onPointerDown={(e) => handleResizePointerDown(e, "s")}
                />
                <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-3 -translate-x-1/2 cursor-ew-resize"
                    style={{ height: size.height - 50 }}
                    onPointerDown={(e) => handleResizePointerDown(e, "w")}
                />
                <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-3 translate-x-1/2 cursor-ew-resize"
                    style={{ height: size.height - 50 }}
                    onPointerDown={(e) => handleResizePointerDown(e, "e")}
                />
                <div
                    className="absolute top-0 left-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 cursor-nwse-resize"
                    onPointerDown={(e) => handleResizePointerDown(e, "nw")}
                />
                <div
                    className="absolute top-0 right-0 w-4 h-4 translate-x-1/2 -translate-y-1/2 cursor-nesw-resize"
                    onPointerDown={(e) => handleResizePointerDown(e, "ne")}
                />
                <div
                    className="absolute bottom-0 left-0 w-4 h-4 -translate-x-1/2 translate-y-1/2 cursor-nesw-resize"
                    onPointerDown={(e) => handleResizePointerDown(e, "sw")}
                />
                <div
                    className="absolute bottom-0 right-0 w-4 h-4 translate-x-1/2 translate-y-1/2 cursor-nwse-resize"
                    onPointerDown={(e) => handleResizePointerDown(e, "se")}
                />
            </div>
        </div>
    )
}
