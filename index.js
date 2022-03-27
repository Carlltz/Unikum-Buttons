//chrome.storage.largeSync.clear();

let links = [
  {
    header: "Unikum start",
    btns: [
      ["Unikum start0", "https://start.unikum.net/unikum/start.html?__pid=7183095743"],
      ["Unikum start1", "https://start.unikum.net/unikum/start.html?__pid=7183095743"],
    ],
  },
  {
    header: "Övriga",
    btns: [
      ["Unikum back0", "https://start.unikum.net/unikum/start.html?__pid=7183095743"],
      ["Unikum back1", "https://start.unikum.net/unikum/start.html?__pid=7183095743"],
    ],
  },
];

chrome.storage.largeSync.set({ b: links });

let stylei = document.createElement("style");
chrome.storage.sync.get("c", function (data) {
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
  stylei.innerHTML =
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
    "  padding: 3px;" +
    "  padding-left: 12px;" +
    "  padding-right: 12px;" +
    "  text-align: center;" +
    "  touch-action: manipulation;" +
    "  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, border-radius 200ms ease-in-out;" +
    "  user-select: none;" +
    "  -webkit-user-select: none;" +
    "  vertical-align: middle;" +
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
    "}";
});

let refi = document.querySelector("script");
refi.parentNode.insertBefore(stylei, refi);
//chrome.storage.largeSync.set({ b: buttons });
chrome.storage.largeSync.get("b", function (data) {
  if (data.b != null) {
    let canvas = document.getElementById("canvas");
    buttons = data.b;
    let div = document.createElement("DIV");
    div.style.display = "flex";
    div.style.columnGap = "3pt";
    div.style.margin = "3pt 3pt 0pt 3pt";
    div.style.flexWrap = "wrap";
    div.style.rowGap = "3pt";
    buttons.forEach((section) => {
      let sectionDIV = document.createElement("div");
      sectionDIV.style.display = "flex";
      sectionDIV.style.flexDirection = "column";
      sectionDIV.style.alignItems = "center";
      sectionDIV.style.backgroundColor = "rgb(44, 44, 44)";
      sectionDIV.style.padding = "5pt 8pt 8pt 8pt";
      sectionDIV.style.borderRadius = "10pt";

      let newSection = document.createElement("P");
      newSection.style.margin = "0";
      newSection.style.fontWeight = "bold";
      newSection.style.color = "rgb(255, 255, 255)";
      newSection.innerText = section.header;
      sectionDIV.appendChild(newSection);

      let newBtnDIV = document.createElement("div");
      newBtnDIV.style.display = "flex";
      newBtnDIV.style.gap = "3pt";
      newBtnDIV.style.flexWrap = "wrap";

      section.btns.forEach((btn) => {
        let newBtn = document.createElement("BUTTON");
        newBtn.onclick = function () {
          window.open(btn[1], "_self");
        };
        let t = document.createTextNode(btn[0]);
        newBtn.appendChild(t);
        newBtn.classList.add("customizerBtnStyle");
        newBtnDIV.appendChild(newBtn);
      });
      sectionDIV.appendChild(newBtnDIV);
      div.appendChild(sectionDIV);
    });
    canvas.insertBefore(div, canvas.childNodes[0]);
  }
});
