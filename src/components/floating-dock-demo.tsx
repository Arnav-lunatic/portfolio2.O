import { FloatingDock } from "./ui/floating-dock";
import { LayoutGrid } from 'lucide-react';
import { useContext } from "react";
import { windowContext, type WindowType } from "../App";
import { Info, ContactRound } from 'lucide-react';
import About from "./about";
import Contact from "./Contact";

type LinkType = {
  title: string
  icon: React.ReactNode
  onClick: () => void
}

export default function FloatingDockDemo() {
  const { windows, setWindows } = useContext(windowContext);

  const handleOnClick = (windowProps: WindowType) => {
    if (windows.some((window) => window.title === windowProps.title)) return;
    setWindows((prev) => [
      ...prev,
      {
        title: windowProps.title,
        content: windowProps.content
      }
    ])
  }


  const links: LinkType[] = [
    {
      title: "Home",
      icon: (
        <LayoutGrid className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "Home", content: <div>Home Content</div> })
    },

    {
      title: "About",
      icon: (
        <Info className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "About", content: <About /> })
    },
    
    {
      title: "Contact",
      icon: (
        <ContactRound className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "Contact", content: <Contact /> })
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
