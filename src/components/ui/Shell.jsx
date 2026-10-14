import { motion } from 'framer-motion';

export function Shell({ children, animate = true }) {
  if (!animate) {
    return <main className="min-h-0">{children}</main>;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.main>
  );
}
