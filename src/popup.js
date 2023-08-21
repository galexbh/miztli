document.getElementById('applyBtn').addEventListener('click', function() {
    const selectedValue = document.getElementById('valueSelect').value;

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setSelectValues,
                args: [selectedValue]
            });
        } else {
            console.error("No se encontró ninguna pestaña activa.");
        }
    });
});

function setSelectValues(value) {
    for (const select of document.getElementsByTagName('select')) {
        select.value = value;
        select.onchange?.();
    }
}
