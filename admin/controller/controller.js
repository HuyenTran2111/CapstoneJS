import Api from "./../services/api.js";
import Phone from "./../model/phone.js";
const api = new Api();


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
   

    let valueOfFooter = `
        <button type="button" class="btn btn-warning" id="btnAddPhone" onclick='createPhone()'>Add Phone</button>
        <button type="button" class="btn btn-secondary" id="btnClose" data-dismiss="modal">Close</button>`;
    document.getElementsByClassName('modal-footer')[0].innerHTML = valueOfFooter;
});
const createPhone = () => {
    const phone = getPhoneInfo();
    
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

