var API_URLAccounts = "https://script.google.com/macros/s/AKfycbx3SKCwHlVyg3HBJ1E3vlnGvpcVAlDh3rvkWVb4fxXtSHDp8ORqWW9FkFNgG2xdnCNg/exec";
var FetchedData;

function readAccount(data1) {
    var DataResponse = "";

    fetch(API_URLAccounts + `?getUserData=${data1}`)
        .then(response => response.json())
        .then(data => {
            DataResponse = data.Data;
            FetchedData = data.Data;
            try {
                if (DataResponse[0].length > 1) {
                    document.querySelector("#loginPanel .part2").classList.remove("hidden");
                    document.querySelector("#loginPanel .part1").classList.add("hidden");
                }
                else {
                    alert("User Name not Found, Please retry.");
                    document.querySelector("#UserName").value = "";
                    document.querySelector("#Password").value = "";
                }
            } catch (error) {
            }
        })
    return DataResponse;
}
