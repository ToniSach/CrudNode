const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/', customerController.list);
//router.get('/Crud', customerController.listp);
router.post('/add', customerController.save);
router.get('/delete/:id', customerController.delete);
router.get('/update/:id', customerController.edit);
router.post('/update/:id', customerController.update);
router.get('/guardars', customerController.guardars);
router.get('/Busqueda', customerController.busca);




//en esta parte exportamos el codigo
module.exports = router;