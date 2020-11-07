/**
 * File: scripts.js
 * Type: Javascripts
 * Description: generic app scripts
 */

 function checkPhone(){
    // Jquery to check input
    $('#phone').on('input', function(e){
        var phone = document.getElementById('phone').value
        phone = phone.replace(/\D/g,'')

        if(phone.length >= 10){
            phone = phone.replace(/[-]/g,'')
            var tmp = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6,10)
            phone = tmp
        }

        document.getElementById('phone').value = phone
    })
}
