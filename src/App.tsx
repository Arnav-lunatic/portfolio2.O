import GridBackgroundDemo from "#components/grid-background-demo";
import FloatingDockDemo from "./components/floating-dock-demo";
import WindowManager from "./components/windowManager";
import { useState, createContext, type ReactNode } from "react";

export type WindowType = {
  title?: string
  content: ReactNode
  zIndex?: number
  onClose?: () => void
  initialPosition?: {
    x: number
    y: number
  }
}

type WindowContextType = {
  windows: WindowType[]
  setWindows: React.Dispatch<React.SetStateAction<WindowType[]>>
}

export const windowContext = createContext<WindowContextType>({ windows: [], setWindows: () => { } });

function App() {

  const [windows, setWindows] = useState<WindowType[]>([]);

  return (
    <div className="relative h-dvh overflow-hidden text-slate-100 dark:bg-background dark:text-foreground">
      <GridBackgroundDemo />
      <windowContext.Provider value={{ windows, setWindows }}>
        <WindowManager />
        <FloatingDockDemo />
      </windowContext.Provider>
    </div>
  )
}

export default App
