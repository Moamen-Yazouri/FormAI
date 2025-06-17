import { motion } from 'framer-motion'
import React from 'react'
import MemoizedActionButtons from './actionButtons';
import MemoizedBadge from './badge';
import MemoizedDescription from './description';
import MemoizedTitle from './title';
const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};
const leftMotionElements = () => {
    return (
        <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
        >
                <MemoizedBadge />
                <MemoizedTitle />

                <MemoizedDescription />

                <MemoizedActionButtons />

        </motion.div>
    )
}
const MemoizedLeftMotionElements = React.memo(leftMotionElements)
export default MemoizedLeftMotionElements;