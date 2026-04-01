import modelS3k from "@/assets/models/model-s3k.png";
import modelTour3k from "@/assets/models/model-tour-3k.png";
import modelBliss from "@/assets/models/model-bliss-new.png";
import modelNewHoliday from "@/assets/models/model-new-holiday.png";
import modelRhino from "@/assets/models/model-rhino-new.png";
import modelBike400 from "@/assets/models/model-bike-400.png";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.png";
import modelTricycle from "@/assets/models/model-tricycle-new.png";
import modelBigSur from "@/assets/models/model-big-sur-new.png";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.png";

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
}

export const CATEGORIES = [
  "Todos",
  "Scooters Elétricas",
  "Autopropelidos",
  "Bicicletas Elétricas",
  "Triciclos Elétricos",
  "Utilitários",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

export const PRODUCTS: Product[] = [
  {
    name: "S3K",
    slug: "s3k",
    category: "Scooters Elétricas",
    image: modelS3k,
    autonomy: "85 km",
    speed: "80 km/h",
    load: "120 kg",
    motor: "3.000W",
    recharge: "6–8h",
    price: "R$ 19.990",
    highlight: "Performance esportiva",
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
  },
  {
    name: "New Holiday",
    slug: "new-holiday",
    category: "Scooters Elétricas",
    image: modelNewHoliday,
    autonomy: "50 km",
    speed: "50 km/h",
    load: "150 kg",
    motor: "1.000W",
    recharge: "4–6h",
    price: "R$ 15.990",
  },
  {
    name: "Bliss",
    slug: "bliss",
    category: "Autopropelidos",
    image: modelBliss,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "800W",
    recharge: "4–5h",
    price: "R$ 15.990",
    badge: "Mais vendidos",
  },
  {
    name: "Rhino Delivery",
    slug: "rhino-delivery",
    category: "Utilitários",
    image: modelRhino,
    autonomy: "75 km",
    speed: "65 km/h",
    load: "150 kg",
    motor: "2.000W",
    recharge: "5–7h",
    price: "R$ 18.990",
  },
  {
    name: "Liberty Ultra",
    slug: "liberty-ultra",
    category: "Autopropelidos",
    image: modelLibertyUltra,
    autonomy: "70 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "800W",
    recharge: "4–5h",
    price: "R$ 12.990",
    badge: "Mais vendidos",
  },
  {
    name: "Santa Monica",
    slug: "santa-monica",
    category: "Bicicletas Elétricas",
    image: modelSantaMonica,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "350W",
    recharge: "3–4h",
    price: "Consulte",
    badge: "Novidade",
  },
  {
    name: "Bike 400+",
    slug: "bike-400",
    category: "Autopropelidos",
    image: modelBike400,
    autonomy: "50 km",
    speed: "32 km/h",
    load: "100 kg",
    motor: "400W",
    recharge: "3–4h",
    price: "R$ 10.990",
  },
  {
    name: "Big Sur",
    slug: "big-sur",
    category: "Bicicletas Elétricas",
    image: modelBigSur,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "350W",
    recharge: "3–4h",
    price: "Consulte",
    badge: "Novidade",
  },
  {
    name: "Triciclo Elétrico",
    slug: "triciclo-eletrico",
    category: "Triciclos Elétricos",
    image: modelTricycle,
    autonomy: "60 km",
    speed: "32 km/h",
    load: "150 kg",
    motor: "1.000W",
    recharge: "4–6h",
    price: "R$ 15.990",
  },
];
