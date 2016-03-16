var express             = require('express');
var router              = express.Router();
var play_controller    = require('../controllers/play_controller');

/* GET Newsletter Shops listing. */
router.get('/', play_controller.list);
router.get('/:id', play_controller.get);
router.post('/',play_controller.create);
//router.put('/:id',charts_controller.put);
//router.delete('/:id',charts_controller.delete);

module.exports = router;
