import Api from "./../services/api.js";
import Phone from "./../model/phone.js";
import Validation from "../model/validation.js";
const api = new Api();
const validation = new Validation();

const getEle = (id) => {
    return document.getElementById(id);
};



const renderPhoneList = (data) => {
    let content = "";
    if (data && data.length > 0) {
        data.forEach((Phone) => {
            content += `
        <tr>
            <td>${Phone.id}</td>
            <td>${Phone.name}</td>
            <td>${Phone.price}</td>
            <td><img width="50" src="${Phone.img}" alt="" /></td>
            <td>${Phone.desc}</td>
            <td>
            <button class="btn btn-warning" data-toggle="modal"
            data-target="#myModal" onclick="editPhone(${Phone.id})">Edit</button>
            </td>
            <td>
            <button onclick="deletePhone(${Phone.id})" class="btn btn-danger">Delete</button>
            </td>
        </tr>`;
        });

    }
    getEle("tblPhoneList").innerHTML = content;
}
const getPhoneInfo = function (id) {
    const name = getEle('name').value;
    const price = getEle('price').value;
    const screen = getEle('screen').value;
    const backCam = getEle('backCam').value;
    const frontCam = getEle('frontCam').value;
    const img = getEle('img').value;
    const desc = getEle('desc').value;
    const type = getEle('type').value;
    let isValid = [];
    let indexOfValidField = 0;
    isValid[indexOfValidField++] = validation.emptyTest(name, "errorName", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(price, "errorPrice", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(screen, "errorScreen", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(backCam, "errorBackCam", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(frontCam, "errorFrontCam", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(img, "errorImg", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.emptyTest(desc, "errorDesc", "(*) This field can't be empty");
    isValid[indexOfValidField++] = validation.typeTest("type", "errorType", "(*) Please select brand");

    if (isValid.includes(false)) {
        return null;
    }

    const phone = new Phone(id, name, price, screen, backCam, frontCam, img, desc, type);
    return phone;
};

const getPhoneList = () => {
    api
        .callApi("Phone", "GET", null)
        .then((res) => {
            renderPhoneList(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
};
getPhoneList();

// Add
getEle('btnAddForm').addEventListener('click', () => {
    getEle('name').value = "";
    getEle('price').value = "";
    getEle('screen').value = "";
    getEle('backCam').value = "";
    getEle('frontCam').value = "";
    getEle('img').value = "";
    getEle('desc').value = "";
    getEle('type').value = "Select brand";
    let valueOfFooter = `
        <button type="button" class="btn btn-warning" id="btnAddPhone" onclick='createPhone()'>Add Phone</button>
        <button type="button" class="btn btn-secondary" id="btnClose" data-dismiss="modal">Close</button>`;
    document.getElementsByClassName('modal-footer')[0].innerHTML = valueOfFooter;

    removeAllErrMsg();
});
const createPhone = () => {
    const phone = getPhoneInfo();
    if (phone == null) {
        return;
    }

    api
        .callApi("Phone", "POST", phone)
        .then((res) => {
            console.log(res);
            getPhoneList();
        })
        .catch((err) => {
            console.log(err);
        })


};
window.createPhone = createPhone;

// Delete
const deletePhone = (id) => {
    api.callApi(`Phone/${id}`, "DELETE", null)
        .then((res) => {
            console.log(res);
            getPhoneList();
        })
        .catch((err) => {
            console.log(err);
        })
};
window.deletePhone = deletePhone;

// Edit
const editPhone = (id) => {

    const valueOfFooter = `
        <button type="button" class="btn btn-success" id="btnUpdate" onclick=updatePhone(${id})>Update Phone</button>
        <button type="button" class="btn btn-secondary" id="btnClose" data-dismiss="modal">Close</button>`;
    document.getElementsByClassName('modal-footer')[0].innerHTML = valueOfFooter;

    api
        .callApi(`Phone/${id}`, "GET", null)
        .then((res) => {
            const phone = res.data;
            getEle('name').value = phone.name;
            getEle('price').value = phone.price;
            getEle('screen').value = phone.screen;
            getEle('backCam').value = phone.backCamera;
            getEle('frontCam').value = phone.frontCamera;
            getEle('img').value = phone.img;
            getEle('desc').value = phone.desc;
            getEle('type').value = phone.type;
        })
        .catch((err) => {
            console.log(err);
        })
    removeAllErrMsg();
};
window.editPhone = editPhone;

// Update
const updatePhone = (id) => {
    const phone = getPhoneInfo(id);

    api.callApi(`Phone/${id}`, "PUT", phone)
        .then((res) => {
            getPhoneList();
        })
        .catch((err) => {
            console.log(err);
        })
};
window.updatePhone = updatePhone;

//Remove
const removeAllErrMsg = () => {
    getEle('errorName').style.display = "none";
    getEle('errorPrice').style.display = "none";
    getEle('errorScreen').style.display = "none";
    getEle('errorBackCam').style.display = "none";
    getEle('errorFrontCam').style.display = "none";
    getEle('errorImg').style.display = "none";
    getEle('errorDesc').style.display = "none";
    getEle('errorType').style.display = "none";

}

// Search
getEle("btnSearchPhone").onclick = function () {
    getPhoneSearch(document.getElementById("searchName").value);
}

const getPhoneSearch = (term) => {
    api.callApi("Phone", "GET", null)
        .then((res) => {
            if(term.trim() === ""){
                renderPhoneList(res.data);
            } else{
                let result = [];
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].name === term.trim()) {
                        result.push(res.data[i]);
                    }
                }
                renderPhoneList(result);
            }
            
            
        })
        .catch((err) => {
            console.log(err);
        })
}

getEle('btnIncrease').onclick = () => {
    api.callApi("Phone", "GET", null)
        .then((res) => {
            let result = res.data;
            for(let i = 0; i < result.length - 1; i++) {
                let minIndex = i;
                for(let j = i + 1; j < result.length; j++) {
                    if(result[j].price < result[minIndex].price) {
                        minIndex = j;
                    }
                }
                let temp = result[minIndex];
                result[minIndex] = result[i];
                result[i] = temp;
            }
            renderPhoneList(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

getEle('btnDecrease').onclick = () => {
    api.callApi("Phone", "GET", null)
        .then((res) => {
            let result = res.data;
            for(let i = 0; i < result.length - 1; i++) {
                let maxIndex = i;
                for(let j = i + 1; j < result.length; j++) {
                    if(result[j].price > result[maxIndex].price) {
                        maxIndex = j;
                    }
                }
                let temp = result[maxIndex];
                result[maxIndex] = result[i];
                result[i] = temp;
            }
            renderPhoneList(result);
        })
        .catch((err) => {
            console.log(err);
        })
}

