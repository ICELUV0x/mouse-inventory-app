const pool = require("../pool");


exports.getAllModels = async function () {
    const { rows } = await pool.query(`SELECT mouse_models.id, mouse_brands.name AS brand_name, mouse_models.name AS model_name,
                                       color, price, weight_g, length_mm, width_mm, height_mm, is_wireless, stock_quantity
                                       FROM mouse_models 
                                       JOIN mouse_brands ON
                                       mouse_models.brand_id = mouse_brands.id ORDER BY mouse_models.name`);
    return rows;
};

exports.getModelById = async function (model_id) {
    const { rows } = await pool.query(`SELECT mouse_models.id, mouse_models.brand_id, mouse_brands.name AS brand_name, mouse_models.name AS model_name,
                                       color, price, weight_g, length_mm, width_mm, height_mm, is_wireless, stock_quantity, created_at
                                       FROM mouse_models 
                                       JOIN mouse_brands ON
                                       mouse_models.brand_id = mouse_brands.id
                                       WHERE mouse_models.id = $1 ORDER BY mouse_models.name`, [model_id]);
    return rows[0];
};

exports.createNewModels = async function ({brand_dropdown_id, new_model_name, color, price, weight, length, width, height, is_wireless, stock}) { 
    await pool.query(`INSERT INTO mouse_models (brand_id, name, color, price, weight_g, length_mm, width_mm, height_mm, is_wireless, stock_quantity)
                      VALUES
                      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                      [brand_dropdown_id, new_model_name, color, price, weight, length, width, height, is_wireless === 'true', stock]); 
};

exports.updateOldModel = async function ({brand_dropdown_id, new_model_name, color, price, weight, length, width, height, is_wireless, stock}, model_id) {
    await pool.query(`UPDATE mouse_models SET brand_id = $1, name = $2, color = $3, price = $4, weight_g = $5,
                      length_mm = $6, width_mm = $7, height_mm = $8, is_wireless = $9, stock_quantity = $10 WHERE id = $11`, 
                      [brand_dropdown_id, new_model_name, color, price, weight, length, width, height, is_wireless === 'true', stock, model_id]);
    
};

exports.deleteModel = async function (model_id) {
    await pool.query('DELETE FROM mouse_models WHERE id = $1', [model_id]);
};