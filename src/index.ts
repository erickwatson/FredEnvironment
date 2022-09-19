import { OBS } from "@sceneify/core";
import dotenv from "dotenv"

import { mainScene } from "./base";
import { startHonk } from "./honk";
import { setupMixItUp } from "./mixitup";

dotenv.config();

async function main() {
  const obs = new OBS();

  await obs.connect("ws://localhost:4455", process.env.OBS_PASSWORD);

  await mainScene.link(obs);

  setupMixItUp();
  await startHonk(mainScene)
}

main();
