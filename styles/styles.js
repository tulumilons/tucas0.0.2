import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  ////////////////////////////////////////////
  //Home
  btn: {
    fontSize: 24,
    padding: 10,
    width: 108,
    textAlign: "center",
    color: "white",
  },
  container: {
    // marginTop: "10%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  text_white: {
    color: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
  },
  btnReset: {
    fontSize: 18,
    marginBottom: 20,
  },
  btnPlaySound: {
    marginTop: 10,
    fontSize: 18,
    paddingBottom: 10,
  },
  //btn container
  btn_container: {
    width: 300,
    marginTop: "10",
    display: "flex",
    flexDirection: "row",
    gap: "10",
  },
  counter: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
  },

  //Modal style
  maxScrollHeight: {},
  overlay: {
    position: "absolute",
    width: width * 100,
    height: height * 100,
    zIndex: 999,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertBox: {
    maxHeight: 500,
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  alertText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#34C759",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  //difficulty level buttons
  btnDifficultyContainer: {
    marginTop: "10",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  btnEasy: {
    backgroundColor: "#34C759",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  btnMedium: {
    backgroundColor: "#4A90E2",
  },
  btnMediumHard: {
    backgroundColor: "#4A90E2",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  btnHard: {
    backgroundColor: "#FF3B30",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
  ////////////////////////////////////////////

  ////////////////////////////////////////////
  //EasyPhrases
  ////////////////////////////
  sortContainer: {
    // marginTop: -30,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: "20%",
  },
  sortTxt: {
    flexWrap: "wrap",
  },
  //list
  easyContentScroll: {
    marginTop: -40,
    height: height * 0.7,
  },
  easyListContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    fontSize: 20,
  },
  mediumListContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 350,
    fontSize: 20,
  },

  easyListText: {
    flex: 1,
  },
  easyBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#34C759",
    height: 60,
    width: 60,
  },
  mediumBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    height: 60,
    width: 60,
  },
  hardBtn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    height: 60,
    width: 60,
  },
  plusIcon: {
    color: "white",
    fontSize: 20,
  },
  phraseText: {
    fontSize: 18,
    marginVertical: 4,
    padding: 20,
    width: "100%",
    flexShrink: 1,
  },
  ////////////////////////////

  scrollVertical: {
    width: 280,
  },
  easyContainer: {
    // flex: 1,
    marginTop: "5%",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  easyListContainerModal: {
    fontSize: 18,
    flexShrink: 1,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  // Modal
  easyAlertBox: {
    maxHeight: 500,
    width: width * 0.8,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexWrap: "wrap",
  },
  easyAlertText: {
    width: "100%",
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
    flexWrap: "wrap",
  },
  easyCancelButton: {
    // top: 430,
    // left: -138,
    width: 280,
    height: 80,
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  btnAudio: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  txtPlayAudio: {
    fontSize: 18,
    padding: 20,
    textAlign: "center",
  },
  //Load more
  loadMoreBtn: {
    padding: 20,
  },
  loadMoreTxt: {
    fontWeight: "bold",
    color: "#808080",
  },

  //Difficulty sections

  btnEasyDifficultyContainer: {
    // position: "absolute",
    // top: height * 0.9,
    // left: width * 0.225,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btnEasyMedium: {
    backgroundColor: "#4A90E2",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },

  /////////////////////////////////////////////////////////////////////////////////////////////
  //Settings
  settingsFlagsContainer: {
    flexDirection: "row",
    gap: 32,
    alignItems: "center",
  },
  settingsFlags: {
    fontSize: 48,
  },
  settingsTextFlags: {
    fontSize: 18,
    fontWeight: 700,
  },
  settingsText: {
    fontSize: 18,
    marginBottom: 5,
  },
  settingsTextBig: {
    marginTop: -5,
    fontSize: 18,
    fontWeight: "600",
  },
  /////////////////////////////////////////////////////////////////////////////////////////////
});
