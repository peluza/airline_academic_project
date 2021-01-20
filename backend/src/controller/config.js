require("dotenv").config();

exports.port = process.env.PORT || 3050;
exports.clave = process.env.PASSWORD_TOKEN;
exports.host = process.env.HOST;
exports.user_db = process.env.USER_DB;
exports.password_db = process.env.PASSWORD_DB;
exports.name_data_base = process.env.NAME_DATA_BAASE;
