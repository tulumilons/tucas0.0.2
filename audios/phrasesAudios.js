// import { Audio } from "expo-av";

// export const playSound = async () => {
//   try {
//     const { sound } = await Audio.Sound.createAsync(require("../audios/1.mp3"));
//     await sound.playAsync();

//     // Optional: unload the sound when done
//     sound.setOnPlaybackStatusUpdate((status) => {
//       if (status.didJustFinish) {
//         sound.unloadAsync();
//       }
//     });
//   } catch (error) {
//     console.log("Error playing sound:", error);
//   }
// };

// export let audios = [
//   require("../audios/goodMorning.mp3"),
//   require("../audios/1.mp3"),
// ];

export let audios = {
  0: require("../audios/goodMorning.mp3"),
  1: require("../audios/1.mp3"),
  2: require("../audios/2.mp3"),
  3: require("../audios/3.mp3"),
  4: require("../audios/4.mp3"),
  5: require("../audios/5.mp3"),
  6: require("../audios/6.mp3"),
  7: require("../audios/7.mp3"),
  8: require("../audios/8.mp3"),
  9: require("../audios/9.mp3"),
  10: require("../audios/10.mp3"),
  11: require("../audios/11.mp3"),
  12: require("../audios/12.mp3"),
  13: require("../audios/13.mp3"),
  14: require("../audios/14.mp3"),
  15: require("../audios/15.mp3"),
  16: require("../audios/16.mp3"),
  17: require("../audios/17.mp3"),
  18: require("../audios/18.mp3"),
  19: require("../audios/19.mp3"),
  20: require("../audios/20.mp3"),
  21: require("../audios/21.mp3"),
  22: require("../audios/22.mp3"),
  23: require("../audios/23.mp3"),
  24: require("../audios/24.mp3"),
  25: require("../audios/25.mp3"),
  26: require("../audios/26.mp3"),
  27: require("../audios/27.mp3"),
  28: require("../audios/28.mp3"),
  29: require("../audios/29.mp3"),
  30: require("../audios/30.mp3"),
  31: require("../audios/31.mp3"),
  32: require("../audios/32.mp3"),
};
