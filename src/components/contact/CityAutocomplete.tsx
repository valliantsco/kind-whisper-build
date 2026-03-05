import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";
import { filterCities, INPUT_BASE_STYLE, getInputBorderStyle } from "@/utils/form-helpers";

interface CityAutocompleteProps {
  city: string;
  setCity: (city: string) => void;
  cityValidated: boolean;
  setCityValidated: (v: boolean) => void;
  error?: string;
  clearError: () => void;
}

const CityAutocomplete = ({
  city,
  setCity,
  cityValidated,
  setCityValidated,
  error,
  clearError,
}: CityAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const selectCity = (value: string) => {
    setCity(value);
    setCityValidated(true);
    setIsDropdownOpen(false);
    setSuggestions([]);
    clearError();
  };

  return (
    <div className="relative">
      <label className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1.5">
        <MapPin className="w-3 h-3" />
        De onde você é? <span className="text-primary/70">*</span>
      </label>
      <input
        ref={inputRef}
        type="text"
        value={city}
        onChange={(e) => {
          const val = e.target.value;
          setCity(val);
          setCityValidated(false);
          clearError();

          if (val.trim().length >= 2) {
            const results = filterCities(val.trim());
            setSuggestions(results);
            setIsDropdownOpen(results.length > 0);
            setFocusedIndex(-1);
          } else {
            setSuggestions([]);
            setIsDropdownOpen(false);
          }
        }}
        onFocus={() => {
          if (city.trim().length >= 2 && suggestions.length > 0) {
            setIsDropdownOpen(true);
          }
        }}
        onBlur={() => {
          setTimeout(() => setIsDropdownOpen(false), 200);
        }}
        onKeyDown={(e) => {
          if (!isDropdownOpen) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
          } else if (e.key === "Enter" && focusedIndex >= 0) {
            e.preventDefault();
            selectCity(suggestions[focusedIndex]);
          } else if (e.key === "Escape") {
            setIsDropdownOpen(false);
          }
        }}
        placeholder="São Paulo, SP"
        maxLength={100}
        className={`${INPUT_BASE_STYLE} cw-input ${error ? "cw-input-error" : ""}`}
        style={getInputBorderStyle(!!error)}
        autoComplete="off"
      />

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {isDropdownOpen && suggestions.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-50 mt-1 rounded-lg overflow-hidden"
            style={{
              background: "hsl(0 0% 14% / 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(0 0% 100% / 0.1)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            }}
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  selectCity(suggestion);
                }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                  focusedIndex === index
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {error && (
        <p className="text-[10px] mt-1" style={{ color: "hsl(0 84% 65%)" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CityAutocomplete;
