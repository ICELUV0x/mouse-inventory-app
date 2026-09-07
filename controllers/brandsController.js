const database = require('../db/queries/brandsQueries');
const { validationResult } = require('express-validator');

exports.index = async (req, res) => {
    const brands = await database.getAllBrands();

    res.render('brands/index', { brands });
};

exports.show = async (req, res) => {
    const brand_id = req.params.id;

    if(!/^\d+$/.test(brand_id)) {
        return res.status(400).send("Bad request: Invalid id");
    }

    try {
        const brand_obj = await database.getBrandById(brand_id);

        if (!brand_obj) {
            return res.status(404).send("Brand not found");
        }

        res.render('brands/show', { brand: brand_obj });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
};

exports.create = async (req, res) => {
    res.render("brands/form", { brand: {}, errors: [] });
};

exports.save = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(404).render("brands/form", {
            errors: errors.array(),
            brand: req.body.new_brand_name, 
        });
    }

    try {
        const brand_name = req.body.new_brand_name;

        await database.createNewBrand(brand_name);
        res.redirect("/brands");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
};

exports.edit = async (req, res) => {
    const brand_id = req.params.id;
    
    try {
        const brand_obj = await database.getBrandById(brand_id);

        if (!brand_obj) {
            return res.status(404).send("Brand not found");
        }

        res.render("brands/form", { brand: brand_obj , errors: [] });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
};

exports.update = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(404).render("brands/form", {
            errors: errors.array()
        });
    }

    try {
        const brand_id = req.params.id;
        const brand_name = req.body.new_brand_name;

        await database.updateOldBrand(brand_id, brand_name); 
        res.redirect("/brands");
        } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
        }
};

exports.delete = async (req, res) => { 
     try {
         const brand_id = req.params.id;
    
         await database.deleteBrand(brand_id); 
         res.redirect("brands");
         } catch (error) {
         console.error("Error:", error);
         res.status(500).send("Server error");
         }
};