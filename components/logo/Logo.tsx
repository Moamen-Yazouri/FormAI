import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
      className="w-full"
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <img className="w-[100px] h-[100px] rounded-full" src="/logo.png" alt="logo" />
      </div>
    </motion.div>
  )
}
export default Logo;