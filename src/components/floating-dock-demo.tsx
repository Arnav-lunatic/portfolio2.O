import { FloatingDock } from "./ui/floating-dock";
import { LayoutGrid } from 'lucide-react';
import { useContext } from "react";
import { windowContext } from "../App";
import { Info } from 'lucide-react';
import About from "./about";

type LinkType = {
  title: string
  icon: React.ReactNode
  onClick: () => void
}

export default function FloatingDockDemo() {
  const { setWindows } = useContext(windowContext);

  const links: LinkType[] = [
    {
      title: "Home",
      icon: (
        <LayoutGrid className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => { }
    },

    {
      title: "About",
      icon: (
        <Info className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => {
        setWindows((prev) => [
          ...prev,
          {
            title: "About Me",
            content: <About />
          }
        ])
      }
    }
  ];

  return (
    <div className="flex items-center justify-center w-full fixed bottom-2 left-0 right-0">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
