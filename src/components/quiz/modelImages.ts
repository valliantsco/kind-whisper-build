import modelBike from "@/assets/models/model-bike.jpg";
import modelBliss from "@/assets/models/model-bliss.jpg";
import modelSantaMonica from "@/assets/models/model-santa-monica.jpg";
import modelBigSur from "@/assets/models/model-big-sur.jpg";
import modelTricycle from "@/assets/models/model-tricycle.jpg";
import modelMs2500 from "@/assets/models/model-ms2500.jpg";
import modelSportMoto from "@/assets/models/model-sport-moto.jpg";
import modelRhino from "@/assets/models/model-rhino.jpg";
import modelCargo from "@/assets/models/model-cargo.jpg";
import modelMotocrossKids from "@/assets/models/model-motocross-kids.jpg";

const modelImageMap: Record<string, string> = {
  // Autopropelidos
  "bike 350": modelBike,
  "bike 400": modelBike,
  "bike 400+": modelBike,
  "bike 500": modelBike,
  "bike ms 600": modelBike,
  "ms 600": modelBike,
  "bliss": modelBliss,
  "liberty": modelBliss,
  // Bicicletas elétricas
  "santa monica": modelSantaMonica,
  "big sur": modelBigSur,
  // Scooters
  "ms 2500": modelMs2500,
  "ms2500": modelMs2500,
  "new holiday": modelSportMoto,
  "holiday 1000": modelSportMoto,
  // Triciclos
  "triciclo": modelTricycle,
  "triciclo elétrico": modelTricycle,
  "triciclo eletrico": modelTricycle,
  // Esportivos
  "tour 3k": modelSportMoto,
  "s3k": modelSportMoto,
  "ms 3500": modelSportMoto,
  // Utilitários
  "rhino": modelRhino,
  "rhino delivery": modelRhino,
  "cargo": modelCargo,
  // Infantil
  "moto cross infantil": modelMotocrossKids,
  "motocross infantil": modelMotocrossKids,
  "moto cross": modelMotocrossKids,
  "drift infantil 350": modelMotocrossKids,
  "drift infantil": modelMotocrossKids,
  // Patinetes
  "patinete 350": modelBike,
  "patinete": modelBike,
};

export function getModelImage(modelName: string): string | undefined {
  const normalized = modelName.toLowerCase().trim();
  
  // Direct match
  if (modelImageMap[normalized]) return modelImageMap[normalized];
  
  // Partial match
  for (const [key, img] of Object.entries(modelImageMap)) {
    if (normalized.includes(key) || key.includes(normalized)) return img;
  }
  
  return undefined;
}
