const pool = require("../pool");


exports.getAllBrands = async function () {
    const { rows } = await pool.query('SELECT * FROM mouse_brands ORDER BY name');
    return rows;
};
exports.getBrandById = async function (brand_id) {
    const { rows } = await pool.query('SELECT * FROM mouse_brands WHERE id = $1', [brand_id]);
    return rows[0];
};

exports.createNewBrand = async function (brand_name) {
    await pool.query('INSERT INTO mouse_brands (name) VALUES ($1)', [brand_name]);
};

exports.updateOldBrand = async function (brand_id, brand_name) {
    await pool.query('UPDATE mouse_brands SET name = $2 WHERE id = $1', [brand_id, brand_name]);
};

exports.deleteBrand = async function (brand_id) {
    await pool.query('DELETE FROM mouse_brands WHERE id = $1', [brand_id]);
};