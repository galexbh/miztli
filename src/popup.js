document.getElementById("applyBtn").addEventListener("click", function () {
  const selectedValue = document.getElementById("valueSelect").value;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          function: setSelectValues,
          args: [selectedValue],
        })
        .then(() => {
          return chrome.scripting.executeScript({
            target: { tabId: tab.id },
          });
        })
        .catch((error) => {
          console.error("Error injecting scripts:", error);
        });
    } else {
      console.error("No active tab found");
    }
  });
});


function setSelectValues(value) {
    const iframe = document.querySelector('iframe');
    const iframeContent = iframe.contentDocument || iframe.contentWindow.document;
    const selects = iframeContent.querySelectorAll('.gradeA select');

    for (const select of selects) {
        for (const option of select.options) {
            if (option.value == value) {
                option.selected = true;
            } else {
                option.selected = false;
            }
        }
        
        const event = new Event('change', {
            'bubbles': true,
            'cancelable': true
        });
        select.dispatchEvent(event);
    }
}