"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";



const stats = [
  { id: 1, label: "Doctors", value: "500+", desc: "Experienced Medical Professionals" },
  { id: 2, label: "Reports Processed", value: "20,000+", desc: "Accurate and Fast Diagnoses" },
  { id: 3, label: "Appointments Booked", value: "50,000+", desc: "Seamless Patient Scheduling" },
  { id: 4, label: "Medicines Prescribed", value: "100,000+", desc: "Trusted Pharmacy Services" },
];

const HospitalStats = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (inView) setLoaded(true);
  }, [inView]);

  return (
    <section ref={ref} className="px-6 py-12 bg-[#0D1B2A] text-white">
      <h2 className="text-3xl font-bold text-center mb-8">Hospital Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            className="p-6 bg-gray-900 rounded-xl shadow-lg text-center border border-gray-700 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 50 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-4xl font-bold text-blue-400">{stat.value}</h3>
            <p className="text-lg font-semibold mt-2">{stat.label}</p>
            <p className="text-gray-400 mt-1">{stat.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HospitalStats;
