import { FloatingDock } from "./ui/floating-dock";
import { Keyboard, LayoutGrid, MessageSquareMore } from 'lucide-react';
import { useContext } from "react";
import { windowContext, type WindowType } from "../App";
import {  ContactRound } from 'lucide-react';
import Contact from "./Contact";
import Skills from "./skills";
import Socials from "./socials";

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
      title: "Skills",
      icon: (
        <Keyboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "Skills", content: <Skills /> })
    },
    {
      title: "Contact",
      icon: (
        <ContactRound className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "Contact", content: <Contact /> })
    },
    {
      title: "Socials",
      icon: (
        <MessageSquareMore className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      onClick: () => handleOnClick({ title: "Socials", content: <Socials /> })
    },
  ];

  return (
    <div className="flex items-center justify-center w-full fixed bottom-2 left-0 right-0">
      <FloatingDock
        items={links}
      />
    </div>
  );
}
