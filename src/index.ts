import { Easing, setDefaultEasing } from "@sceneify/animation";
import { OBS } from "@sceneify/core";
import dotenv from "dotenv";

import { setupMixItUp } from "./mixitup";
import { decklinkCamera } from "./scenes/camera";
import { mainScene } from "./scenes/main";
import { programScene } from "./scenes/program";
import { setSettingsFromPropertyList } from "./utils";

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
  await setSettingsFromPropertyList(
    decklinkCamera,
    "device_hash",
    (i) => i.name === "DeckLink Quad HDMI Recorder (1)"
  );

  await setSettingsFromPropertyList(
    decklinkCamera,
    "mode_id",
    (i) => i.name === "1080p60"
  );
}
