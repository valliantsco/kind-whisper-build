import modelBike350 from "@/assets/models/model-bike-350.png";
import modelBike400 from "@/assets/models/model-bike-400.png";
import modelBike500 from "@/assets/models/model-bike-500.png";
import modelBikeMs600 from "@/assets/models/model-bike-ms600.png";
import modelBliss from "@/assets/models/model-bliss-new.png";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.png";
import modelBigSur from "@/assets/models/model-big-sur-new.png";
import modelTricycle from "@/assets/models/model-tricycle-new.png";
import modelTour3k from "@/assets/models/model-tour-3k.png";
import modelRhino from "@/assets/models/model-rhino-new.png";
import modelMs2500 from "@/assets/models/model-ms2500.jpg";
import modelSportMoto from "@/assets/models/model-sport-moto.jpg";
import modelHoliday1000 from "@/assets/models/model-holiday-1000.png";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.png";
import modelNewHoliday from "@/assets/models/model-new-holiday.png";
import modelS3k from "@/assets/models/model-s3k.png";
import modelCargo from "@/assets/models/model-cargo.png";
import modelMotocrossKids from "@/assets/models/model-motocross-kids.jpg";
import modelDriftInfantil from "@/assets/models/model-drift-infantil-350.png";
import modelPatinete350 from "@/assets/models/model-patinete-350.png";

const modelImageMap: Record<string, string> = {
  // Autopropelidos
  "bike 350": modelBike350,
  "bike 400": modelBike400,
  "bike 400+": modelBike400,
  "bike 500": modelBike500,
  "bike ms 600": modelBikeMs600,
  "ms 600": modelBikeMs600,
  "bliss": modelBliss,
  "liberty ultra": modelLibertyUltra,
  "liberty": modelLibertyUltra,
  // Bicicletas elétricas
  "santa monica": modelSantaMonica,
  "big sur": modelBigSur,
  // Scooters
  "ms 2500": modelMs2500,
  "ms2500": modelMs2500,
  "new holiday": modelNewHoliday,
  "holiday 1000": modelHoliday1000,
  // Triciclos
  "triciclo": modelTricycle,
  "triciclo elétrico": modelTricycle,
  "triciclo eletrico": modelTricycle,
  // Esportivos
  "tour 3k": modelTour3k,
  "s3k": modelS3k,
  "ms 3500": modelSportMoto,
  // Utilitários
  "rhino": modelRhino,
  "rhino delivery": modelRhino,
  "cargo": modelCargo,
  // Infantil
  "moto cross infantil": modelMotocrossKids,
  "motocross infantil": modelMotocrossKids,
  "moto cross": modelMotocrossKids,
  "drift elétrico 350": modelDriftInfantil,
  "drift eletrico 350": modelDriftInfantil,
  "drift infantil 350": modelDriftInfantil,
  "drift infantil": modelDriftInfantil,
  // Patinetes
  "patinete 350": modelPatinete350,
  "patinete": modelPatinete350,
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
