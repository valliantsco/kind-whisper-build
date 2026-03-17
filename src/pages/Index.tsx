import { useState } from "react";
import Header from "@/components/Header";
import PopUpContato01 from "@/components/PopUpContato01";
import LocationGlobe from "@/components/LocationGlobe";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(true);

  return (
    <div className="min-h-screen bg-foreground">
      <Header onContactClick={() => setContactOpen(true)} />
      <LocationGlobe />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
