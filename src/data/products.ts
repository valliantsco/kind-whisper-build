import modelBike350 from "@/assets/models/model-bike-350.png";
import modelBike400 from "@/assets/models/model-bike-400.png";
import modelBike500 from "@/assets/models/model-bike-500.png";
import modelBikeMs600 from "@/assets/models/model-bike-ms600.png";
import modelBliss from "@/assets/models/model-bliss-new.png";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.png";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.png";
import modelBigSur from "@/assets/models/model-big-sur-new.png";
import modelMs2500 from "@/assets/models/model-ms2500.png";
import modelNewHoliday from "@/assets/models/model-new-holiday.png";
import modelHoliday1000 from "@/assets/models/model-holiday-1000.png";
import modelTricycle from "@/assets/models/model-tricycle-new.png";
import modelTour3k from "@/assets/models/model-tour-3k.png";
import modelS3k from "@/assets/models/model-s3k.png";
import modelRhino from "@/assets/models/model-rhino-new.png";
import modelCargo from "@/assets/models/model-cargo.png";
import modelMotocrossKids from "@/assets/models/model-motocross-kids.png";
import modelDriftInfantil from "@/assets/models/model-drift-infantil-350.png";
import modelPatinete350 from "@/assets/models/model-patinete-350.png";

export interface Product {
  name: string;
  slug: string;
  category: string;
  image: string;
  autonomy: string;
  speed: string;
  load: string;
  motor: string;
  recharge: string;
  price: string;
  highlight?: string;
  badge?: string;
  description: string;
}

export const CATEGORIES = [
  "Todos",
  "Autopropelidos",
  "Bicicletas Elétricas",
  "Scooters Elétricas",
  "Triciclos Elétricos",
  "Utilitários",
  "Infantil",
  "Patinetes",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  // ── Autopropelidos ──
  {
    name: "Bike 350",
    slug: "bike-350",
    category: "Autopropelidos",
    image: modelBike350,
    autonomy: "40 km",
    speed: "29 km/h",
    load: "90–100 kg",
    motor: "350W",
    recharge: "7–8h",
    price: "R$ 7.990",
  },
  {
    name: "Bike 400+",
    slug: "bike-400",
    category: "Autopropelidos",
    image: modelBike400,
    autonomy: "50 km",
    speed: "32 km/h",
    load: "90–100 kg",
    motor: "400W",
    recharge: "7–8h",
    price: "R$ 10.990",
  },
  {
    name: "Bike 500",
    slug: "bike-500",
    category: "Autopropelidos",
    image: modelBike500,
    autonomy: "50 km",
    speed: "32 km/h",
    load: "100–120 kg",
    motor: "500W",
    recharge: "7–8h",
    price: "R$ 10.990",
  },
  {
    name: "Bike MS 600",
    slug: "bike-ms-600",
    category: "Autopropelidos",
    image: modelBikeMs600,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "100–120 kg",
    motor: "600W",
    recharge: "7–8h",
    price: "R$ 11.990",
  },
  {
    name: "Bliss",
    slug: "bliss",
    category: "Autopropelidos",
    image: modelBliss,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "120–150 kg",
    motor: "800W",
    recharge: "6–7h",
    price: "R$ 15.990",
    badge: "Mais vendido",
  },
  {
    name: "Liberty Ultra",
    slug: "liberty-ultra",
    category: "Autopropelidos",
    image: modelLibertyUltra,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "1.000W",
    recharge: "5–6h",
    price: "R$ 12.990",
    badge: "Mais vendido",
  },

  // ── Bicicletas Elétricas ──
  {
    name: "Santa Monica",
    slug: "santa-monica",
    category: "Bicicletas Elétricas",
    image: modelSantaMonica,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "120–150 kg",
    motor: "500W",
    recharge: "5h",
    price: "Consulte",
    badge: "Novidade",
  },
  {
    name: "Big Sur",
    slug: "big-sur",
    category: "Bicicletas Elétricas",
    image: modelBigSur,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "120–150 kg",
    motor: "500W",
    recharge: "5h",
    price: "Consulte",
    badge: "Novidade",
  },

  // ── Scooters Elétricas ──
  {
    name: "MS 2500",
    slug: "ms-2500",
    category: "Scooters Elétricas",
    image: modelMs2500,
    autonomy: "50 km",
    speed: "52 km/h",
    load: "150 kg",
    motor: "2.500W",
    recharge: "6–7h",
    price: "R$ 14.990",
  },
  {
    name: "New Holiday",
    slug: "new-holiday",
    category: "Scooters Elétricas",
    image: modelNewHoliday,
    autonomy: "50 km",
    speed: "50 km/h",
    load: "150 kg",
    motor: "2.000W",
    recharge: "6–8h",
    price: "R$ 15.990",
  },
  {
    name: "Holiday 1000",
    slug: "holiday-1000",
    category: "Scooters Elétricas",
    image: modelHoliday1000,
    autonomy: "45 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "1.000W",
    recharge: "8–10h",
    price: "R$ 10.490",
  },
  {
    name: "Tour 3K",
    slug: "tour-3k",
    category: "Scooters Elétricas",
    image: modelTour3k,
    autonomy: "40 km",
    speed: "75 km/h",
    load: "120 kg",
    motor: "3.000W",
    recharge: "6–8h",
    price: "R$ 16.990",
    highlight: "Custom / Chopper",
  },
  {
    name: "S3K",
    slug: "s3k",
    category: "Scooters Elétricas",
    image: modelS3k,
    autonomy: "85 km",
    speed: "80 km/h",
    load: "120 kg",
    motor: "3.500W",
    recharge: "6–8h",
    price: "R$ 19.990",
    highlight: "Performance esportiva",
  },

  // ── Triciclos Elétricos ──
  {
    name: "Triciclo Elétrico",
    slug: "triciclo-eletrico",
    category: "Triciclos Elétricos",
    image: modelTricycle,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "120–150 kg",
    motor: "650W",
    recharge: "6–7h",
    price: "R$ 15.990",
  },

  // ── Utilitários ──
  {
    name: "Rhino Delivery",
    slug: "rhino-delivery",
    category: "Utilitários",
    image: modelRhino,
    autonomy: "75 km",
    speed: "65 km/h",
    load: "150 kg",
    motor: "2.000W",
    recharge: "6–8h",
    price: "R$ 18.990",
  },
  {
    name: "Cargo",
    slug: "cargo",
    category: "Utilitários",
    image: modelCargo,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "400 kg",
    motor: "1.000W",
    recharge: "6–7h",
    price: "R$ 28.990",
  },

  // ── Infantil ──
  {
    name: "Moto Cross Infantil",
    slug: "motocross-infantil",
    category: "Infantil",
    image: modelMotocrossKids,
    autonomy: "35 km",
    speed: "32 km/h",
    load: "55 kg",
    motor: "800W",
    recharge: "6h",
    price: "R$ 5.990",
  },
  {
    name: "Drift Elétrico 350",
    slug: "drift-eletrico-350",
    category: "Infantil",
    image: modelDriftInfantil,
    autonomy: "8 km",
    speed: "12 km/h",
    load: "80 kg",
    motor: "350W",
    recharge: "3–5h",
    price: "R$ 1.999",
  },

  // ── Patinetes ──
  {
    name: "Patinete 350",
    slug: "patinete-350",
    category: "Patinetes",
    image: modelPatinete350,
    autonomy: "30 km",
    speed: "30 km/h",
    load: "120 kg",
    motor: "350W",
    recharge: "5–6h",
    price: "R$ 2.800",
  },
];
