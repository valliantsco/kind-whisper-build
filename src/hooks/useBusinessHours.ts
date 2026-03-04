import { useState, useEffect } from "react";

const BUSINESS_HOURS: Record<number, [number, number] | null> = {
  0: null,        // Domingo - Fechado
  1: [8, 18],     // Segunda
  2: [8, 18],     // Terça
  3: [8, 18],     // Quarta
  4: [8, 18],     // Quinta
  5: [8, 18],     // Sexta
  6: [8, 12],     // Sábado
};

const checkOnline = (): boolean => {
  const now = new Date();
  const hours = BUSINESS_HOURS[now.getDay()];
  if (!hours) return false;
  const h = now.getHours();
  return h >= hours[0] && h < hours[1];
};

export const useBusinessHours = () => {
  const [isOnline, setIsOnline] = useState(checkOnline);

  useEffect(() => {
    const interval = setInterval(() => setIsOnline(checkOnline()), 60000);
    return () => clearInterval(interval);
  }, []);

  return isOnline;
};
