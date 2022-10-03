import { Alignment, Scene } from "@sceneify/core";
import { BrowserSource, ColorSource, ImageSource } from "@sceneify/sources";

import { cameraScene } from "./camera";
import { honkScene } from "./honk";

import { rgba } from "../utils";

// Created inside programScene
export const mainScene = new Scene({
  name: "New Main Scene",
  items: {
    background: {
      source: new ColorSource({
        name: "BG ColourSource",
        settings: {
          color: rgba(24, 164, 245, 255),
        },
      }),
    },
    msPaintBottomBorder: {
      source: new ImageSource({
        name: "MS Paint Bottom Border SF",
        settings: {
          file: "C:/Users/fredm/OneDrive/Pictures/Twitch/AVG Gamer/MSPaint Stream Scene Items/Borders/MS Paint Border Bottom.png",
        },
      }),
      positionX: 0,
      positionY: 1044,
      alignment: Alignment.TopLeft,
    },
    horizontalChatSource: {
      source: new BrowserSource({
        name: "Horizontal Chat Source SF",
        settings: {
          url: "https://streamelements.com/overlay/61769a22357b6c606313f13e/Td-jatLs5Kv6N1Myjx1ywVpspEueptAoRhxwT-H3NfLRfA9P",
          css: `
            body {
              background-color: rgba(0, 0, 0, 0);
              font-color: "white";
              font-family: "Arial" !important;
              font-weight: 500 !important; 
              margin: 0px auto;
              overflow: hidden;
            } 
            `,
          reroute_audio: true,
          width: 1920,
          height: 1080,
        } as any,
      }),
      positionX: 219,
      scaleX: 1477.7 / 1920,
      alignment: Alignment.TopLeft,
      cropRight: 9,
    },
    msPaintBodyFrame: {
      source: new ImageSource({
        name: "MS Paint Body Frame SF",
        settings: {
          file: "C:/Users/fredm/OneDrive/Pictures/Twitch/AVG Gamer/MSPaint Stream Scene Items/Borders/MS Paint Body Frame Border.png",
        },
      }),
      positionX: 0,
      positionY: 1038,
      alignment: Alignment.TopLeft,
      cropTop: 940,
    },
    // Place cameraScene here
    cameraScene: {
      source: cameraScene,
    },
    msPaintTopBorder: {
      source: new ImageSource({
        name: "MS Paint Top Border SF",
        settings: {
          file: "C:/Users/fredm/OneDrive/Pictures/Twitch/AVG Gamer/MSPaint Stream Scene Items/Borders/MS Paint Border Top.png",
        },
      }),
      alignment: Alignment.TopLeft,
    },
    msPaintToolbarHome: {
      source: new ImageSource({
        name: "MS Paint Toolbar Home SF",
        settings: {
          file: "C:/Users/fredm/OneDrive/Pictures/Twitch/AVG Gamer/MSPaint Stream Scene Items/Borders/MS Paint Border Top Home.png",
        },
      }),
      positionY: 23,
      alignment: Alignment.TopLeft,
    },
    honkScene: {
      source: honkScene,
    },
  },
});
