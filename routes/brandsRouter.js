const { Router } = require('express');
const router = Router();
const brandsController = require('../controllers/brandsController');
const { body } = require('express-validator');

const validateBrandName = body("new_brand_name")
                          .trim()
                          .notEmpty().withMessage("Brand name is required")
                          .isLength({ max: 100 }).withMessage("Name too long");

router.get('/', brandsController.index);
router.get('/create', brandsController.create);
router.post('/create', validateBrandName , brandsController.save);
router.get('/:id', brandsController.show);
router.get('/:id/update', brandsController.edit);
router.post('/:id/update', validateBrandName, brandsController.update);
router.get('/:id/delete', brandsController.delete);


module.exports = router;