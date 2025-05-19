import { LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export interface INavItem {
    title: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    href: string
}