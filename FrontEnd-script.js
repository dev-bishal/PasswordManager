
//Input Form Close button Action 
var BtnCloseInputHolder = document.querySelector(".modal .crossBtn");
var ModalContainer = document.querySelector(".modal");
var Modal_Form = document.querySelector(".form-holder");
var Div_container = document.querySelector(".main-container");
var DivModal = document.querySelector(".modal");
var NewDataBtn = document.querySelector("#AddNewBtn");
var LogInBtn = document.querySelector("#LogINnBtn");
var SearchTxtbx = document.querySelector("#SearchTxtbx");

var iconsImages = [
    // ["facebook.com", "FacebookImagename"],
    // ["instagram.com", "instagramImagename"],
]

LogInBtn.addEventListener("click", () => {
    Trigger_inputModal("loginPanel");
});

// ModalContainer.addEventListener("click", () => {
//     Trigger_inputModal("credentialsPanel");
//     resetModal();
// });
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

function enableSearch() {
    console.log("Search started");
    var dataRows = document.querySelectorAll(".dataCredentials .data b");
    SearchTxtbx.addEventListener("keyup", () => {
        dataRows.forEach(DataRow => {
            if (DataRow.innerText.toLowerCase().includes(SearchTxtbx.value.toLowerCase()) == false)
                DataRow.parentElement.parentElement.classList.add("hidden");
            else
                DataRow.parentElement.parentElement.classList.remove("hidden");
        });
        //if (tableRows. searchTxtBox.value.toLowerCase())
    })
}


function enableFilter() {
    var AllCategories = document.querySelectorAll(".credentailsTypesMenu ul li");
    var allCredentials = document.querySelectorAll("#dataCredentials div");
    AllCategories.forEach(category => {
        category.addEventListener("click", () => {
            //console.log(`Showing only ${category.innerText}`);

            allCredentials.forEach(CredentialsEle => {
                if (category.innerText == "Show All") {
                    CredentialsEle.classList.remove("hidden");
                    CredentialsEle.classList.add("flex");
                }
                else {
                    if (!category.innerText.includes(CredentialsEle.getAttribute("data-website-type"))) {
                        CredentialsEle.classList.add("hidden");
                        CredentialsEle.classList.remove("flex");
                    }
                    else {
                        CredentialsEle.classList.remove("hidden");
                        CredentialsEle.classList.add("flex");
                    }
                }

            });
        })
    });
}