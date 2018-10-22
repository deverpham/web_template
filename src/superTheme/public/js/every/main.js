
const UpdateBalance = require('../service/updateBalance');
$(document).ready(function() {
    UpdateBalance();
    setInterval(() => {
        UpdateBalance();
    }, 3000)
})
