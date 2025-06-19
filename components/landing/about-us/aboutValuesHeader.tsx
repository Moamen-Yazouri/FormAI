import {motion} from "framer-motion"
import React from "react"

const valuesHeaderVariants = {
    hidden: {
        opacity: 0,
        y: 30
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
}

const ValuesHeader = () => {
    return (
        <motion.div variants={valuesHeaderVariants}
            initial="hidden"
            whileInView="visible"
            viewport={
                {once: true}
            }
            className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make.
            </p>
        </motion.div>
    )
}

const MemoizedValuesHeader = React.memo(ValuesHeader);
export default MemoizedValuesHeader;
