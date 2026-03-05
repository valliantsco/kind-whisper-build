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
  // E-bikes / autopropelidos
  "bike 350": modelBike,
  "bike 400": modelBike,
  "bike 400+": modelBike,
  "bike 500": modelBike,
  "ms 600": modelBike,
  "bike ms 600": modelBike,
  // Scooter
  "bliss": modelBliss,
  // Bicicletas elétricas
  "santa monica": modelSantaMonica,
  "big sur": modelBigSur,
  // Triciclo
  "triciclo": modelTricycle,
  "triciclo elétrico": modelTricycle,
  "triciclo eletrico": modelTricycle,
  // Motos
  "ms 2500": modelMs2500,
  "ms2500": modelMs2500,
  "tour 3k": modelSportMoto,
  "s3k": modelSportMoto,
  "ms 3500": modelSportMoto,
  // Delivery / Cargo
  "rhino": modelRhino,
  "rhino delivery": modelRhino,
  // Cargo
  "cargo": modelCargo,
  // Kids
  "moto cross infantil": modelMotocrossKids,
  "motocross infantil": modelMotocrossKids,
  "moto cross": modelMotocrossKids,
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
