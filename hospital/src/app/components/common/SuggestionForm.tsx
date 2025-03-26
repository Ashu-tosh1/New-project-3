"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const SuggestionForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        email: "",
        message:"",
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formData)
    }
  return (
    <motion.section 
      className="px-6 py-12 bg-[#0D1B2A] text-white flex justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Suggestion & Message Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input 
            type="tel" 
            name="mobile" 
            placeholder="Mobile Number" 
            value={formData.mobile} 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email ID" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <textarea 
            name="message" 
            rows={4}     
            placeholder="Your Message" 
            value={formData.message} 
            onChange ={(e)=>setFormData({...formData,message:e.target.value})} 
            className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-lg font-bold text-lg"
          >
            Submit
          </Button>
        </form>
      </div>
    </motion.section>
  );
};

export default SuggestionForm;
