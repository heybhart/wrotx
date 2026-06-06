import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, PerspectiveCamera, Environment, useGLTF, Sparkles } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

interface Scene3DProps {
  scrollProgressRef: React.RefObject<number>;
  theme: 'gold' | 'cyber' | 'glass';
}

// Particle system using Drei's GPU-accelerated Sparkles component for stability and performance
const ParticleField: React.FC<{ count?: number }> = ({ count = 180 }) => {
  return (
    <Sparkles
      count={count}
      scale={6}
      size={1.5}
      speed={0.4}
      color="#f43f5e"
      opacity={0.6}
    />
  );
};

// Concentric decorative architectural rings that spin around the statue
const DecorativeRings: React.FC<{ theme: 'gold' | 'cyber' | 'glass' }> = ({ theme }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.15;
      ring1Ref.current.rotation.y = time * 0.08;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.12;
      ring2Ref.current.rotation.z = time * 0.05;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.05;
      ring3Ref.current.rotation.z = -time * 0.18;
    }
  });

  const ringColor = useMemo(() => {
    if (theme === 'gold') return '#fda4af'; // Rose gold
    if (theme === 'cyber') return '#3b82f6'; // Tech blue
    return '#e4e4e7'; // Neutral white/silver
  }, [theme]);

  const glowColor = useMemo(() => {
    if (theme === 'gold') return '#e11d48';
    if (theme === 'cyber') return '#06b6d4';
    return '#a1a1aa';
  }, [theme]);

  return (
    <group position={[0, -0.4, 0]}>
      {/* Outer Big Orbit Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.015, 8, 64]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.25} />
      </mesh>
      {/* Middle Orbit Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.5, 0.01, 8, 64]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.15} />
      </mesh>
      {/* Inner Small Diagonal Ring */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.0, 0.008, 8, 48]} />
        <meshBasicMaterial color={ringColor} transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// The central luxurious GLTF mannequin model
const HumanoidStatue: React.FC<{
  scrollProgressRef: React.RefObject<number>;
  theme: 'gold' | 'cyber' | 'glass';
}> = ({ scrollProgressRef, theme }) => {
  const modelGroup = useRef<THREE.Group>(null);
  const [loadedScene, setLoadedScene] = useState<THREE.Group | null>(null);
  const [isFallback, setIsFallback] = useState(false);

  // Asynchronously load the GLTF model with automatic CDN fallback if Supabase is offline/blocked
  useEffect(() => {
    const loader = new GLTFLoader();
    const primaryUrl = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/man/model.gltf';
    const fallbackUrl = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/Xbot.glb';

    loader.load(
      primaryUrl,
      (gltf) => {
        setLoadedScene(gltf.scene);
        setIsFallback(false);
      },
      undefined,
      (err) => {
        console.warn("Primary GLTF failed to load (Supabase offline). Trying stable CDN fallback...", err);
        loader.load(
          fallbackUrl,
          (gltf) => {
            setLoadedScene(gltf.scene);
            setIsFallback(true);
          },
          undefined,
          (fallbackErr) => {
            console.error("Fallback GLTF also failed to load:", fallbackErr);
          }
        );
      }
    );
  }, []);

  // Clone the scene and apply the dark reflective material inside useMemo.
  // This ensures materials are assigned before the first render, preventing WebGL/shader mismatches.
  const clonedScene = useMemo(() => {
    if (!loadedScene) return null;
    const clone = loadedScene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(0x0a0a1a),
          metalness: 0.95,
          roughness: 0.05,
          envMapIntensity: 1.5,
        });
      }
    });
    return clone;
  }, [loadedScene]);

  useFrame((state) => {
    if (!modelGroup.current) return;
    
    // Read the scroll progress from ref
    const progress = scrollProgressRef.current ?? 0;
    const time = state.clock.getElapsedTime();

    // ----------------------------------------------------
    // MAP SCROLL PROGRESS TO TARGET POSITION, SCALE, CAMERA
    // ----------------------------------------------------
    let targetScale = 1.0;
    let targetY = -1.1; 
    let targetCamZ = 3.8;

    if (progress <= 0.25) {
      const t = progress / 0.25;
      targetScale = THREE.MathUtils.lerp(1.1, 0.85, t);
      targetY = THREE.MathUtils.lerp(-1.1, -0.4, t);
      targetCamZ = THREE.MathUtils.lerp(3.8, 4.8, t);
    } else if (progress <= 0.5) {
      const t = (progress - 0.25) / 0.25;
      targetScale = THREE.MathUtils.lerp(0.85, 0.65, t);
      targetY = THREE.MathUtils.lerp(-0.4, 0.3, t);
      targetCamZ = THREE.MathUtils.lerp(4.8, 5.8, t);
    } else if (progress <= 0.75) {
      const t = (progress - 0.5) / 0.25;
      targetScale = THREE.MathUtils.lerp(0.65, 0.5, t);
      targetY = THREE.MathUtils.lerp(0.3, 0.8, t);
      targetCamZ = THREE.MathUtils.lerp(5.8, 6.6, t);
    } else {
      const t = (progress - 0.75) / 0.25;
      targetScale = THREE.MathUtils.lerp(0.5, 0.38, t);
      targetY = THREE.MathUtils.lerp(0.8, 1.25, t);
      targetCamZ = THREE.MathUtils.lerp(6.6, 7.5, t);
    }

    // 1. Lerp Scale
    const currentScale = modelGroup.current.scale.x;
    const newScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.08);
    modelGroup.current.scale.set(newScale, newScale, newScale);

    // 2. Lerp Y Position
    modelGroup.current.position.y = THREE.MathUtils.lerp(modelGroup.current.position.y, targetY, 0.08);

    // 3. Lerp X Position (starts centered, moves left as scroll progresses on desktop)
    const isDesktop = state.size.width >= 1024;
    let targetX = 0;
    if (isDesktop && progress > 0.05) {
      const factor = Math.min((progress - 0.05) / 0.2, 1.0);
      targetX = THREE.MathUtils.lerp(0, -1.3, factor);
    }
    modelGroup.current.position.x = THREE.MathUtils.lerp(modelGroup.current.position.x, targetX, 0.08);

    // 4. Lerp Camera Distance (Z)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetCamZ, 0.08);

    // 4. Idle Floating & Hover Rotation
    const floatVal = Math.sin(time * 1.2) * 0.04;
    modelGroup.current.position.y += floatVal * 0.1;

    // Mouse tracking rotation (interactivity)
    const mouseRotY = state.pointer.x * 0.25;
    const mouseRotX = -state.pointer.y * 0.15;

    // Slowly rotate on Y, combined with mouse offset
    const baseRotationY = time * 0.08;
    modelGroup.current.rotation.y = THREE.MathUtils.lerp(modelGroup.current.rotation.y, baseRotationY + mouseRotY, 0.05);
    modelGroup.current.rotation.x = THREE.MathUtils.lerp(modelGroup.current.rotation.x, mouseRotX, 0.05);
  });

  if (!clonedScene) return null;

  const modelScale = isFallback ? 1.0 : 2.5;
  const modelPosition = isFallback ? [0, -1.0, 0] as [number, number, number] : [0, -1.5, 0] as [number, number, number];

  return (
    <group ref={modelGroup} position={[0, -1.1, 0]}>
      {/* Real GLTF Mannequin model rendered as a primitive object using isolated cloned scene */}
      <primitive object={clonedScene} scale={modelScale} position={modelPosition} />
    </group>
  );
};

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgressRef, theme }) => {
  return (
    <div className="w-full h-full relative select-none pointer-events-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={55} />
        
        {/* Soft, low ambient light to preserve high contrast reflections */}
        <ambientLight intensity={0.4} />
        
        {/* Environment Map for high-end studio gloss reflections */}
        <Environment preset="studio" />

        {/* User-requested subtle blue-tinted point light for colorful facial light streak */}
        <pointLight position={[2, 3, 2]} intensity={2} color="#3b82f6" />

        {/* 1. Neon Cyan Accent Light (projects onto right side of face/neck) */}
        <pointLight
          position={[1.5, 1.8, 1.2]}
          intensity={5.0}
          color="#06b6d4"
          distance={8}
        />

        {/* 2. Neon Pink/Magenta Accent Light (projects onto left side of face/neck) */}
        <pointLight
          position={[-1.5, 1.4, 1.2]}
          intensity={6.0}
          color="#db2777"
          distance={8}
        />

        {/* 3. High-intensity White Rim Light from behind to contour the shoulders/ears */}
        <directionalLight
          position={[0, 2, -4]}
          intensity={4.0}
          color="#ffffff"
        />

        {/* 4. White Key Light from the front-left */}
        <directionalLight
          position={[-3, 4, 3]}
          intensity={2.0}
          color="#e0f2fe"
        />

        {/* 3D Model group */}
        <group>
          <Suspense fallback={null}>
            <HumanoidStatue scrollProgressRef={scrollProgressRef} theme={theme} />
          </Suspense>
          <DecorativeRings theme={theme} />
          <ParticleField count={180} />
        </group>
      </Canvas>
    </div>
  );
};
