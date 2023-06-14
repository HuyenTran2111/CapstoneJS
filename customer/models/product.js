export default class Product {
  constructor(
    _id,
    _tenSP,
    _giaSP,
    _kichThuoc,
    _camTrc,
    _camSau,
    _anhSP,
    _moTa,
    _loaiSP,
    _soLuong
  ) {
    (this.id = _id),
      (this._tenSP = _tenSP),
      (this._giaSP = _giaSP),
      (this._kichThuoc = _kichThuoc),
      (this._camTrc = _camTrc),
      (this._camSau = _camSau),
      (this._anhSP = _anhSP),
      (this._moTa = _moTa),
      (this._loaiSP = _loaiSP);
    this._soLuong = _soLuong;
    this._giaCart = _giaSP;
  }
}
