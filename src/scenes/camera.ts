import { Scene } from "@sceneify/core";
import { DecklinkInput } from "@sceneify/sources";

export const decklinkCamera = new DecklinkInput({
  name: "Decklink Sceneify",
  settings: {},
});

export const cameraScene = new Scene({
  name: "Camera Sceneify",
  items: {
    decklinkCamera: {
      source: decklinkCamera,
    },
  },
});
