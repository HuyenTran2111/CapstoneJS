const getEle = (id) => {
    return document.getElementById(id);
};

export default class Validation {

    emptyTest(value, errorId, mess) {
        if (value === "") {
            getEle(errorId).style.display = 'block';
            getEle(errorId).innerHTML = mess;
            return false;
        }

        getEle(errorId).style.display = 'none';
        getEle(errorId).innerHTML = "";
        return true;
    }

    typeTest(idSelect, errorId, mess){
        if(getEle(idSelect).selectedIndex !== 0){
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
    }

}