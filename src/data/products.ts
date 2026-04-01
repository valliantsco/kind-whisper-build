import modelBike350 from "@/assets/models/model-bike-350.webp";
import modelBike400 from "@/assets/models/model-bike-400.webp";
import modelBike500 from "@/assets/models/model-bike-500.webp";
import modelBikeMs600 from "@/assets/models/model-bike-ms600.webp";
import modelBliss from "@/assets/models/model-bliss-new.webp";
import modelLibertyUltra from "@/assets/models/model-liberty-ultra.webp";
import modelSantaMonica from "@/assets/models/model-santa-monica-new.webp";
import modelBigSur from "@/assets/models/model-big-sur-new.webp";
import modelMs2500 from "@/assets/models/model-ms2500.webp";
import modelNewHoliday from "@/assets/models/model-new-holiday.webp";
import modelHoliday1000 from "@/assets/models/model-holiday-1000.webp";
import modelTricycle from "@/assets/models/model-tricycle-new.webp";
import modelTour3k from "@/assets/models/model-tour-3k.webp";
import modelS3k from "@/assets/models/model-s3k.webp";
import modelRhino from "@/assets/models/model-rhino-new.webp";
import modelCargo from "@/assets/models/model-cargo.webp";
import modelMotocrossKids from "@/assets/models/model-motocross-kids.webp";
import modelDriftInfantil from "@/assets/models/model-drift-infantil-350.webp";
import modelPatinete350 from "@/assets/models/model-patinete-350.webp";

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

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
  colors?: ProductColor[];
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
    description: "Compacta e acessível, ideal para deslocamentos urbanos curtos com praticidade e economia no dia a dia.",
    colors: [
      { name: "Cinza Claro", hex: "#C0C0C0" },
      { name: "Bege", hex: "#D4C5A9" },
      { name: "Preto", hex: "#111111" },
      { name: "Rosa", hex: "#F472B6" },
    ],
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
    description: "Mais autonomia e potência que a 350, perfeita para quem busca conforto em trajetos médios pela cidade.",
    colors: [
      { name: "Verde Claro", hex: "#86EFAC" },
      { name: "Vermelho", hex: "#DC2626" },
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Azul Claro", hex: "#7DD3FC" },
      { name: "Rosa", hex: "#F472B6" },
    ],
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
    description: "Motor de 500W e maior capacidade de carga — excelente custo-benefício para uso diário intenso.",
    colors: [
      { name: "Vermelho", hex: "#DC2626" },
      { name: "Preto", hex: "#111111" },
      { name: "Laranja", hex: "#F97316" },
      { name: "Verde Claro", hex: "#86EFAC" },
    ],
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
    description: "Top de linha da família Bike com 70 km de autonomia, ideal para quem roda longas distâncias diariamente.",
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Preto", hex: "#111111" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
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
    description: "O mais vendido da MS. Design moderno, motor potente de 800W e alta capacidade para uso versátil.",
    colors: [
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Verde Claro", hex: "#86EFAC" },
    ],
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
    description: "Motor de 1.000W com recarga rápida e carga de 150 kg — robustez e desempenho em um só veículo.",
    colors: [],
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
    description: "E-bike estilosa com visual retrô e performance moderna. Pedala com assistência ou acelera sem esforço.",
    colors: [
      { name: "Azul Acinzentado", hex: "#6B7F99" },
    ],
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
    description: "Pneus largos fat bike com motor elétrico de 500W. Conforto extremo e presença marcante em qualquer terreno.",
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
    ],
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
    description: "Scooter potente de 2.500W para quem precisa de velocidade real no trânsito urbano com zero emissão.",
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Azul", hex: "#1D4ED8" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
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
    description: "Design clássico com tecnologia moderna. Uma scooter completa para substituir a moto no dia a dia.",
    colors: [],
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
    description: "Entrada acessível no mundo das scooters elétricas com conforto, economia e manutenção simples.",
    colors: [],
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
    description: "Visual custom chopper com motor de 3.000W e 75 km/h. Para quem quer estilo e potência elétrica.",
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Azul", hex: "#1D4ED8" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
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
    description: "A mais rápida do portfólio: 80 km/h, 85 km de autonomia e visual esportivo. Performance máxima.",
    colors: [
      { name: "Branco", hex: "#F5F5F5" },
      { name: "Preto", hex: "#111111" },
    ],
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
    description: "Estabilidade total com três rodas. Ideal para quem busca segurança e praticidade com motor elétrico.",
    colors: [
      { name: "Creme", hex: "#FFFDD0" },
      { name: "Verde Claro", hex: "#86EFAC" },
    ],
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
    description: "Feita para entregas profissionais. Motor potente, alta autonomia e velocidade para otimizar suas rotas.",
    colors: [
      { name: "Amarelo", hex: "#FACC15" },
      { name: "Branco", hex: "#F5F5F5" },
    ],
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
    description: "Capacidade bruta de 400 kg para transporte pesado. A solução elétrica para logística e comércio.",
    colors: [
      { name: "Verde Menta", hex: "#98D8C8" },
      { name: "Bege", hex: "#D4C5A9" },
    ],
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
    description: "Diversão off-road para os pequenos com motor de 800W, autonomia de 35 km e muita adrenalina elétrica.",
    colors: [
      { name: "Verde Claro", hex: "#86EFAC" },
      { name: "Vermelho", hex: "#DC2626" },
      { name: "Azul", hex: "#2563EB" },
      { name: "Laranja", hex: "#F97316" },
    ],
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
    description: "Drift kart elétrico para crianças. Seguro, divertido e perfeito para brincar em áreas planas.",
    colors: [
      { name: "Preto", hex: "#111111" },
      { name: "Vermelho", hex: "#DC2626" },
    ],
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
    description: "Leve e dobrável, ideal para a última milha. Leve no metrô, no carro ou guarde em qualquer canto.",
    colors: [
      { name: "Preto", hex: "#111111" },
    ],
  },
];