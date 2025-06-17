import { Github, Linkedin, Mail } from "lucide-react";

export const logoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    export const socialVariants = (delay: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
    },
    });

    export const cardContainerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
    };

    export const cardTitleVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, delay: 0.2 },
    },
    };

    export const cardTextVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, delay: 0.4 },
    },
};

export const socialLinks = [
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/moamen-al-yazouri-80742433a/",
        color: "hover:text-blue-400",
        delay: 0.1
    }, {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/Moamen-Yazouri",
        color: "hover:text-slate-300",
        delay: 0.2
    }, {
        name: "Email",
        icon: Mail,
        href: "mailto:moaamen@gmail.com",
        color: "hover:text-cyan-400",
        delay: 0.3
    },
];