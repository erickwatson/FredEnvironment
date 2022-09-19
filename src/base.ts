import { Scene } from "@sceneify/core";
import { Easing, setDefaultEasing } from "@sceneify/animation";

setDefaultEasing(Easing.InOut);

export const mainScene = new Scene({
  name: "Main Scene",
  items: {},
});