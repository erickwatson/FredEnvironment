import { SceneItemTransform, Alignment, MonitoringType } from "@sceneify/core";
import { MediaSource } from "@sceneify/sources";

import { mixItUpApi } from "./mixitup";
import { honkScene } from "./scenes/honk";

let counter = 0;

const transforms: Partial<SceneItemTransform>[] = [
  {},
  {
    scaleX: -1,
  },
  {
    scaleY: -1,
  },
  {
    scaleX: -1,
    scaleY: -1,
  },
];

mixItUpApi.get("/honk", async () => {
  const name = `honk${counter++}`;

  const random = Math.min(Math.floor(Math.random() * 4), 3);

  const transform = {
    positionX: 1920 / 2,
    positionY: 1080 / 2,
    alignment: Alignment.Center,
    ...transforms[random],
  };

  const source = new MediaSource({
    name,
    settings: {
      local_file:
        "C:/Users/fredm/OneDrive/Pictures/Twitch/GIFS and Webms/Events/Honks/honk_appear_top_right.webm",
      is_local_file: true,
      looping: false,
      speed_percent: 95 + Math.random() * 10,
    },
    audioMonitorType: MonitoringType.MonitorAndOutput,
    volume: {
      db: -4.5,
    },
  });

  const itemHonkRandom = await honkScene.createItem(name, {
    source,
    ...transform,
  });

  await new Promise<void>((resolve) =>
    source.once("PlaybackEnded", () => resolve())
  );

  await itemHonkRandom.remove();
});
