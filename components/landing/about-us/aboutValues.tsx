import React from "react"
import {motion} from "framer-motion"
import {Card, CardContent} from "@/components/ui/card"
import {values} from "./constants"

const containerVariants = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
}

const ValuesCards = () => {
    return (
        <motion.div variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={
                {once: true}
            }
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {
            values.map((value) => {
                const Icon = value.icon
                return (
                    <motion.div key={
                            value.title
                        }
                        variants={itemVariants}
                        whileHover={
                            {y: -5}
                        }
                        className="group">
                        <Card className="h-full bg-slate-900/50 border-cyan-600/30 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500">
                            <CardContent className="p-8 text-center">
                                <div className={
                                    `w-16 h-16 rounded-xl bg-gradient-to-br ${
                                        value.gradient
                                    } flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`
                                }>
                                    <Icon className="w-8 h-8 text-white"/>
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-100 transition-colors duration-300">
                                    {
                                    value.title
                                } </h4>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                                    {
                                    value.description
                                } </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
            })
        } </motion.div>
    )
}

const MemoizedValuesCards = React.memo(ValuesCards);
export default MemoizedValuesCards
