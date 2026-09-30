import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090C, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Lighting setup (Dark arena atmosphere: cool cyan & electric blue rim lights)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.8);
    scene.add(ambientLight);

    const mainCyanLight = new THREE.PointLight(0x06b6d4, 4.5, 20);
    mainCyanLight.position.set(3, 3, 4);
    scene.add(mainCyanLight);

    const deepBlueLight = new THREE.PointLight(0x2563eb, 3.8, 20);
    deepBlueLight.position.set(-4, -2, 3);
    scene.add(deepBlueLight);

    const topRimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    topRimLight.position.set(0, 6, 2);
    scene.add(topRimLight);

    // Group for objects
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // --- 1. FOREGROUND: Badminton Racket & Shuttlecock ---
    const racketGroup = new THREE.Group();

    // Racket Head (Oval)
    const headGeom = new THREE.TorusGeometry(1.05, 0.04, 16, 64);
    headGeom.scale(1, 1.28, 1);
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.25,
      metalness: 0.8,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.15,
    });
    const racketHead = new THREE.Mesh(headGeom, frameMat);
    racketGroup.add(racketHead);

    // Racket String Mesh (Lattice Lines)
    const stringGroup = new THREE.Group();
    const stringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    for (let i = -0.7; i <= 0.7; i += 0.14) {
      const lineGeom = new THREE.CylinderGeometry(0.005, 0.005, 2.1, 8);
      const stringLine = new THREE.Mesh(lineGeom, stringMat);
      stringLine.position.x = i;
      stringGroup.add(stringLine);
    }
    for (let j = -0.9; j <= 0.9; j += 0.14) {
      const lineGeom = new THREE.CylinderGeometry(0.005, 0.005, 1.7, 8);
      const stringLine = new THREE.Mesh(lineGeom, stringMat);
      stringLine.position.y = j;
      stringLine.rotation.z = Math.PI / 2;
      stringGroup.add(stringLine);
    }
    racketGroup.add(stringGroup);

    // Shaft & Throat
    const shaftGeom = new THREE.CylinderGeometry(0.035, 0.035, 1.6, 16);
    const shaft = new THREE.Mesh(shaftGeom, frameMat);
    shaft.position.y = -2.0;
    racketGroup.add(shaft);

    // Grip Handle
    const gripGeom = new THREE.CylinderGeometry(0.065, 0.07, 1.1, 16);
    const gripMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.9,
      metalness: 0.1,
    });
    const grip = new THREE.Mesh(gripGeom, gripMat);
    grip.position.y = -3.2;
    racketGroup.add(grip);

    racketGroup.position.set(1.4, 0.2, 0.8);
    racketGroup.rotation.set(-0.3, 0.5, -0.4);
    objectsGroup.add(racketGroup);

    // --- 2. FOREGROUND / MIDGROUND: Floating Shuttlecock ---
    const shuttleGroup = new THREE.Group();
    // Cork Head
    const corkGeom = new THREE.SphereGeometry(0.24, 24, 24);
    const corkMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.3,
      metalness: 0.1,
    });
    const cork = new THREE.Mesh(corkGeom, corkMat);
    shuttleGroup.add(cork);

    // Feather Skirt
    const skirtGeom = new THREE.ConeGeometry(0.48, 0.75, 16, 1, true);
    const skirtMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.82,
      roughness: 0.4,
      side: THREE.DoubleSide,
    });
    const skirt = new THREE.Mesh(skirtGeom, skirtMat);
    skirt.position.y = 0.42;
    skirt.rotation.x = Math.PI;
    shuttleGroup.add(skirt);

    shuttleGroup.position.set(0.1, 1.3, 1.4);
    shuttleGroup.rotation.set(0.8, -0.4, 0.5);
    objectsGroup.add(shuttleGroup);

    // --- 3. MIDGROUND: Football ---
    const footballGeom = new THREE.DodecahedronGeometry(0.72, 1);
    const footballMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.4,
      wireframe: false,
    });
    const football = new THREE.Mesh(footballGeom, footballMat);
    // Wireframe sports cage overlay
    const wireGeom = new THREE.WireframeGeometry(footballGeom);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 1.5, transparent: true, opacity: 0.7 });
    const wireOverlay = new THREE.LineSegments(wireGeom, wireMat);
    football.add(wireOverlay);

    football.position.set(-1.8, -1.2, 0.2);
    objectsGroup.add(football);

    // --- 4. MIDGROUND: Tennis Ball ---
    const tennisGeom = new THREE.SphereGeometry(0.38, 32, 32);
    const tennisMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635, // bright neon felt
      roughness: 0.8,
      metalness: 0.05,
    });
    const tennisBall = new THREE.Mesh(tennisGeom, tennisMat);
    // Seam ring
    const tennisRingGeom = new THREE.TorusGeometry(0.382, 0.015, 12, 32);
    const tennisRingMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const tennisRing = new THREE.Mesh(tennisRingGeom, tennisRingMat);
    tennisRing.rotation.x = Math.PI / 4;
    tennisBall.add(tennisRing);

    tennisBall.position.set(-1.2, 1.8, -0.5);
    objectsGroup.add(tennisBall);

    // --- 5. BACKGROUND: Cricket Ball ---
    const cricketGeom = new THREE.SphereGeometry(0.32, 32, 32);
    const cricketMat = new THREE.MeshStandardMaterial({
      color: 0x991b1b, // Cherry red
      roughness: 0.3,
      metalness: 0.3,
    });
    const cricketBall = new THREE.Mesh(cricketGeom, cricketMat);
    // Stitched seam
    const seamGeom = new THREE.TorusGeometry(0.325, 0.016, 8, 32);
    const seamMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const seam = new THREE.Mesh(seamGeom, seamMat);
    cricketBall.add(seam);

    cricketBall.position.set(2.4, -1.8, -1.2);
    objectsGroup.add(cricketBall);

    // --- 6. BACKGROUND: Basketball Ring Indicator / Subtle Orbit Ring ---
    const ringGeom = new THREE.TorusGeometry(3.6, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing = new THREE.Mesh(ringGeom, ringMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.position.set(0, 0, -2);
    scene.add(orbitRing);

    // --- 7. AMBIENT PARTICLES (Arena dust & light sparkles) ---
    const particleCount = 180;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 6;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Mouse move handler for smooth physical parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Subtle group parallax
      objectsGroup.rotation.y = mouseRef.current.x * 0.3;
      objectsGroup.rotation.x = -mouseRef.current.y * 0.2;

      // 1. Racket organic breathing float
      racketGroup.position.y = 0.2 + Math.sin(elapsedTime * 0.9) * 0.08;
      racketGroup.rotation.z = -0.4 + Math.cos(elapsedTime * 0.8) * 0.05;
      racketGroup.rotation.y = 0.5 + Math.sin(elapsedTime * 0.6) * 0.08;

      // 2. Shuttlecock gentle tumble
      shuttleGroup.position.y = 1.3 + Math.sin(elapsedTime * 1.2 + 1) * 0.09;
      shuttleGroup.rotation.z += 0.005;
      shuttleGroup.rotation.x = 0.8 + Math.sin(elapsedTime * 0.7) * 0.1;

      // 3. Football slow rotation
      football.rotation.y += 0.006;
      football.rotation.x += 0.004;
      football.position.y = -1.2 + Math.sin(elapsedTime * 0.8 + 2) * 0.06;

      // 4. Tennis ball float
      tennisBall.rotation.y -= 0.008;
      tennisBall.position.y = 1.8 + Math.sin(elapsedTime * 1.1 + 0.5) * 0.07;

      // 5. Cricket ball
      cricketBall.rotation.x += 0.007;
      cricketBall.position.y = -1.8 + Math.sin(elapsedTime * 0.9 + 3) * 0.05;

      // 6. Ambient particles drift
      particles.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[480px] lg:h-[620px] pointer-events-none select-none">
      <div ref={mountRef} className="w-full h-full pointer-events-auto" />
      
      {/* Subtle depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#08090C]/20 to-[#08090C] pointer-events-none" />
    </div>
  );
};
