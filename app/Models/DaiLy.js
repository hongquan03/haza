let mongoose = require('mongoose');
let Schema = new mongoose.Schema({
    name: { type: String, required: false }, // Tên đại lý
    nickname: { type: String, required: true }, // Tên nhân vật trong game
    phone: { type: String, required: false }, // Số điện thoại
    fb: { type: String, default: '' }, // ID Facabook
    location: { type: String, default: '' }, //Khu vực
    rights: { type: Number, default: 10 }, //Quyền đại lý, mặc định là cấp 1
    createdBy: { type: String, default: '' } //Được tạo bởi user nào
});

module.exports = mongoose.model('dailies', Schema);