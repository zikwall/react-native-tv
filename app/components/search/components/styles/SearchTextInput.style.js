export function textStyle(fontSize, fontColor) {
  return {
    left: 24,
    bottom: 2,
    fontSize: fontSize || 1,
    color: fontColor || "#b3b6c3"
  };
}

export default {
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
  }
};
