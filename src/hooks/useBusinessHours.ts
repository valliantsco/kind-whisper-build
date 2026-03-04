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

const DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

interface BusinessStatus {
  isOnline: boolean;
  offlineMessage: string;
}

function getStatus(): BusinessStatus {
  const now = new Date();
  const day = now.getDay();
  const h = now.getHours();
  const m = now.getMinutes();
  const hours = BUSINESS_HOURS[day];

  // Check if currently online
  if (hours && h >= hours[0] && h < hours[1]) {
    return { isOnline: true, offlineMessage: "" };
  }

  // Offline — compute next opening
  // If today still has hours ahead (before opening), return today
  if (hours && h < hours[0]) {
    return { isOnline: false, offlineMessage: `Nosso atendimento retorna hoje às ${String(hours[0]).padStart(2, "0")}h` };
  }

  // Otherwise look ahead up to 7 days
  for (let offset = 1; offset <= 7; offset++) {
    const nextDay = (day + offset) % 7;
    const nextHours = BUSINESS_HOURS[nextDay];
    if (nextHours) {
      const openTime = `${String(nextHours[0]).padStart(2, "0")}h`;
      if (offset === 1) {
        return { isOnline: false, offlineMessage: `Nosso atendimento retorna amanhã às ${openTime}` };
      }
      const dayName = DAY_NAMES[nextDay];
      return { isOnline: false, offlineMessage: `Nosso atendimento retorna ${dayName} às ${openTime}` };
    }
  }

  return { isOnline: false, offlineMessage: "Nosso atendimento está fechado no momento" };
}

export const useBusinessHours = (): boolean => {
  const [isOnline, setIsOnline] = useState(() => getStatus().isOnline);

  useEffect(() => {
    const interval = setInterval(() => setIsOnline(getStatus().isOnline), 60000);
    return () => clearInterval(interval);
  }, []);

  return isOnline;
};

export const useBusinessStatus = (): BusinessStatus => {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const interval = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
};
