import { Easing, setDefaultEasing } from "@sceneify/animation";
import { OBS } from "@sceneify/core";
import dotenv from "dotenv";

import { setupMixItUp } from "./mixitup";
import { cameraScene, decklinkCamera } from "./scenes/camera";
import { mainScene } from "./scenes/main";
import { programScene } from "./scenes/program";

setDefaultEasing(Easing.InOut);

dotenv.config();

async function main() {
  const obs = new OBS();
  
  // Connect Websocket to OBS
  await obs.connect("ws://localhost:4455", process.env.OBS_PASSWORD);
  
  // Create "Main Scene"
  await mainScene.create(obs);
  
  // Ask for the Canvas Size
  await setBGSize();
  
  // Link to existing scene "Main Scene"
  await programScene.link(obs);
  
  // Create a new 
  await programScene.createItem("mainScene", {
    source: mainScene,
    enabled: false,
  });

  await configureCamera();

  setupMixItUp();
}

main();

async function setBGSize() {
  // Yo OBS, what's the canvas size?
  const canvas = await mainScene.obs.call("GetVideoSettings");
  // Okay set Colour Source "background" to that size
  await mainScene.item("background").source.setSettings({
    width: canvas.baseWidth,
    height: canvas.baseHeight,
  });
}

async function configureCamera() {
  // fetch input list directly from OBS
  const { propertyItems: deviceHashes } = await cameraScene.obs.call(
    "GetInputPropertiesListPropertyItems",
    {
      inputName: decklinkCamera.name,
      propertyName: "device_hash",
    }
  );

  // find input with matching name
  const deviceHash = deviceHashes.find(
    (i) => i.itemName === "DeckLink Quad HDMI Recorder (1)"
  );

  // if input is found, update settings
  if (deviceHash) {
    await decklinkCamera.setSettings({
      device_hash: deviceHash.itemValue,
    });
  }

  const { propertyItems: modeIds } = await cameraScene.obs.call(
    "GetInputPropertiesListPropertyItems",
    {
      inputName: decklinkCamera.name,
      propertyName: "mode_id",
    }
  );

  // find input with matching name
  const modeID = modeIds.find((i) => i.itemName === "1080p60");

  if (modeID) {
    await decklinkCamera.setSettings({
      mode_id: modeID.itemValue as any as number, // types annoying
    });
  }
}
