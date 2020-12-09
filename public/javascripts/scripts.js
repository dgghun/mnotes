/**
 * File: scripts.js
 * Type: Javascripts
 * Description: generic app scripts
 */

 /**
  * Checks and formats phone field input
  */
function checkPhone() {
    // Jquery to check input
    $('#phone').on('input', function (e) {
        var phone = document.getElementById('phone').value
        phone = phone.replace(/\D/g, '')

        if (phone.length >= 10) {
            phone = phone.replace(/[-]/g, '')
            var tmp = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10)
            phone = tmp
        }

        document.getElementById('phone').value = phone
    })

}

/**
 * Search for clients and show/hide them 
 */
function userPageSearchName(){
    var nameTags = document.getElementsByTagName('name')
    var updateTags = document.getElementsByTagName('updated')
    var tags
    var input = document.getElementById('inputNameSearch').value.toUpperCase()
    var name = ''
    var tohide = ''

    //name or update date search?
    if(input.trim().match(/^\d/))
        tags = updateTags   //looking for date updated
    else
        tags = nameTags     //looking for a name
  

    //hide or show all Client cards by name
    for(tag of tags){
        name = tag.textContent.toUpperCase() || tag.innerText.toUpperCase()
        tohide = 'userCard' + tag.id

        // Find a string match 
        if(name.indexOf(input) > -1){
            document.getElementById(tohide).style.display = ''  //found a match, show it
        }
        else{
            document.getElementById(tohide).style.display = 'none'  //no match, hide it
        }
    }
}


function sortByDateTime(tagName, ascending){
    var tags = document.getElementsByTagName(tagName)
    for(tag of tags){
        console.log(tag.innerHTML)
    }
}


//Need this???
// function checkSpecialCharacters(arrayToCheck){
//     arrayToCheck.forEach(element => {
//         console.log(element)
//     });
// }
