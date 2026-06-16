import { useMemo, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import emailjs from "@emailjs/browser"

interface ContactFormValues {
    firstName: string
    lastName: string
    email: string
    message: string
}

interface EmailJSTemplateParams extends Record<string, unknown> {
    name: string
    email: string
    message: string
    time: string
}

interface EmailJSConfig {
    serviceId: string | undefined
    templateId: string | undefined
    publicKey: string | undefined
}

type FormStatus = "idle" | "sending" | "success" | "error"

const initialFormValues: ContactFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
}

const inputClassName =
    "w-full bg-transparent border-0 border-b border-zinc-500 rounded-none px-0 pb-2 focus:outline-none focus:border-zinc-100 focus:ring-0 transition-all text-[#F5F3EF] font-mono text-sm"

const labelClassName = "font-mono text-xs text-zinc-200 mb-2 block"

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Contact() {
    const [formValues, setFormValues] = useState<ContactFormValues>(initialFormValues)
    const [status, setStatus] = useState<FormStatus>("idle")
    const [notification, setNotification] = useState<string | null>(null)

    const emailjsConfig: EmailJSConfig = useMemo(
        () => ({
            serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        }),
        [],
    )

    function handleChange(
        event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    ) {
        const { name, value } = event.target
        setFormValues((current) => ({ ...current, [name]: value }))
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setNotification(null)

        const firstName = formValues.firstName.trim()
        const lastName = formValues.lastName.trim()
        const email = formValues.email.trim()
        const message = formValues.message.trim()

        if (!firstName || !lastName || !email || !message) {
            setStatus("error")
            setNotification("Failed to send message.")
            return
        }

        if (!isValidEmail(email)) {
            setStatus("error")
            setNotification("Failed to send message.")
            return
        }

        const { serviceId, templateId, publicKey } = emailjsConfig
        if (!serviceId || !templateId || !publicKey) {
            setStatus("error")
            setNotification("Failed to send message.")
            return
        }

        const templateParams: EmailJSTemplateParams = {
            name: `${firstName} ${lastName}`,
            email,
            message,
            time: new Date().toLocaleString(),
        }

        setStatus("sending")

        try {
            await emailjs.send(serviceId, templateId, templateParams, publicKey)

            setStatus("success")
            setNotification("Message sent successfully.")
            setFormValues(initialFormValues)
        } catch (error) {
            console.error("EmailJS error", error)
            setStatus("error")
            setNotification("Failed to send message.")
        }
    }

    return (
        <section
            className="px-8 py-10 md:px-16 overflow-auto h-full"
            style={{ backgroundColor: "#111111", color: "#F5F3EF" }}
        >
            <h1 className="font-black text-[3rem] leading-none tracking-tight md:text-[8rem] lg:text-[7rem]">
                Contact me
            </h1>

            <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:gap-24">
                <div className="space-y-10 font-mono text-xs text-zinc-300 md:text-sm">
                    <p>email@example.com</p>
                    <p>(555) 555-5555</p>
                    <p>
                        123 Demo Street
                        <br />
                        New York, NY 12345
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-[450px] space-y-8">
                    <fieldset className="space-y-2">
                        <legend className={labelClassName}>Name (required)</legend>
                        <div className="grid grid-cols-2 gap-6">
                            <label className="block">
                                <span className={labelClassName}>First Name</span>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    required
                                    className={inputClassName}
                                />
                            </label>
                            <label className="block">
                                <span className={labelClassName}>Last Name</span>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    required
                                    className={inputClassName}
                                />
                            </label>
                        </div>
                    </fieldset>

                    <label className="block">
                        <span className={labelClassName}>Email(required)</span>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                            className={inputClassName}
                        />
                    </label>

                    <label className="block">
                        <span className={labelClassName}>Message(required)</span>
                        <textarea
                            name="message"
                            value={formValues.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className={`${inputClassName} resize-none`}
                        />
                    </label>

                    <div className="space-y-4 pt-2">
                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="bg-zinc-100 px-6 py-2 font-mono text-sm uppercase tracking-widest text-black transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 rounded-sm"
                        >
                            {status === "sending" ? "SENDING..." : "SUBMIT"}
                        </button>

                        {notification ? (
                            <p
                                role="status"
                                className={`font-mono text-xs ${
                                    status === "success" ? "text-zinc-300" : "text-zinc-400"
                                }`}
                            >
                                {notification}
                            </p>
                        ) : null}
                    </div>
                </form>
            </div>
        </section>
    )
}
