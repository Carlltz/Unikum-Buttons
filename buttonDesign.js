function buttonStyle(data) {
  let btnColor;
  let txtColor;
  if (data.c == null) {
    chrome.storage.sync.set({ c: ["10, 104, 244", "#ffffff"] });
    btnColor = "10, 104, 244";
    txtColor = "#ffffff";
  } else {
    btnColor = data.c[0];
    txtColor = data.c[1];
  }
  return (
    ".customizerBtnStyle {" +
    "  align-items: center;" +
    "  background-color: rgb(" +
    btnColor +
    ");" +
    "  border-radius: 10px;" +
    "  border-width: 0px;" +
    "  box-sizing: border-box;" +
    "  color: " +
    txtColor +
    ";" +
    "  cursor: pointer;" +
    "  display: inline-flex;" +
    '  font-family: -apple-system, system-ui, system-ui, "Segoe UI", Roboto, "Helvetica Neue", "Fira Sans", Ubuntu, Oxygen, "Oxygen Sans", Cantarell, "Droid Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Lucida Grande", Helvetica, Arial, sans-serif;' +
    "  font-size: 18px;" +
    "  font-weight: 600;" +
    "  justify-content: center;" +
    "  overflow: hidden;" +
    "  padding: 4pt 5pt;" +
    "  text-align: center;" +
    "  touch-action: manipulation;" +
    "  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, border-radius 200ms ease-in-out;" +
    "  user-select: none;" +
    "  -webkit-user-select: none;" +
    "  vertical-align: middle;" +
    "  float: left;" +
    "  line-height: 14pt;" +
    "}" +
    ".customizerBtnStyle:hover" +
    "{ " +
    "  background-color: rgba(" +
    btnColor +
    ", 0.8);" +
    "  border-radius: 5px;" +
    "}" +
    ".customizerBtnStyle:active {" +
    "opacity: 0.6;" +
    "}"
  );
}
