import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame, useThree, createPortal } from '@react-three/fiber';
import { Html, Environment, ContactShadows, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import './model_3d.css';

// Realistic Human Avatar loaded from a stable Github CDN
function RealisticHumanAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const [rightHand, setRightHand] = useState<THREE.Bone | null>(null);
  const { mouse } = useThree();
  
  // Load a highly realistic human avatar GLB (Ready Player Me avatar stored in three.js examples)
  const { scene } = useGLTF('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/readyplayer.me.glb');

  // References to bones for manual animation
  const neckRef = useRef<THREE.Bone | null>(null);
  const spineRef = useRef<THREE.Bone | null>(null);
  const rightArmRef = useRef<THREE.Bone | null>(null);
  const rightForeArmRef = useRef<THREE.Bone | null>(null);

  useEffect(() => {
    // Traverse the loaded scene to find specific bones
    scene.traverse((child) => {
      if ((child as THREE.Bone).isBone) {
        if (child.name === 'Neck') neckRef.current = child as THREE.Bone;
        if (child.name === 'Spine') spineRef.current = child as THREE.Bone;
        if (child.name === 'RightArm') rightArmRef.current = child as THREE.Bone;
        if (child.name === 'RightForeArm') rightForeArmRef.current = child as THREE.Bone;
        if (child.name === 'RightHand') setRightHand(child as THREE.Bone);
      }
      // Enable shadows on the meshes
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    // Set initial pose - Removed extreme rotation to keep arm stable
    if (rightArmRef.current && rightForeArmRef.current) {
       // Gentle bend to hold the board naturally
       rightArmRef.current.rotation.z += 0.2;
       rightArmRef.current.rotation.x += 0.1;
       rightForeArmRef.current.rotation.x -= 0.5;
    }
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // 1. Smoothly rotate the whole body to face forward and float slightly
    if (groupRef.current) {
      groupRef.current.position.y = -1.5 + Math.sin(t * 2) * 0.05;
      
      // Make the body lean slightly based on mouse
      const targetRotationY = (mouse.x * Math.PI) / 8;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // 2. Make the head/neck follow the mouse cursor
    // Reduced to prevent head from snapping and breaking stability
    if (neckRef.current && spineRef.current) {
      // const targetNeckX = -(mouse.y * Math.PI) / 6;
      // const targetNeckY = (mouse.x * Math.PI) / 4;
      
      // neckRef.current.rotation.x = THREE.MathUtils.lerp(neckRef.current.rotation.x, targetNeckX, 0.1);
      // neckRef.current.rotation.y = THREE.MathUtils.lerp(neckRef.current.rotation.y, targetNeckY, 0.1);
    }

    // 3. Smooth Waving Animation for the right arm
    // Removed extreme waving rotation to maintain hand/arm stability
    if (rightForeArmRef.current) {
      // Wave back and forth
      // rightForeArmRef.current.rotation.z = Math.sin(t * 4) * 0.4;
      // rightForeArmRef.current.rotation.x = 0.5;
    }
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -1.5, 0]}>
      {/* The actual 3D Human Model */}
      <primitive object={scene} />

      {/* Board attached to the hand */}
      {rightHand && createPortal(
        <group position={[0.02, 0.08, 0.02]} rotation={[0, -Math.PI / 2, -Math.PI / 2]}>
          <Html transform scale={0.06} position={[0, 0, 0]}>
            <div style={{
              background: 'rgba(20, 20, 25, 0.85)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(212, 175, 55, 0.3)', // Gold border
              borderRadius: '12px',
              padding: '12px 24px',
              color: '#D4AF37',
              fontFamily: 'Inter',
              fontWeight: 'bold',
              fontSize: '24px',
              whiteSpace: 'nowrap',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              pointerEvents: 'none'
            }}>
              May I help you?
            </div>
          </Html>
        </group>,
        rightHand
      )}
    </group>
  );
}

// Preload the GLTF to avoid pop-in
useGLTF.preload('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/gltf/readyplayer.me.glb');

// Fallback loader to show while the 3D model downloads
function Loader() {
  return (
    <Html center>
      <div style={{ color: '#D4AF37', fontWeight: 'bold', fontFamily: 'Inter', background: 'rgba(15, 17, 21, 0.8)', padding: '10px 20px', borderRadius: '10px', whiteSpace: 'nowrap' }}>
        Loading Assistant...
      </div>
    </Html>
  );
}

export default function Model3D() {
  return (
    <div className="model-3d-container">
      <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 5, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
        <pointLight position={[-2, 2, 2]} intensity={0.8} />
        
        <Environment preset="city" />
        
        <Suspense fallback={<Loader />}>
          <RealisticHumanAvatar />
        </Suspense>
        
        <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={5} blur={2.5} far={4} color="#000000" />
      </Canvas>
    </div>
  );
}
