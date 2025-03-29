
import AppointmentSection from "@/components/common/AppoitmentSection";
import Footer from "@/components/common/Footer";
import Hero from "@/components/common/Hero";
import HospitalStats from "@/components/common/HospitalStats";
import SpecialtiesSlider from "@/components/common/SpecialtiesSlider";
import SuggestionForm from "@/components/common/SuggestionForm";

export default function Home() {
  return (
    <div>
     
      <Hero />
      <AppointmentSection />
      <SpecialtiesSlider />
      <HospitalStats />
      <SuggestionForm />
      <Footer />
    </div>

  );
}
