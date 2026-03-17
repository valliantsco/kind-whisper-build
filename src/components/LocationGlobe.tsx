import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Uberlândia coordinates
const UBERLANDIA_LAT = -18.9186;
const UBERLANDIA_LNG = -48.2772;
const GLOBE_RADIUS = 2;

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Grid lines on the globe
function GlobeGrid() {
  const gridRef = useRef<THREE.Group>(null);

  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    // Latitude lines
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 2) {
        points.push(latLngToVector3(lat, lng - 180, GLOBE_RADIUS + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(
        <line key={`lat-${lat}`} geometry={geometry}>
          <lineBasicMaterial color="hsl(11, 81%, 57%)" transparent opacity={0.08} />
        </line>
      );
    }
    // Longitude lines
    for (let lng = -180; lng < 180; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) {
        points.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.005));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(
        <line key={`lng-${lng}`} geometry={geometry}>
          <lineBasicMaterial color="hsl(11, 81%, 57%)" transparent opacity={0.08} />
        </line>
      );
    }
    return lines;
  }, []);

  return <group ref={gridRef}>{gridLines}</group>;
}

// Floating particles
function Particles() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="hsl(11, 81%, 57%)"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

// Animated pin at Uberlândia
function LocationPin() {
  const pinPos = useMemo(() => latLngToVector3(UBERLANDIA_LAT, UBERLANDIA_LNG, GLOBE_RADIUS), []);
  const pinRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (pinRef.current) {
      // Slight float
      pinRef.current.position.copy(
        latLngToVector3(UBERLANDIA_LAT, UBERLANDIA_LNG, GLOBE_RADIUS + 0.02 + Math.sin(state.clock.elapsedTime * 2) * 0.015)
      );
    }
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      ringRef.current.scale.set(scale, scale, scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.6 - Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <group>
      {/* Pulsing ring on surface */}
      <mesh ref={ringRef} position={pinPos} lookAt={new THREE.Vector3(0, 0, 0)}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial color="#FF4D22" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Pin dot */}
      <group ref={pinRef} position={pinPos}>
        <mesh>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshBasicMaterial color="#FF4D22" />
        </mesh>
        {/* Glow */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FF4D22" transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}

// Simple stylized continent outlines (simplified)
function ContinentOutlines() {
  const outlineRef = useRef<THREE.Group>(null);

  // Simplified continent shapes as arc segments
  const continents = useMemo(() => {
    // South America simplified outline points
    const southAmerica: [number, number][] = [
      [-12, -35], [-10, -37], [-8, -35], [-5, -35], [-2, -44],
      [2, -50], [5, -55], [5, -60], [3, -65], [0, -68],
      [-5, -70], [-10, -72], [-15, -75], [-20, -70], [-25, -65],
      [-30, -57], [-33, -53], [-35, -52], [-38, -57], [-42, -60],
      [-46, -64], [-50, -68], [-53, -70], [-55, -68], [-54, -65],
      [-50, -62], [-45, -58], [-40, -55], [-35, -49], [-30, -48],
      [-25, -46], [-20, -40], [-15, -39], [-12, -35],
    ];

    // Brazil highlight region
    const brazil: [number, number][] = [
      [-5, -35], [-3, -38], [-2, -44], [0, -49], [2, -52],
      [4, -55], [4, -60], [2, -64], [-2, -67], [-5, -69],
      [-10, -70], [-15, -73], [-18, -70], [-22, -65],
      [-25, -57], [-28, -52], [-30, -49], [-28, -46],
      [-23, -43], [-18, -40], [-13, -39], [-8, -35], [-5, -35],
    ];

    // North America simplified
    const northAmerica: [number, number][] = [
      [10, -85], [15, -88], [20, -90], [25, -95], [28, -97],
      [30, -100], [32, -105], [35, -110], [38, -115], [40, -120],
      [45, -122], [48, -124], [50, -120], [52, -115],
      [55, -110], [58, -100], [60, -95], [58, -88],
      [55, -80], [50, -75], [45, -70], [42, -68], [40, -72],
      [38, -75], [35, -78], [32, -80], [30, -82], [28, -82],
      [25, -80], [20, -87], [15, -88], [10, -85],
    ];

    // Africa simplified
    const africa: [number, number][] = [
      [35, 0], [33, -5], [30, -10], [25, -15], [20, -17],
      [15, -17], [10, -15], [5, -10], [3, -5], [0, 5],
      [-3, 10], [-5, 15], [-8, 18], [-12, 20], [-15, 22],
      [-20, 25], [-25, 28], [-30, 30], [-33, 28], [-35, 22],
      [-33, 18], [-30, 15], [-25, 15], [-20, 12], [-15, 10],
      [-10, 8], [-5, 5], [0, 0], [5, -3], [10, -5],
      [15, -8], [20, -10], [25, -5], [30, 0], [33, 5],
      [35, 5], [35, 0],
    ];

    // Europe simplified
    const europe: [number, number][] = [
      [36, -5], [38, 0], [40, 5], [42, 3], [44, 5],
      [46, 8], [48, 10], [50, 12], [52, 10], [54, 12],
      [56, 14], [58, 16], [60, 18], [62, 20], [64, 22],
      [66, 25], [68, 28], [70, 30], [68, 32], [65, 30],
      [60, 28], [55, 25], [50, 20], [48, 18], [46, 15],
      [44, 12], [42, 10], [40, 8], [38, 5], [36, -5],
    ];

    const createLine = (coords: [number, number][], color: string, opacity: number) => {
      const points = coords.map(([lat, lng]) => latLngToVector3(lat, lng, GLOBE_RADIUS + 0.003));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return { geometry, color, opacity };
    };

    return [
      createLine(southAmerica, "#FF4D22", 0.25),
      createLine(brazil, "#FF4D22", 0.45),
      createLine(northAmerica, "#FF4D22", 0.18),
      createLine(africa, "#FF4D22", 0.18),
      createLine(europe, "#FF4D22", 0.18),
    ];
  }, []);

  useFrame((_, delta) => {
    if (outlineRef.current) {
      outlineRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <group ref={outlineRef}>
      {continents.map((c, i) => (
        <line key={i} geometry={c.geometry}>
          <lineBasicMaterial color={c.color} transparent opacity={c.opacity} linewidth={1} />
        </line>
      ))}
    </group>
  );
}

// Globe with auto-rotation
function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Main sphere */}
      <Sphere args={[GLOBE_RADIUS, 64, 64]}>
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0.1}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[GLOBE_RADIUS + 0.04, 64, 64]}>
        <meshBasicMaterial
          color="#FF4D22"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>

      <GlobeGrid />
      <ContinentOutlines />
      <LocationPin />
    </group>
  );
}

// Camera auto-position
function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(3, 1.5, 3);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

// Main component
const LocationGlobe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="localizacao"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, hsl(11 81% 57% / 0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
            className="relative aspect-square max-w-[500px] mx-auto w-full"
          >
            <Canvas
              camera={{ fov: 45, near: 0.1, far: 100 }}
              dpr={[1, 2]}
              style={{ background: "transparent" }}
            >
              <CameraController />
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FF4D22" />
              <directionalLight position={[-5, -3, -5]} intensity={0.2} color="#ffffff" />
              <Globe />
              <Particles />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>

            {/* Corner decoration */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l rounded-tl-xl pointer-events-none" style={{ borderColor: "hsl(11 81% 57% / 0.15)" }} />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r rounded-br-xl pointer-events-none" style={{ borderColor: "hsl(11 81% 57% / 0.15)" }} />
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: "hsl(11 81% 57%)" }}
              >
                Nossa localização
              </motion.p>
              <h2 className="text-3xl md:text-4xl font-bold text-white/95 leading-tight">
                Venha nos<br />
                <span style={{ color: "hsl(11 81% 57%)" }}>conhecer</span>
              </h2>
              <p className="text-white/40 text-sm mt-4 leading-relaxed max-w-md">
                Visite nossa sede em Uberlândia e conheça de perto toda a linha de veículos elétricos MS Eletric.
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-3">
              {[
                {
                  icon: MapPin,
                  label: "Endereço",
                  value: "Av. João Pinheiro, 3747 – Brasil",
                  sub: "Uberlândia – MG, 38400-714",
                },
                {
                  icon: Phone,
                  label: "Telefone",
                  value: "(34) 3222-8899",
                  sub: null,
                },
                {
                  icon: Clock,
                  label: "Horário",
                  value: "Seg – Sex: 8h às 18h",
                  sub: "Sáb: 8h às 12h",
                },
                {
                  icon: Star,
                  label: "Avaliação",
                  value: "4.3 ★★★★☆ no Google",
                  sub: null,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  className="group flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "hsl(11 81% 57% / 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                  }}
                >
                  <div
                    className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ background: "hsl(11 81% 57% / 0.1)", border: "1px solid hsl(11 81% 57% / 0.18)" }}
                  >
                    <item.icon className="w-4 h-4" style={{ color: "hsl(11 81% 57%)" }} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35 mb-0.5">{item.label}</p>
                    <p className="text-[13px] text-white/80 font-medium">{item.value}</p>
                    {item.sub && <p className="text-[11px] text-white/40 mt-0.5">{item.sub}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href="https://maps.app.goo.gl/7iwuPGQuN4rAhqRf8"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
              style={{
                background: "linear-gradient(135deg, hsl(11 81% 57%), hsl(11 90% 65%))",
                boxShadow: "0 4px 20px hsl(11 81% 57% / 0.35)",
              }}
            >
              <ExternalLink className="w-4 h-4" />
              Abrir no Google Maps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationGlobe;
