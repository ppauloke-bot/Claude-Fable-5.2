"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Three.js particle field — "light dust" drifting in the hero.
 * Deliberately minimal: one Points mesh, additive blending, gentle
 * rotation eased toward the pointer. Lazy-loaded via next/dynamic and
 * skipped on touch devices and under reduced motion to protect both
 * battery and Lighthouse scores.
 */
export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const isTouch = useIsTouchDevice();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = mounted && !isTouch && !reducedMotion;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Scatter ~400 points in a wide, shallow volume
    const COUNT = 400;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color("#e8a87c"),
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.02 + mouse.x * 0.05;
      points.rotation.x = mouse.y * 0.04;
      points.position.y = Math.sin(t * 0.3) * 0.15;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
    />
  );
}

export default Particles;
