import { OBS } from "@sceneify/core";
import dotenv from "dotenv";

import { mainScene, programScene } from "./base";
import { setupMixItUp } from "./mixitup";

dotenv.config();

async function main() {
  const obs = new OBS();

  await obs.connect("ws://localhost:4455", process.env.OBS_PASSWORD);

  await mainScene.create(obs);

  const canvas = await obs.call("GetVideoSettings");

  await mainScene.item("background").source.setSettings({
    width: canvas.baseWidth,
    height: canvas.baseHeight,
  });

  await programScene.link(obs);

  await programScene.createItem("mainScene", {
    source: mainScene,
  });

  setupMixItUp();
}

main();
