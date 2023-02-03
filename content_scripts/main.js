const itIsMeClassName = "it-is-me";

let animationIsActive = true;
let lastAnimatedElement = undefined;

browser.runtime.onMessage.addListener(messageListener);

window.addEventListener("load", () => {
    console.log("Loop start");
    loop().then();
});

// noinspection InfiniteRecursionJS
async function loop() {
    if (reloadIsRequired()) {
        console.warn("Reload");
        location.reload();
    }

    const userImage = getUserImage();
    if (userImage !== undefined) {
        addItIsMeAnimation(userImage);
    } else {
        enterInQueue();
    }

    await sleep(250);
    await loop();
}

function messageListener(request, sender, sendResponse) {
    if (request.action === "change-animation-state") {
        animationIsActive = request.value;
    }
}

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

    if (enterButton === undefined || enterButton.disabled) {
        return false;
    }

    enterButton.click();
    return true;
}

function addItIsMeAnimation(element) {
    if (animationIsActive === false) {
        if (lastAnimatedElement !== undefined) {
            lastAnimatedElement.classList.remove(itIsMeClassName);

            lastAnimatedElement = undefined;
        }

        return;
    }

    if (element.classList.contains(itIsMeClassName))
        return;

    if (lastAnimatedElement !== undefined) {
        lastAnimatedElement.classList.remove(itIsMeClassName);
    }

    element.classList.add(itIsMeClassName);

    lastAnimatedElement = element;
}

function reloadIsRequired() {
    const errorBadGetaway = document.getElementById("cf-error-details");
    const modalWindows = document.getElementsByClassName("components-reconnect-show");
    const netErrorPages = document.getElementsByClassName("neterror");
    return modalWindows.length > 0 || netErrorPages.length > 0 || errorBadGetaway !== null;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}