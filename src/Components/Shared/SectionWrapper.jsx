import { motion } from "framer-motion";

const SectionWrapper = ({ children, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`w-full max-w-7xl mx-auto px-4 md:px-6 my-20 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
