let style = document.createElement("style");
//chrome.storage.sync.set({ c: ["100, 100, 100", "#ffffff"] });
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
  style.innerHTML =
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
    "  float: left;" +
    "  line-height: 1.75rem;" +
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

function componentToHex(c) {
  let hex = parseInt(c, 10).toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgb(col) {
  col = col.replace(/\s/g, "");
  let sColor = col.split(",");
  return "#" + componentToHex(sColor[0]) + componentToHex(sColor[1]) + componentToHex(sColor[2]);
}

function hexToRgb(hex) {
  let result = hex.substring(1);
  result = [result.substring(0, 2), result.substring(2, 4), result.substring(4, 6)];
  return parseInt(result[0], 16) + ", " + parseInt(result[1], 16) + ", " + parseInt(result[2], 16);
}

window.addEventListener("DOMContentLoaded", (event) => {
  let ref = document.querySelector("script");
  ref.parentNode.insertBefore(style, ref);
  renderDragDivs();

  let btnPicker = document.getElementById("btnColor");
  let txtPicker = document.getElementById("txtColor");
  chrome.storage.sync.get("c", function (data) {
    btnPicker.value = rgb(data.c[0]);
    txtPicker.value = data.c[1];
  });
  document.getElementById("saveColor").addEventListener("click", function () {
    let newbtnColor = hexToRgb(btnPicker.value);
    let newtxtColor = txtPicker.value;
    let newColorArray = [newbtnColor, newtxtColor];
    chrome.storage.sync.set({ c: newColorArray });
    window.location.reload();
  });
  document.getElementById("reset").addEventListener("click", function () {
    chrome.storage.sync.set({ c: ["10, 104, 244", "#ffffff"] });
    window.location.reload();
  });
});

function renderDragDivs() {
  chrome.storage.largeSync.get("b", function (data) {
    if (data.b != null) {
      let canvas = document.getElementById("canvas");
      canvas.innerHTML = "";
      document.getElementById("knappAction").innerText = "Drag i en knapp för att flytta den:";
      let div = document.createElement("DIV");
      div.classList.add("sectionsDiv");
      div.style.display = "flex";
      div.style.columnGap = "3pt";
      div.style.flexWrap = "wrap";
      div.style.rowGap = "3pt";

      let i = 0;
      data.b.forEach((section) => {
        i++;
        let sectionDIV = document.createElement("div");
        sectionDIV.style.display = "flex";
        sectionDIV.style.flexDirection = "column";
        sectionDIV.style.alignItems = "center";
        sectionDIV.style.backgroundColor = "rgb(44, 44, 44)";
        sectionDIV.style.padding = "5pt 8pt 8pt 8pt";
        sectionDIV.style.borderRadius = "10pt";
        sectionDIV.style.float = "left";
        sectionDIV.id = section.header;

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
        newBtnDIV.classList.add("buttonsDiv");

        section.btns.forEach((btn) => {
          let newBtn = document.createElement("div");
          let t = document.createTextNode(btn[0]);
          newBtn.appendChild(t);
          newBtn.id = btn[0];
          newBtn.classList.add("customizerBtnStyle");
          newBtnDIV.appendChild(newBtn);
        });
        sectionDIV.appendChild(newBtnDIV);
        div.appendChild(sectionDIV);
      });
      console.log("Klar Knapp");
      canvas.insertBefore(div, canvas.childNodes[0]);
      $(".buttonsDiv").each(function () {
        $(this).sortable({
          revert: true,
          connectWith: [".buttonsDiv"],
          update: updatePositions,
        });
      });
      $(".sectionsDiv").sortable({
        revert: true,
        update: updatePositions,
      });

      /* for (let x = 1; x <= i; x++) {
        console.log(x);
        $("#buttonsDiv" + x).sortable({
          revert: true,
           update: function () {
            chrome.storage.largeSync.get("b", function (data) {
              let dataList = data.b;
              let sortedList = $("#buttonsDiv").sortable("toArray", { attribute: "id" });
              let newList = [];
              sortedList.forEach((element) => {
                let array = dataList.find((a) => a[0] === element);
                if (array != null) {
                  newList.push(array);
                }
              });
              chrome.storage.largeSync.set({ b: newList });
            });
          }, 
        });
      }
      $("#buttonsDiv" + 1).sortable({
        connectWith: "#buttonsDiv1, #buttonsDiv2",
      });
      $("#buttonsDiv" + 2).sortable({
        connectWith: "#buttonsDiv2, #buttonsDiv1",
      }); */

      /* .sortable({
          revert: true,
          update: function () {
            chrome.storage.largeSync.get("b", function (data) {
              let dataList = data.b;
              let sortedList = $("#buttonsDiv").sortable("toArray", { attribute: "id" });
              let newList = [];
              sortedList.forEach((element) => {
                let array = dataList.find((a) => a[0] === element);
                if (array != null) {
                  newList.push(array);
                }
              });
              chrome.storage.largeSync.set({ b: newList });
            });
          },
        });
        $("#buttonsDiv").disableSelection();
        $("#sectionsDiv").sortable({
          revert: true,
          update: function () {
            chrome.storage.largeSync.get("b", function (data) {
              let dataList = data.b;
              let sortedList = $("#buttonsDiv").sortable("toArray", { attribute: "id" });
              let newList = [];
              sortedList.forEach((element) => {
                let array = dataList.find((a) => a[0] === element);
                if (array != null) {
                  newList.push(array);
                }
              });
              chrome.storage.largeSync.set({ b: newList });
            });
          },
        });
        $("#sectionsDiv").disableSelection(); */
    }
  });
  let dragDelToggle = document.getElementById("dragDelToggle");

  dragDelToggle.removeEventListener("click", preDragFunction);
  dragDelToggle.addEventListener("click", preDelFunction);
}

/* chrome.storage.largeSync.get("b", function (data) {
  let dataList = data.b;
  let sortedList = $("#buttonsDiv").sortable("toArray", { attribute: "id" });
  let newList = [];
  sortedList.forEach((element) => {
    let array = dataList.find((a) => a[0] === element);
    if (array != null) {
      newList.push(array);
    }
  });
  chrome.storage.largeSync.set({ b: newList });
}); */

function updatePositions() {
  chrome.storage.largeSync.get("b", function (data) {
    let btnArray = [];
    let newList = [];
    $(".buttonsDiv").each(function () {
      btnArray.push($(this).sortable("toArray", { attribute: "id" }));
    });
    let sortedLists = $(".sectionsDiv").sortable("toArray", { attribute: "id" });

    sortedLists.forEach((element) => {
      newList.push({ header: element, btns: [] });
    });

    let btns = [];
    data.b.forEach((object) => {
      object.btns.forEach((button) => {
        btns.push(button);
      });
    });

    let getIndex = (title) => {
      btns.forEach((element, index) => {
        if (element[0] == title) {
          console.log("Yupp" + index);
          return index;
        }
      });
    };

    btnArray.forEach((element, index) => {
      element.forEach((title) => {
        console.log(title);
        console.log(getIndex(title));
        console.log(btns[getIndex(title)]);
        newList[index].btns.push(btns[getIndex(title)]);
      });
    });
    console.log(newList);
  });
}

function renderDelBtns() {
  chrome.storage.largeSync.get("b", function (data) {
    if (data.b != null) {
      let canvas = document.getElementById("canvas");
      canvas.innerHTML = "";
      document.getElementById("knappAction").innerText = "Tryck på en knapp om du vill ta bort den:";
      let div = document.createElement("DIV");
      div.style.display = "flex";
      div.style.columnGap = "3pt";
      div.style.flexWrap = "wrap";
      div.style.rowGap = "3pt";
      data.b.forEach((btn) => {
        let newBtn = document.createElement("BUTTON");
        newBtn.onclick = function (event) {
          let els = data.b;
          els.forEach((el) => {
            if (el[0] == event.target.id) {
              els.splice(els.indexOf(el), 1);
              chrome.storage.largeSync.set({ b: els });
            }
          });
          renderDelBtns();
        };
        let t = document.createTextNode(btn[0]);
        newBtn.appendChild(t);
        newBtn.id = btn[0];
        newBtn.classList.add("customizerBtnStyle");
        div.appendChild(newBtn);
      });
      canvas.insertBefore(div, canvas.childNodes[0]);
    }
  });
  let dragDelToggle = document.getElementById("dragDelToggle");

  dragDelToggle.removeEventListener("click", preDelFunction);
  dragDelToggle.addEventListener("click", preDragFunction);
}

function preDelFunction() {
  $("#buttonsDiv").sortable("disable");
  dragDelToggle.innerText = "Radera";
  dragDelToggle.classList.remove("blueButton");
  dragDelToggle.classList.add("redButton");
  let knappBox = document.getElementById("knappBox");
  knappBox.classList.remove("defaultBoxColorNoBlur");
  knappBox.classList.add("redBoxColor");
  renderDelBtns();
}

function preDragFunction() {
  dragDelToggle.innerText = "Flytta";
  dragDelToggle.classList.remove("redButton");
  dragDelToggle.classList.add("blueButton");
  let knappBox = document.getElementById("knappBox");
  knappBox.classList.remove("redBoxColor");
  knappBox.classList.add("defaultBoxColorNoBlur");
  renderDragDivs();
}
