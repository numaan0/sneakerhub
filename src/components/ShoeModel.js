// components/ShoeModel.js
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useLoader } from '@react-three/drei';
import * as THREE from 'three';

const ShoeModel = () => {
  const modelPath = '/path/to/your/shoe-model.glb'; // Update this path with your model's path
  const gltf = useLoader(THREE.GLTFLoader, modelPath);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      <primitive object={gltf.scene} scale={1} />
    </Canvas>
  );
};

export default ShoeModel;
