export default class CartList {
  constructor() {
    this.arr = [];
    this.addCart = function (sp) {
      this.arr.push(sp);
    };

    this.timViTri = function (maSP) {
      var index = -1;
      for (var i = 0; i < this.arr.length; i++) {
        var sp = this.arr[i];
        if (Number(sp.id) === Number(maSP)) {
          index = i;
          break;
        }
      }
      return index;
    };

    this.layThongTinSP = function (maSP) {
      var index = this.timViTri(maSP);

      if (index !== -1) {
        return this.arr[index];
      }

      return null;
    };

    this.xoaSP = function (maSP) {
      var index = this.timViTri(maSP);
      if (index !== -1) {
        this.arr.splice(index, 1);
      }
    };

    this.xoaCart = function () {
      this.arr = [];
    };

    this.addSoLuong = function (sp) {
      var index = this.timViTri(sp.id);
      if (index !== -1) {
        sp = this.arr[index];
        sp._soLuong += 1;
        sp._giaCart += sp._giaSP;
      }
    };

    this.removeSoLuong = function (sp) {
      var index = this.timViTri(sp.id);
      if (index !== -1) {
        sp = this.arr[index];
        sp._soLuong -= 1;
        sp._giaCart -= sp._giaSP;
        if (sp._soLuong == 0) {
          this.xoaSP(sp.id);
        }
      }
    };

    this.checkExist = function (maSP) {
      for (var i = 0; i < this.arr.length; i++) {
        var sp = this.arr[i];
        if (Number(sp.id) === Number(maSP)) {
          return true;
        }
      }
      return false;
    };
  }
}
