
//Input Form Close button Action 
var BtnCloseInputHolder = document.querySelector(".modal .crossBtn");
var ModalContainer = document.querySelector(".modal");
var Modal_Form = document.querySelector(".form-holder");
var Div_container = document.querySelector(".main-container");
var DivModal = document.querySelector(".modal");
var NewDataBtn = document.querySelector("#AddNewBtn");
var LogInBtn = document.querySelector("#LogINnBtn");

LogInBtn.addEventListener("click", () => {
    Trigger_inputModal("loginPanel");
});

ModalContainer.addEventListener("click", () => {
    Trigger_inputModal("credentialsPanel");
    resetModal();
});
Modal_Form.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
});

NewDataBtn.addEventListener("click", () => {
    Trigger_inputModal("credentialsPanel");
    resetModal();
});

BtnCloseInputHolder.addEventListener("click", () => {
    Trigger_inputModal("credentialsPanel");
    resetModal();
});

function Trigger_inputModal(FormName) {
    if (Div_container.style.filter == "" || Div_container.style.filter == "none") {
        Div_container.style.filter = "blur(1.5px)";
        DivModal.style.display = "flex";
    }
    else {
        Div_container.style.filter = "none";
        DivModal.style.display = "none";
    }

    if (FormName == "loginPanel") {
        document.querySelector("#loginPanel").classList.remove("hidden");
        document.querySelector("#credentialsPanel").classList.add("hidden");
    }
    else if (FormName == "credentialsPanel") {
        document.querySelector("#credentialsPanel").classList.remove("hidden");
        document.querySelector("#loginPanel").classList.add("hidden");
    }
}

function resetModal() {
    document.getElementById("Website").value = "";
    document.getElementById("WebsiteType").value = "Socials";
    document.getElementById("UserName").value = "";
    document.getElementById("Password").value = "";
    document.getElementById("LinkedEmail").value = "";
    document.getElementById("Notes").value = "";

    document.querySelector(".modal .form-holder h2").innerText = "Add new Credentials";
    document.getElementById("saveDataBtn").innerText = "Save";
    document.getElementById("DeleteDataBtn").classList.add("hidden");
}