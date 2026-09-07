const database = require('../db/queries/modelsQueries');
const brand_db = require('../db/queries/brandsQueries');
const { validationResult } = require('express-validator');


exports.index = async (req, res) => {
    try { 
        const models = await database.getAllModels();

        res.render('models/index', { models });
     } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Server error");
        }
};

exports.show = async (req, res) => {
    const model_id = req.params.id;

    if(!/^\d+$/.test(model_id)) {
        return res.status(400).send("Bad request: Invalid id");
    }

    try {
        const model_obj = await database.getModelById(model_id);
        console.log(model_obj)
        if (!model_obj) {
            return res.status(404).send("Model not found");
        }
    
            res.render('models/show', { model: model_obj });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Server error");
        }
};

exports.create = async (req, res) => {
    try {
    const brands = await brand_db.getAllBrands();

    res.render("models/form", { brands, model: {}, errors: [] });
    } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Server error");
        }
};
exports.save = async (req, res) => {
    const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(404).render("models/form", {
                errors: errors.array(),
                model: req.body.new_model_name,
                brands: [req.body.brand_dropdown_id], 
            });
        }
    
        try {
            await database.createNewModels(req.body);
            res.redirect("/models");
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Server error");
        }
};


exports.edit = async (req, res) => {
    const model_id = req.params.id;
       
        try {
            const model_obj = await database.getModelById(model_id);
            console.log(model_obj);
            const brands = await brand_db.getAllBrands();
            if (!model_obj) {
                return res.status(404).send("Model not found");
            }

    
            res.render("models/form", { brands, model: model_obj , errors: [] });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send("Server error");
        }
};


exports.update = async (req, res) => {
     const errors = validationResult(req);
   
       if(!errors.isEmpty()) {
           return res.status(404).render("models/form", {
               errors: errors.array(),
           });
       }

       const model_id = req.params.id;
   
       try {
           await database.updateOldModel(req.body, model_id); 
           res.redirect("/models");
           } catch (error) {
           console.error("Error:", error);
           res.status(500).send("Server error");
           }
};


exports.delete = async (req, res) => {
    try {
        const model_id = req.params.id;
        
        await database.deleteModel(model_id); 
        res.redirect("/models");
        } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
        }
}; 

