"use client"
import { motion, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const specialties = [
  { id: "cardiology", title: "Cardiology", desc: "Heart-related care", img: "/Oncology.png" },
  { id: "oncology", title: "Oncology", desc: "Cancer treatments", img: "/Oncology.png" },
  { id: "neurology", title: "Neurology", desc: "Brain & Nervous system", img: "/Oncology.png" },
  { id: "gastro", title: "Gastroenterology", desc: "Digestive system care", img: "/Oncology.png" },
  { id: "ortho", title: "Orthopaedics", desc: "Bone & Joint care", img: "/Oncology.png" },
];

const SpecialtiesSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const scrollToSlide = (index:number) => {
    setActiveIndex(index);
    if (sliderRef.current) {
      (sliderRef.current as HTMLElement).scrollTo({ left: index * window.innerWidth * 0.8, behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    const newIndex = (activeIndex + 1) % specialties.length;
    scrollToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (activeIndex - 1 + specialties.length) % specialties.length;
    scrollToSlide(newIndex);
  };

  return (
    <motion.section 
      ref={sectionRef} 
      className="px-6 py-12 bg-gray-700 text-white"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Filter Section */}
      <div className="flex justify-center gap-4 flex-wrap mb-6">
        {specialties.map((item, index) => (
          <Button
            key={item.id}
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => scrollToSlide(index)}
          >
            {item.title}
          </Button>
        ))}
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="flex overflow-x-hidden w-[90vw] overflow-y-hidden mx-auto">
        {specialties.map((item, index) => (
          <motion.div
            key={item.id}
            className="min-w-[80vw] flex flex-col md:flex-row items-center bg-gray-900 p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: activeIndex === index ? 1 : 0.5, scale: activeIndex === index ? 1 : 0.9 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
          >
            {/* Left Content */}
            <div className="flex-1 text-left p-6">
              <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
              <p className="text-gray-300 mb-4">{item.desc}</p>
              <div className="flex gap-4">
                <Button className="bg-black text-white hover:bg-gray-800">Find Doctor →</Button>
                <Button className="bg-black text-white hover:bg-gray-800">Explore More →</Button>
              </div>
            </div>
            
            {/* Right Content - Image */}
            <motion.div className="flex-1 flex justify-center">
              <Image
                width={400}
                height={250}
                src={item.img}
                alt={item.title}
                className="w-full max-w-md h-60 object-cover rounded-lg"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-center items-center mt-6 gap-8">
        <Button onClick={prevSlide} className="bg-black text-white p-3 rounded-full shadow-lg">
          <FaArrowLeft size={20} />
        </Button>
        <Button onClick={nextSlide} className="bg-black text-white p-3 rounded-full shadow-lg">
          <FaArrowRight size={20} />
        </Button>
      </div>
    </motion.section>
  );
};

export default SpecialtiesSlider;
