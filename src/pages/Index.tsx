import { useState } from "react";
import PopUpContato01 from "@/components/PopUpContato01";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(true);

  return (
    <div className="min-h-screen bg-foreground">
      <PopUpContato01 isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};

export default Index;
