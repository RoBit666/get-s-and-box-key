document.addEventListener("click", (e) => {
    const element = e.target;

    if (element.classList.contains("checkbox__animation-is-active")) {
        onChangeAnimationCheckbox(element.checked).then();
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function showErrorAsync(message) {
    const errorBoxes = document.getElementsByClassName("error__box");
    if (errorBoxes.length <= 0)
        return;

    const errorBox = errorBoxes[0];

    errorBox.style.display = "block";
    errorBox.innerHTML = message;

    await sleep(5000);
    errorBox.style.display = "none";
}

async function onChangeAnimationCheckbox(checked) {
    const tabs = await browser.tabs.query({});

    for (let i = 0; i < tabs.length; i++) {
        try {
            await browser.tabs.sendMessage(tabs[i].id, {action: "change-animation-state", value: checked});
            return;
        } catch (e) { }
    }
}

// async function onClickGetNickname() {
//     let nicknameTextField = getNicknameTextField();
//
//     const tabs = await browser.tabs.query({active: true, currentWindow: true});
//     const nickname = await browser.tabs.sendMessage(tabs[0].id, {action: "get-nickname"});
//
//     if (nickname === undefined || nickname === "") {
//         showErrorAsync("To determine the nickname, you need to queue up manually").then();
//         return;
//     }
//
//     nicknameTextField.value = nickname;
// }

// function getNicknameTextField() {
//     let nickNameTextFields = document.getElementsByClassName("text-field__nickname");
//     if (nickNameTextFields.length <= 0)
//         return;
//
//     return nickNameTextFields[0];
// }