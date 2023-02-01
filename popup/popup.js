document.addEventListener("click", (e) => {
    if (e.target.classList.contains("button__get-nickname")) {
        onClickGetNickname().then();
    }
});

function getNicknameTextField() {
    let nickNameTextFields = document.getElementsByClassName("text-field__nickname");
    if (nickNameTextFields.length <= 0)
        return;

    return nickNameTextFields[0];
}

function getErrorBox() {
    let errorBoxes = document.getElementsByClassName("error__box");
    if (errorBoxes.length <= 0)
        return;

    return errorBoxes[0];
}

async function onClickGetNickname() {
    let nicknameTextField = getNicknameTextField();

    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const nickname = await browser.tabs.sendMessage(tabs[0].id, {action: "get-nickname"});

    if (nickname === undefined || nickname === "") {
        showErrorAsync("To determine the nickname, you need to queue up manually").then();
        return;
    }

    nicknameTextField.value = nickname;
}

async function showErrorAsync(message) {
    const errorBox = getErrorBox();
    if (errorBox === undefined)
        return;

    errorBox.style.display = "block";
    errorBox.innerHTML = message;

    await sleep(5000);
    errorBox.style.display = "none";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}