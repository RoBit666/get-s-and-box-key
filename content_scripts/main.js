const itIsMeClassName = "it-is-me";

(async () => {

    while (true) {
        await sleep(1000);

        if (needReconnect()) {
            location.reload();
            continue;
        }

        clearItIsMeClass();

        const userImage = getUserImage();
        if (userImage !== undefined) {
            addItIsMeClass(userImage);
            continue;
        }

        enterInQueue();
    }

})().then();

function getUserImage() {
    let imgs = document.getElementsByTagName('img');

    for (let i = 0; i < imgs.length; i++) {
        let img = imgs[i];
        if (img.style.zIndex === "500") {
            return img;
        }
    }
}

function getEnterButton() {
    let buttons = document.getElementsByClassName("button is-large is-primary");

    if (buttons.length <= 0)
        return;

    return buttons[0];
}

function enterInQueue() {
    let enterButton = getEnterButton();

    if (enterButton === null || enterButton.disabled) {
        return false;
    }

    enterButton.click();
    return true;
}

function clearItIsMeClass() {
    let itIsMeElements = document.getElementsByClassName(itIsMeClassName);

    for (let i = 0; i < itIsMeElements.length; i++) {
        let element = itIsMeElements[i];
        element.classList.remove(itIsMeClassName);
    }
}

function addItIsMeClass(element) {
    element.classList.add(itIsMeClassName);
}

function needReconnect() {
    let modalWindows = document.getElementsByClassName("components-reconnect-show");
    let netErrorPages = document.getElementsByClassName("neterror");
    return modalWindows.length > 0 || netErrorPages.length > 0;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// browser.runtime.onMessage.addListener(messageListener);
// function messageListener(request, sender, sendResponse) {
//     if (request.action === "get-nickname") {
//         sendResponse(getPotentialUserNickname());
//     }
// }