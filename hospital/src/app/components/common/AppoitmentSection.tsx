"use client"
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaUserMd, FaFlask, FaClipboardList, FaPills, FaCalendarCheck } from "react-icons/fa";

const options = [
  { title: "Book an Appointment", icon: <FaCalendarCheck />, color: "bg-yellow-100" },
  { title: "Show Doctor", icon: <FaUserMd />, color: "bg-blue-100" },
  { title: "Lab Reports", icon: <FaFlask />, color: "bg-purple-100" },
  { title: "Health Checkups", icon: <FaClipboardList />, color: "bg-green-100" },
  { title: "Doctor Reports", icon: <FaClipboardList />, color: "bg-red-100" },
  { title: "Pharmacy", icon: <FaPills />, color: "bg-pink-100" },
];

const AppointmentSection = () => {
  return (
    <div className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">We can help you with</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`p-6 rounded-lg ${option.color} shadow-lg flex items-center gap-4`}>
                <div className="text-4xl text-gray-800">{option.icon}</div>
                <CardContent>
                  <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentSection;