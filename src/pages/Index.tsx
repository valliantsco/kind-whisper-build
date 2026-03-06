import { useState } from "react";
import Header from "@/components/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header contactOpen={contactOpen} setContactOpen={setContactOpen} />
      <main />
      <FloatingWhatsApp hidden={contactOpen} />
    </div>
  );
};

export default Index;
