/*
https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec

https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec?getUserData=User_Name  ---- Select where user

https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec?addRowData=true&dt1=Val1&dt2=Val2&dt3=Val3&dt4=Val4&dt5=Val5&dt6=Val6&dt7=Val7  ---- Insert

https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec?updateRowData=IPdRh&dt1=value1&dt2=value2&dt3=value3&dt4=value4&dt5=value5&dt6=value6 --- Update

https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec?deleteRowData=IPdRh ---- Delete
*/
var saveDataBtn = document.getElementById("saveDataBtn");
var deleteDataBtn = document.getElementById("DeleteDataBtn");
var LoginProceedBtn = document.querySelector("#LoginProceedBtn");
var LogoutBtn = document.querySelector("#LogoutBtn");
var EyeRevealBtn, MoreDetailsBtn;
var AllDataFetched;

var API_URL = "https://script.google.com/macros/s/AKfycbzK0KcYmZMginscOIBoEfaXTbuiAv8uebn1x4DRpJu5T4kxh358mtpC-aSjavN8bfU7/exec";
var Owner = "";

LogoutBtn.addEventListener("click", () => {
    Owner = "";
    var DataContainer = document.querySelector("#dataCredentials");
    DataContainer.innerHTML = "";
    document.getElementById("loginForm_Pnl").classList.add("flex");
    document.getElementById("loginForm_Pnl").classList.remove("hidden");
    localStorage.clear();
});

saveDataBtn.addEventListener("click", () => {
    var WebsiteType = document.getElementById("WebsiteType").value;
    var Website = document.getElementById("Website").value;
    var UserName = document.getElementById("UserName").value;
    var Password = CryptoGenerator(document.getElementById("Password").value, "encrypt", Owner);

    var LinkedEmail = document.getElementById("LinkedEmail").value;
    var Notes = document.getElementById("Notes").value;

    if (saveDataBtn.innerText == "Update") {
        var ID = saveDataBtn.getAttribute("data-id");
        editPreviousData(ID, Website, WebsiteType, UserName, Password, LinkedEmail, Notes, Owner);
    }
    else
        saveNewPass(Website, WebsiteType, UserName, Password, LinkedEmail, Notes, Owner);
})

deleteDataBtn.addEventListener("click", () => {
    deletePreviousData(deleteDataBtn.getAttribute("data-id"));
})

function saveNewPass(data1, data2, data3, data4, data5, data6, data7) {
    var InsertDataResponse = "";

    fetch(API_URL + `?addRowData=true&dt1=${data1}&dt2=${data2}&dt3=${data3}&dt4=${data4}&dt5=${data5}&dt6=${data6}&dt7=${data7}`)
        .then(response => response.json())
        .then(data => {
            InsertDataResponse = data.Data;
            getUsersAllData(Owner);
            Trigger_inputModal("credentialsPanel");
        })
    return InsertDataResponse;
}

function editPreviousData(ID, data1, data2, data3, data4, data5, data6, data7) {
    var InsertDataResponse = "";

    fetch(API_URL + `?updateRowData=${ID}&dt1=${data1}&dt2=${data2}&dt3=${data3}&dt4=${data4}&dt5=${data5}&dt6=${data6}&dt7=${data7}`)
        .then(response => response.json())
        .then(data => {
            InsertDataResponse = data.Data;
            getUsersAllData(Owner); // Load Data again after Update (Refresh)
            Trigger_inputModal("credentialsPanel");
        })
    return InsertDataResponse;
}

function deletePreviousData(ID) {
    var DataResponse = "";

    fetch(API_URL + `?deleteRowData=${ID}`)
        .then(response => response.json())
        .then(data => {
            DataResponse = data.Data;
            getUsersAllData(Owner); // Load Data again after Delete (Refresh)
            Trigger_inputModal("credentialsPanel");
        })
    return DataResponse;
}

function getUsersAllData(Data) {
    if (Data != "") {
        fetch(API_URL + `?getUserData=${Data}`)
            .then(response => response.json())
            .then(data => {
                // AllData = Object.values(data.Data);
                try {
                    if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                        console.log("No Data Found");
                        document.querySelector("#dataCredentials h2").classList.remove("hidden");
                    }
                } catch (error) {
                    AllDataFetched = data.Data;
                    LoadData(data.Data)
                }
            })
    }
}

function LoadData(DataList) {
    var DataContainer = document.querySelector("#dataCredentials");
    DataContainer.innerHTML = "";
    DataList.forEach(data => {
        DataContainer.insertAdjacentHTML("beforeend", `
        <div id="${data[0]}" data-Website-type ="${data[2]}"
            class="data flex justify-between items-center bg-white rounded-md shadow-lg w-full px-5 my-1 ">
            <img class="object-contain h-10 w-10 rounded-md basis-[12%] flex-shrink-0 flex-grow-0"
                src="assets/images/${data[1].replaceAll(".com", "").toLowerCase()}.png">
            <span class="flex flex-col basis-[30%] flex-shrink-0 flex-grow-0">
                <b class="capitalize">${data[1]}</b>
                <p>${data[3]}</p>
            </span>
            <span class="flex justify-between lg:justify-center items-center gap-2 basis-[35%] flex-shrink-0 flex-grow-0">
                <p data-value="${data[4]}">*****************</p>
                <i class="cursor-pointer text-[black] fas fa-eye-slash"></i>
            </span>
            <i class="cursor-pointer text-[black] flex-shrink-0 flex-grow-0 fas fa-chevron-right"></i>
        </div>
        `);
    });
    EyeRevealBtn = document.querySelectorAll("#dataCredentials div :nth-child(3) :nth-child(2)");
    MoreDetailsBtn = document.querySelectorAll("#dataCredentials div :nth-child(4)");

    enablePasswordReveal();
    enableMoreDetails();
}

function enablePasswordReveal() {
    EyeRevealBtn.forEach(EyeBtn => {
        EyeBtn.addEventListener("click", () => {
            if (!EyeBtn.classList.contains("fa-eye-slash")) {
                EyeBtn.classList.remove("fa-eye");
                EyeBtn.classList.add("fa-eye-slash");
                EyeBtn.previousElementSibling.innerText = "*****************";
            }
            else {
                EyeBtn.classList.add("fa-eye");
                EyeBtn.classList.remove("fa-eye-slash");
                EyeBtn.previousElementSibling.innerText = CryptoGenerator(EyeBtn.previousElementSibling.getAttribute("data-value").replaceAll(" ", "+"), "decrypt", Owner);
            }
        });
    });
}

function enableMoreDetails() {
    MoreDetailsBtn.forEach(DataMoreDetails => {
        DataMoreDetails.addEventListener("click", () => {
            Trigger_inputModal("credentialsPanel");

            document.querySelector(".modal .form-holder h2").innerText = "More Details";
            document.getElementById("saveDataBtn").innerText = "Update";
            document.getElementById("saveDataBtn").setAttribute("data-id", DataMoreDetails.parentElement.getAttribute("id"));
            document.getElementById("DeleteDataBtn").setAttribute("data-id", DataMoreDetails.parentElement.getAttribute("id"));
            document.getElementById("DeleteDataBtn").classList.remove("hidden");
            for (let index = 0; index < AllDataFetched.length; index++) {
                //const element = AllDataFetched[index];
                if (AllDataFetched[index][0] == DataMoreDetails.parentElement.getAttribute("id")) {

                    document.getElementById("Website").value = AllDataFetched[index][1];
                    document.getElementById("WebsiteType").value = AllDataFetched[index][2];
                    document.getElementById("UserName").value = AllDataFetched[index][3];
                    document.getElementById("Password").value = CryptoGenerator(AllDataFetched[index][4].replaceAll(" ", "+"), "decrypt", Owner);
                    document.getElementById("LinkedEmail").value = AllDataFetched[index][5];
                    document.getElementById("Notes").value = AllDataFetched[index][6];
                    break;
                }
            }
        });
    });
}

getUsersAllData(Owner); // Initial Load of Data

LoginProceedBtn.addEventListener("click", () => {
    if (!document.querySelector("#loginPanel .part1").classList.contains("hidden"))
        readAccount(document.querySelector("#loginUserName").value);
    else {

        if (document.querySelector("#loginPass").value == FetchedData[0][5]) {
            Trigger_inputModal("loginPanel");

            Owner = FetchedData[0][4];
            getUsersAllData(Owner);
            if (document.querySelector("#staysignedin").checked) {
                localStorage.setItem("Personal Assistant UserName", FetchedData);
            }
            document.getElementById("loginForm_Pnl").classList.remove("flex");
            document.getElementById("loginForm_Pnl").classList.add("hidden");
            document.querySelector("#Header_userName p").innerText = `${FetchedData[0][1]} ${FetchedData[0][2]}`;
        }
        else
            alert("Password entered is incorrect");
    }
});

if (localStorage.getItem("Personal Assistant UserName") == null) {
    document.getElementById("loginForm_Pnl").classList.add("flex");
    document.getElementById("loginForm_Pnl").classList.remove("hidden");
}
else {
    document.querySelector("#Header_userName p").innerText = `${localStorage.getItem("Personal Assistant UserName").split(",")[1]} ${localStorage.getItem("Personal Assistant UserName").split(",")[2]}`;
    Owner = localStorage.getItem("Personal Assistant UserName").split(",")[4];
    getUsersAllData(Owner);
}

document.querySelector("#lgnDefaultUser").addEventListener("click", () => {

    document.getElementById("loginForm_Pnl").classList.remove("flex");
    document.getElementById("loginForm_Pnl").classList.add("hidden");
    document.querySelector("#Header_userName p").innerText = `Elun Mosk`;
    Owner = "EMosk1";
    getUsersAllData(Owner);
})