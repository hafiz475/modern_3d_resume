// src/utils/loaders.js
import { useGLTF } from "@react-three/drei";

// simple wrapper so you can swap later if needed
export function useGLTFModel(path) {
  // useGLTF has built-in caching and is battle-tested
  return useGLTF(path);
}
