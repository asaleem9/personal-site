'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Concrete-like material - translucent so text remains visible
function ConcreteMaterial({ color = '#2A2A2A', opacity = 0.4 }: { color?: string; opacity?: number }) {
  return (
    <meshStandardMaterial
      color={color}
      roughness={0.9}
      metalness={0.1}
      flatShading
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  );
}

// Individual concrete block
function ConcreteBlock({
  position,
  rotation,
  scale,
  color = '#2A2A2A',
  floatIntensity = 0.5,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
  color?: string;
  floatIntensity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Float
      speed={1.875}
      rotationIntensity={0.2}
      floatIntensity={floatIntensity}
    >
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <ConcreteMaterial color={color} />
      </mesh>
    </Float>
  );
}

// L-shaped brutalist form
function LShape({
  position,
  rotation,
  scale = 1,
  color = '#3A3A3A',
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <Float speed={1.25} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        {/* Vertical part */}
        <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 1.5, 0.5]} />
          <ConcreteMaterial color={color} />
        </mesh>
        {/* Horizontal part */}
        <mesh position={[0.5, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.5, 0.5]} />
          <ConcreteMaterial color={color} />
        </mesh>
      </group>
    </Float>
  );
}

// Stacked blocks formation
function StackedBlocks({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={0.4}>
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.4, 0.8]} />
          <ConcreteMaterial color="#4A4A4A" />
        </mesh>
        <mesh position={[0.1, 0.5, 0.1]} castShadow receiveShadow>
          <boxGeometry args={[0.9, 0.4, 0.6]} />
          <ConcreteMaterial color="#3A3A3A" />
        </mesh>
        <mesh position={[-0.05, 0.95, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.7, 0.3, 0.5]} />
          <ConcreteMaterial color="#2A2A2A" />
        </mesh>
      </group>
    </Float>
  );
}

// Grid structure
function GridStructure({
  position,
}: {
  position: [number, number, number];
}) {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.1;
    }
  });

  return (
    <group ref={gridRef} position={position}>
      {/* Vertical beams */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={`v-${i}`} position={[x, 0, 0]} castShadow>
          <boxGeometry args={[0.1, 2, 0.1]} />
          <ConcreteMaterial color="#1A1A1A" />
        </mesh>
      ))}
      {/* Horizontal beams */}
      {[-0.5, 0, 0.5].map((y, i) => (
        <mesh key={`h-${i}`} position={[0, y, 0]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.1]} />
          <ConcreteMaterial color="#1A1A1A" />
        </mesh>
      ))}
    </group>
  );
}

// Mouse-follow camera rig
function CameraRig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Subtle camera movement based on mouse position
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.5,
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      pointer.y * 0.3 + 0.5,
      0.05
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Main scene composition
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.4}
        color="#FF3D00"
      />

      {/* Camera animation */}
      <CameraRig />

      {/* Main architectural composition */}

      {/* Central large block - pushed to right side */}
      <ConcreteBlock
        position={[4, 0, -2]}
        scale={[1.5, 2.5, 1.5]}
        color="#2A2A2A"
        floatIntensity={0.2}
      />

      {/* Offset blocks - positioned to edges */}
      <ConcreteBlock
        position={[-6, -0.5, -2]}
        rotation={[0, 0.3, 0]}
        scale={[1, 1.5, 0.8]}
        color="#3A3A3A"
      />

      <ConcreteBlock
        position={[5, 0.3, -1.5]}
        rotation={[0, -0.2, 0]}
        scale={[0.8, 2, 0.6]}
        color="#4A4A4A"
      />

      {/* L-shapes - moved to corners */}
      <LShape position={[-6.5, 1.5, -2]} rotation={[0, 0.5, 0]} scale={0.8} color="#3A3A3A" />
      <LShape
        position={[5.5, -1, 0]}
        rotation={[0, -0.8, 0]}
        scale={0.6}
        color="#4A4A4A"
      />

      {/* Stacked formations - pushed further out */}
      <StackedBlocks position={[-7, 0.5, -3]} rotation={[0, 0.4, 0]} />
      <StackedBlocks position={[6, -0.3, -1]} rotation={[0, -0.6, 0]} />

      {/* Grid structure - accent element - top right, pushed further out */}
      <GridStructure position={[7, 2.5, -4]} />

      {/* Small accent blocks - positioned at edges */}
      <ConcreteBlock
        position={[6.5, 3.5, -2]}
        scale={[0.4, 0.4, 0.4]}
        color="#FF3D00"
        floatIntensity={0.8}
      />
      <ConcreteBlock
        position={[-6.5, -1.5, -2]}
        scale={[0.3, 0.3, 0.3]}
        color="#0066FF"
        floatIntensity={0.8}
      />

      {/* Floor plane for shadows */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.15} />
      </mesh>
    </>
  );
}

// Main exported component
export default function BrutalistScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
