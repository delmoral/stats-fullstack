const express = require('express');
const router = express.Router();

router.use('/secure', ()=>{
    
})

router.get('/', (req, res) =>{
    res.json({
        status: 'Api works'
    })
});

module.exports = router;