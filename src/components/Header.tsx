import ContactWidget from "@/components/PopUpContato01";

interface HeaderProps {
  contactOpen: boolean;
  setContactOpen: (open: boolean) => void;
}

const Header = ({ contactOpen, setContactOpen }: HeaderProps) => {
  return (
    <ContactWidget isOpen={contactOpen} onClose={() => setContactOpen(false)} />
  );
};

export default Header;
