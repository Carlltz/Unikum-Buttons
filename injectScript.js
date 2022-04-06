//chrome.storage.largeSync.clear();

let links = [
  {
    header: "Schema",
    btns: [["Visa schema", "schema"]],
  },
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
  {
    header: "Engelska",
    btns: [["Planering", "https://start.unikum.net/unikum/start.html?__pid=7183095743"]],
  },
];

chrome.storage.largeSync.set({ b: links });

//api24.getCurrentLessons24().then(console.log);

let stylei = document.createElement("style");
chrome.storage.sync.get("c", function (data) {
  stylei.innerHTML = buttonStyle(data);
});
let refi = document.querySelector("script");
//chrome.storage.largeSync.set({ b: buttons });
document.addEventListener("DOMContentLoaded", () => {
  console.log("Hej");
});
chrome.storage.largeSync.get("b", function (data) {
  refi.parentNode.insertBefore(stylei, refi);
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
      sectionDIV.style.padding = "1pt 4.5pt 5pt 4.5pt";
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
          if (btn[1] != "schema") window.open(btn[1], "_self");
          else api24.getCurrentLessons24().then(console.log);
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
