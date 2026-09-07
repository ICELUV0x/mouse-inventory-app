const { Router } = require('express');
const router = Router();
const modelsController = require('../controllers/modelsController');
const { body } = require('express-validator');

const validateModelName = body("new_model_name")
                          .trim()
                          .notEmpty().withMessage("Model name is required")
                          .isLength({min: 2}).withMessage("Model name must be a string longer then 2 characters");
const validateColor = body("color")
                          .trim()
                          .notEmpty().withMessage("Color is required")
                          .isLength({min: 3}).withMessage("Color must be a string longer then 3 characters");
const validatePrice = body("price")
                          .notEmpty().withMessage('Price is required')
                          .isFloat({min: 0.01 }).withMessage('Price must be a positive number greater than zero');
const validateWeight = body("weight")
                          .notEmpty().withMessage("Weight is required")
                          .isFloat({min: 0.1}).withMessage('Weight must be a positive number greater than zero');
const validateLength = body("length")
                          .notEmpty().withMessage("Length  is required")
                          .isFloat({min: 0.1}).withMessage('Length  must be a positive number greater than zero');
const validateWidth = body("width")
                          .notEmpty().withMessage("Width  is required")
                          .isFloat({min: 0.1}).withMessage('Width  must be a positive number greater than zero');
const validateHeight = body("height")
                          .notEmpty().withMessage("Height  is required")
                          .isFloat({min: 0.1}).withMessage('Height  must be a positive number greater than zero');
const validateStock = body("stock")
                          .notEmpty().withMessage("Stock quantity is required")
                          .isFloat({min: 0}).withMessage('Stock quantity must be a positive number');



router.get('/', modelsController.index);
router.get('/create', modelsController.create);
router.post('/create', validateModelName,
                       validateColor,
                       validatePrice,
                       validateWeight,
                       validateLength,
                       validateWidth,
                       validateHeight,
                       validateStock,
                       modelsController.save);
router.get('/:id', modelsController.show);
router.get('/:id/update', modelsController.edit);
router.post('/:id/update', validateModelName,
                            validateColor,
                            validatePrice,
                            validateWeight,
                            validateLength,
                            validateWidth,
                            validateHeight,
                            validateStock,
                            modelsController.update);
router.post('/:id/delete', modelsController.delete);


module.exports = router;