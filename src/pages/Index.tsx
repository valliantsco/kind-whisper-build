import { useState } from "react";
import Header from "@/components/Header";
import PopUpContato01 from "@/components/PopUpContato01";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(true);

  return (
    <div className="min-h-screen bg-foreground">
      <Header />
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
