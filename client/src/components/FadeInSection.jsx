import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function FadeInSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
