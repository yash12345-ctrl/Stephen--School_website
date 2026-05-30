import { useRef, useEffect, Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import './model_3d.css';

// Suppress THREE.Clock deprecation warning from @react-three/fiber
const originalWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('THREE.Clock')) {
    return;
  }
  originalWarn(...args);
};

// Realistic Human Avatar loaded from a stable Github CDN
function RealisticHumanAvatar() {
  const groupRef = useRef<THREE.Group>(null);
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
      }
      // Enable shadows on the meshes
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    // Set initial pose
    if (rightArmRef.current && rightForeArmRef.current) {
      // Arm is kept straight in default pose
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
    <group ref={groupRef} scale={1.0} position={[0, -1.5, 0]}>
      {/* The actual 3D Human Model */}
      <primitive object={scene} />


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

function CloudMessage() {
  const cloudRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cloudRef.current) {
      // Float the cloud gently, positioned lower and closer to the model
      cloudRef.current.position.y = 0.3 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group ref={cloudRef} position={[0.6, 0.4, 0]} scale={0.65}>
      {/* 3D Cloud made of 3 intersecting spheres */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.8} />
      </mesh>
      <mesh position={[-0.35, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="white" roughness={0.8} />
      </mesh>

      {/* Message on the cloud */}
      <Html center position={[0, 0, 0.45]}>
        <div style={{
          color: '#1a1a1a',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 'bold',
          fontSize: '14px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          textShadow: '0px 0px 10px rgba(255,255,255,1)',
          background: 'transparent'
        }}>
          May I help you?
        </div>
      </Html>
    </group>
  );
}

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("3D Assistant Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Return a fallback UI when the 3D model fails to load
      return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', color: '#D4AF37', background: 'rgba(15, 17, 21, 0.8)', padding: '10px 20px', borderRadius: '10px', fontFamily: 'Inter', fontSize: '14px', zIndex: 9999, whiteSpace: 'nowrap' }}>
          3D Assistant Unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Model3D() {
  return (
    <ErrorBoundary>
      <div className="model-3d-container">
        <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 5, 5]} intensity={1.5} castShadow shadow-bias={-0.0001} />
          <pointLight position={[-2, 2, 2]} intensity={0.8} />

          <Environment preset="city" />

          <Suspense fallback={<Loader />}>
            <RealisticHumanAvatar />
            <CloudMessage />
          </Suspense>

          <ContactShadows position={[0, -1.6, 0]} opacity={0.6} scale={5} blur={2.5} far={4} color="#000000" />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
