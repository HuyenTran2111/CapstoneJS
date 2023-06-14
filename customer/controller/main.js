import Api from "../services/api.js";
import Product from "../models/product.js";
import CartList from "../models/CartList.js";

const api = new Api();
const cartList = new CartList();
const getEle = (id) => document.getElementById(id);

const getProduct = (result) => {
  let id = result.data.id;
  let tenSP = result.data.name;
  let giaSP = result.data.price;
  let kichThuoc = result.data.screen;
  let camTrc = result.data.backCamera;
  let camSau = result.data.frontCamera;
  let anhSP = result.data.img;
  let moTa = result.data.desc;
  let loaiSP = result.data.type;
  let soLuong = 1;
  const product = new Product(
    id,
    tenSP,
    giaSP,
    kichThuoc,
    camTrc,
    camSau,
    anhSP,
    moTa,
    loaiSP,
    soLuong
  );
  return product;
};

const renderUI = (data) => {
  let content = "";

  if (data && data.length > 0) {
    data.forEach((product) => {
      content += `
          <div class="col-lg-3 col-md-6">
            <div class="card text-black h-100">
            <div class="content-overlay"></div>
              <img src="${product.img}" class="card-img" alt="Phone Image">
              <div class="content-details fadeIn-top">
              <h3 class="pb-5">Specifications</h3>
                    <div class="d-flex justify-content-start py-1">
                  <span class="text-light"><b>Screen:</b></span>
                  <span class="text-light">${product.screen}</span>
                </div>
                <div class="d-flex justify-content-start py-1">
                  <span class="text-light"><b>Back Camera:</b> ${
                    product.backCamera
                  }</span>
                </div>
                <div class="d-flex justify-content-start py-1">
                  <span class="text-light"><b>Front Camera:</b> ${
                    product.frontCamera
                  }</span>
                </div>

                <p class="pt-5"><u>click here for more details</u></p>
              </div>
              <div class="card-body">
                <div class="text-center">
                  <h5 class="card-title pt-3">${product.name}</h5>
                  <span class="text-muted mb-2">$${product.price}</span>
                </div>
                <div class="mt-3 brand-box text-center">
                  <span>${product.type}</span>
                </div>
                <div class="d-flex justify-content-start pt-3">
                  <span><b>Description:</b>${product.desc}</span>
                </div>
                <div class="d-flex justify-content-between pt-3">
                  <div class="text-warning">
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                      <i class="fa fa-star"></i>
                  </div>
                  <span class="text-success"><b>${checkStatus(
                    product.status
                  )}</b></span>
                </div>
                <button type="button" class="btn btn-block w-50" onclick="btnAddToCart(${
                  product.id
                })">Add to cart</button>
              </div>
            </div>
          </div>
        `;
    });

    getEle("phoneList").innerHTML = content;
  }
};

const renderCart = (data) => {
  let content = "";
  let totalCart = 0;
  let shippingFee = 0;
  let taxFee = 0;
  let cartCount = 0;
  if (data && data.length > 0) {
    data.forEach((cart) => {
      content += `
      <div class="product">
  <div class="product__1">
    <div class="product__thumbnail">
      <img src="${cart._anhSP}" alt="Italian Trulli">
    </div>
    <div class="product__details">
      <div style="margin-bottom: 8px;"><b>${cart._tenSP}</b></div>
      <div style="font-size: 90%;">Screen: <span class="tertiary">${cart._kichThuoc}</span></div>
      <div style="font-size: 90%;">Back Camera: <span class="tertiary">${cart._camSau}</span></div>
      <div style="font-size: 90%;">Front Camera: <span class="tertiary">${cart._camTrc}</span></div>
      <div style="margin-top: 8px;"><a href="#!" onclick="btnRemove(${cart.id})">Remove</a></div>
    </div>
  </div>
  <div class="product__2">
    <div class="qty">
      <span><b>Quantity:</b> </span> &nbsp; &nbsp;
      <span class="minus bg-dark" onclick="btnMinus(${cart.id})">-</span>
      <span class="quantityResult mx-2">${cart._soLuong}</span>
      <span class="plus bg-dark" onclick="btnAdd(${cart.id})">+</span>
    </div>
    <div class="product__price"><b>$${cart._giaCart}</b></div>
  </div>
</div>
      `;

      totalCart += cart._giaCart;
      shippingFee += 10;
      taxFee += 200;
      cartCount += 1;
    });
  }

  getEle("subTotal").innerHTML = `$${totalCart}`;
  getEle("shipping").innerHTML = `$${shippingFee}`;
  getEle("tax").innerHTML = `$${taxFee}`;
  getEle("priceTotal").innerHTML = `$${totalCart + shippingFee + taxFee}`;
  getEle("cartCount").innerHTML = cartCount;
  getEle("cartList").innerHTML = content;
};
const getListFood = () => {
  api
    .callApi("Phone", "GET", null)
    .then((result) => {
      renderUI(result.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListFood();

const checkStatus = (val) => {
  let txtStatus = "";
  switch (val) {
    case "0":
      txtStatus = "Hết hàng";
      break;
    case "1":
      txtStatus = "Còn hàng";
      break;
  }
  return txtStatus;
};

const renderOption = async () => {
  let content = "";
  let fullList = "<option value='all'>All Brands</option>";
  let typeArr = [];
  const result = await api.callApi("Phone", "GET", null);
  if (result.status === 200 && result.statusText === "OK") {
    //success
    let typeList = result.data;
    typeList.forEach((type) => typeArr.push(type.type));

    if (typeArr.length > 0) {
      let uniqueType = typeArr.filter((element, index) => {
        return typeArr.indexOf(element) === index;
      });
      console.log(uniqueType);
      uniqueType.forEach(
        (type) => (content += `<option value="${type}">${type}</option>`)
      );
    }
    fullList = `${fullList}${content}`;
    getEle("selectList").innerHTML = fullList;
  }
};

renderOption();

getEle("selectList").addEventListener("change", async () => {
  const value = getEle("selectList").value;

  const result = await api.callApi("Phone", "GET", null);
  if (result.status === 200 && result.statusText === "OK") {
    //success
    let mangTimKiem = result.data;

    if (value !== "all") {
      mangTimKiem = result.data.filter((product) => product.type === value);
    }

    renderUI(mangTimKiem);
  }
});

const btnAddToCart = (val) => {
  api
    .callApi(`Phone/${val}`, "GET", null)
    .then((result) => {
      var product = getProduct(result);
      if (cartList.checkExist(product.id) == false) {
        cartList.addCart(product);
      } else {
        cartList.addSoLuong(product);
        setLocalStorage();
        renderCart(cartList.arr);
      }

      renderCart(cartList.arr);
      setLocalStorage();
    })
    .catch((error) => {
      console.log(error);
    });
};

window.btnAddToCart = btnAddToCart;

const setLocalStorage = () => {
  //convert Json => String
  var dataString = JSON.stringify(cartList.arr);
  //set localStorage
  localStorage.setItem("CartList", dataString);
};

const getLocalStorage = () => {
  //check condition
  if (localStorage.getItem("CartList")) {
    var dataString = localStorage.getItem("CartList");
    //convert String => Json
    cartList.arr = JSON.parse(dataString);
    //render table
    // renderTable(cartList.arr);
    console.log(cartList.arr);
    renderCart(cartList.arr);
  }
};
getLocalStorage();

const btnAdd = (id) => {
  let sp = cartList.layThongTinSP(id);
  if (sp) {
    cartList.addSoLuong(sp);
    setLocalStorage();
    renderCart(cartList.arr);
  }
};

window.btnAdd = btnAdd;

const btnMinus = (id) => {
  let sp = cartList.layThongTinSP(id);
  if (sp) {
    cartList.removeSoLuong(sp);
    setLocalStorage();
    renderCart(cartList.arr);
  }
};

window.btnMinus = btnMinus;

const btnRemove = (id) => {
  cartList.xoaSP(id);
  setLocalStorage();
  renderCart(cartList.arr);
};

window.btnRemove = btnRemove;

const payNow = () => {
  cartList.xoaCart();
  setLocalStorage();
  renderCart(cartList.arr);
  Swal.fire(
    "Thanh toán thành công",
    "cám ơn bạn đã mua hàng của chúng tôi!",
    "success"
  );
};

window.payNow = payNow;

const emptyCart = () => {
  cartList.xoaCart();
  setLocalStorage();
  renderCart(cartList.arr);
};

window.emptyCart = emptyCart;
