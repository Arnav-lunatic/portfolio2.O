import { useContext, useEffect, useState, type ForwardRefExoticComponent, type FunctionComponent, type RefAttributes } from "react"
import { IconAtom, IconBrandBootstrap, IconBrandCpp, IconBrandCss3, IconBrandDebian, IconBrandDocker, IconBrandGit, IconBrandGithub, IconBrandHtml5, IconBrandJavascript, IconBrandMongodb, IconBrandMysql, IconBrandPython, IconBrandReact, IconBrandTailwind, IconBrandTypescript, IconBrandVscode, IconCoffee, IconDatabase, IconServer, IconSql, IconTerminal, type IconProps } from "@tabler/icons-react"
import { MagneticButton } from "./ui/magnetic-button"
import { windowContext } from "../App"
import Contact from "./Contact"
import { ArrowUpRight } from "lucide-react"

type Skill = {
    name: string
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
}

type SkillSection = {
    title: string
    skills: Skill[]
}

const skillsData: SkillSection[] = [
    {
        title: "PROGRAMMING LANGUAGES",
        skills: [
            { name: "JavaScript", icon: IconBrandJavascript },
            { name: "TypeScript", icon: IconBrandTypescript },
            { name: "HTML", icon: IconBrandHtml5 },
            { name: "CSS", icon: IconBrandCss3 },
            { name: "Java", icon: IconCoffee },
            { name: "Python", icon: IconBrandPython },
            { name: "C/C++", icon: IconBrandCpp }
        ],
    },
    {
        title: "FRAMEWORKS & LIBRARIES",
        skills: [
            { name: "React", icon: IconBrandReact },
            { name: "Express", icon: IconServer },
            { name: "Electron", icon: IconAtom },
            // { name: "Spring Boot", icon: getIcon("Spring Boot") },
            // { name: "Next.js", icon: getIcon("Next.js") },
            { name: "Tailwind CSS", icon: IconBrandTailwind },
            { name: "Bootstrap", icon: IconBrandBootstrap }
        ],
    },
    {
        title: "DATABASES",
        skills: [
            { name: "MongoDB", icon: IconBrandMongodb },
            { name: "PostgreSQL", icon: IconDatabase },
            { name: "MySQL", icon: IconBrandMysql },
            { name: "SQLite", icon: IconSql },
        ],
    },
    {
        title: "TOOLS",
        skills: [
            { name: "Git", icon: IconBrandGit },
            { name: "GitHub", icon: IconBrandGithub },
            { name: "Linux", icon: IconBrandDebian },
            { name: "Bash", icon: IconTerminal },
            { name: "Docker", icon: IconBrandDocker },
            { name: "VS Code", icon: IconBrandVscode },
        ],
    },
]

interface SkillSectionProps {
    section: SkillSection
    index: number
}

function SkillSection({ section, index }: SkillSectionProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 150)

        return () => clearTimeout(timer)
    }, [index])

    return (
        <div
            className="mb-16"
        >
            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-700 pb-2 mb-6">
                {section.title}
            </h3>
            <div className="text-2xl md:text-4xl font-semibold leading-relaxed text-zinc-100">
                {section.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon
                    return (
                        <div
                            key={skillIndex}
                            className="flex items-center gap-2 transition-all duration-300 ease-out cursor-default hover:text-white hover:translate-x-2"
                        >
                            <IconComponent size={36} />
                            {skill.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default function Skills() {
    const { windows, setWindows } = useContext(windowContext);

    const handleContactButtonClick = () => {
        if (windows.some((window) => window.title === "Contact")) return;
        setWindows((prev) => [
            ...prev,
            { title: "Contact", content: <Contact /> }
        ])
    }

    return (
        <section
            className="h-full overflow-auto px-8 md:px-16 py-12 transition-opacity duration-1000"
            style={{ backgroundColor: "#11111150", color: "#F5F3EF" }}

        >
            {/* Header */}
            <h1 className="font-black text-[5rem] md:text-[8rem] lg:text-[10rem] leading-none tracking-tight">
                Skills
            </h1>

            {/* Two Column Layout */}
            <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
                {/* Left Section - Introduction */}
                <div className="space-y-4">
                    <p
                        className="font-mono text-sm md:text-base text-zinc-300 max-w-sm leading-relaxed transition-all duration-700"
                    >
                        I enjoy building software that is fast, reliable, and easy to use.
                    </p>
                    <p
                        className="font-mono text-sm md:text-base text-zinc-300 max-w-sm leading-relaxed transition-all duration-700"
                    >
                        From frontend interfaces to backend systems, I like working across the stack and learning new technologies.
                    </p>
                    <div className="flex w-full justify-start">
                        <MagneticButton>
                            <button
                                onClick={handleContactButtonClick}
                                className="flex items-center cursor-pointer rounded-lg bg-linear-to-b from-zinc-50/10 to-zinc-300/10 px-4 py-2 font-medium text-white ring-1 ring-white/20 ring-offset-1 ring-offset-zinc-50 transition-transform duration-150 ring-inset active:scale-98"
                            >
                                Contact <ArrowUpRight />
                            </button>
                        </MagneticButton>
                    </div>
                </div>

                {/* Right Section - Skill Categories */}
                <div>
                    {skillsData.map((section, index) => (
                        <SkillSection key={section.title} section={section} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}