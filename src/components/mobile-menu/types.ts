import type React from "react";

export interface MobileMenuItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  hasCta?: boolean;
  /** Use explicit type to differentiate sections */
  sectionType?: "models" | "visit-us";
  dropdownItems?: MobileMenuDropdownItem[];
}

export interface MobileMenuDropdownItem {
  label: string;
  description: string;
  href: string;
  image?: string;
  video?: string;
  badge?: string;
  icon?: React.ElementType;
}

export interface MobileMenuProps {
  items: MobileMenuItem[];
  isOnline: boolean;
  onContactClick?: () => void;
  onQuizOpen: () => void;
}
