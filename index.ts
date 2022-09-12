import { Alignment, OBS, Scene } from "@sceneify/core";
import { ColorSource, GDIPlusTextSource } from "@sceneify/sources";
import { animate, Easing, keyframe, setDefaultEasing } from "@sceneify/animation"
import { ColorCorrectionFilter } from "@sceneify/filters"

setDefaultEasing(Easing.InOut)

const mainSceneComp = new Scene({
  name: "Main Scene",
  items: {},
});

const nestedScene = new Scene({
  name: "Some Nested Scene",
  items: {
    someText: {
      source: new GDIPlusTextSource({
        name: "sceneify text source",
        settings: {
          text: "HI FRED!",
          color: rgba(0,0,0),
        }
      }),
      alignment: Alignment.TopCenter,
      positionX: 1920/2,
      positionY: 0
    },
    colorSource: {
      source: new ColorSource({
        name: "sceneify color source",
        settings: {
          color: rgba(255, 0, 0, 100),
          height: 540,
          width: 960,
        },
        filters:{
          colorLimiter: new ColorCorrectionFilter({
              name: "colour changer",
              settings: {
                  hue_shift: 180,
              }
          })
        }
      }),
      alignment: Alignment.Center,
      positionX: 1920 / 2,
      positionY: 1080 / 2
    }
  }
});

function rgba(red: number, green: number, blue: number, alpha = 255) {
  return red + (green << 8) + (blue << 16) + (alpha << 24);
}

async function main() {
  const obs = new OBS();

  await obs.connect("ws://localhost:4455");

  await mainSceneComp.link(obs);

  const colorRectScene = await mainSceneComp.createItem("coloursource1", {
    positionX: 960,
    positionY: 540,
    alignment: Alignment.Center,
    source: nestedScene
  });

  setInterval(() => {
    animate({
        subjects: { 
            colorRect: colorRectScene.source.item("colorSource"), 
            colourChanger: colorRectScene.source.item("colorSource").source.filter("colorLimiter")
        },
        keyframes: {
            colourChanger:{
                hue_shift:{
                    2500: keyframe(180, Easing.Linear),
                    5000: keyframe(-180, Easing.Linear)
                }
            },
            colorRect: {
                positionX: {
                    2500: keyframe(1440, Easing.In),
                    5000: keyframe(480, Easing.Out)
                }
            }
        }
    })
  }, 5000);
}

main();
