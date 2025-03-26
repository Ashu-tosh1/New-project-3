import Hero from "../components/common/Hero";
import AppointmentSection from "../components/common/AppoitmentSection";
import SpecialtiesSlider from "../components/common/SpecialtiesSlider";
import HospitalStats from "../components/common/HospitalStats";
import SuggestionForm from "../components/common/SuggestionForm";
import Footer from "../components/common/Footer";
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
