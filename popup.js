let pageUrl;
getTab();

async function getTab() {
  let queryOptions = { active: true, currentWindow: true };
  tabs = await chrome.tabs.query(queryOptions);
  pageUrl = tabs[0].url;
}

document.addEventListener("DOMContentLoaded", function () {
  let headers = [];
  chrome.storage.largeSync.get("b", function (data) {
    console.log(data.b);
    data.b.forEach((element) => {
      headers.push(element.header);
    });
    let headString = "";
    headers.forEach((element) => {
      headString += `<option value="${element}" />`;
    });
    document.getElementById("group").innerHTML = headString;
  });

  document.getElementById("savePage").addEventListener("click", function () {
    chrome.storage.largeSync.get("b", function (data) {
      let newData = data.b;
      let head = document.getElementById("headerVal").value;
      if (head == "") head = "Övriga";
      if (newData == undefined) {
        newData = [
          {
            header: head,
            btns: [[document.getElementById("pageName").value, pageUrl]],
          },
        ];
      } else {
        let headerFound = false;
        newData.forEach((element, index) => {
          if (element.header == head) {
            headerFound = true;
            newData[index].btns.push([document.getElementById("pageName").value, pageUrl]);
          }
        });
        if (!headerFound) {
          newData.push({ header: head, btns: [[document.getElementById("pageName").value, pageUrl]] });
        }
      }
      chrome.storage.largeSync.set({ b: newData });
    });
    chrome.tabs.reload();
  });

  document.getElementById("openSettings").addEventListener("click", function () {
    chrome.tabs.create({ url: "settings.html" });
  });
});
