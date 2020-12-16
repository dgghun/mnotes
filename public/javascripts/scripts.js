/**
 * File: scripts.js
 * Type: Javascripts
 * Description: generic app scripts
 */


function addClientToForm(client) {
    
    $(function () {
        for (x in client)
            try {
                document.getElementById(x).value = client[x]
                var inputType = document.getElementById(x).type
                
                if(inputType.indexOf('select') > -1)
                    document.getElementById(x).disabled = true  //select input field
                else
                    document.getElementById(x).readOnly = true  // all other input fields

            } catch (error) {
                console.log('ERROR: (' + x + ') HTML tag not found on page')
            }
    })
}

 /**
 * Formats a phone input field
 * @param {*} tagId - HTML tag id to format
 */
function checkPhone(tagId) {
    var id = '#' + tagId
    // Jquery to check input
    $(id).on('input', function (e) {
        var phone = document.getElementById(tagId).value
        phone = phone.replace(/\D/g, '')    // replace all non numeric chars with nothing

        if (phone.length >= 10) {
            phone = phone.replace(/[-]/g, '')
            var tmp = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10)
            phone = tmp
        }
        console.log(phone)
        document.getElementById(tagId).value = phone
    })
}


/**
 * Formats a name input field
 * @param {*} tagId - HTML tag id to format
 */
function checkName(tagId) {
    var id = '#' + tagId
    $(id).on('input', function (e) {
        var name = document.getElementById(tagId).value
        name = name.replace(/[^A-Za-z\d\s]/g,'')  //replace all non alphanumeric chars and spaces with nothing
        document.getElementById(tagId).value = name
    })
}


/**
 * Formats an address input field
 * @param {*} tagId - HTML tag id to format
 */
function checkAddress(tagId){
    var id = '#' + tagId
    $(id).on('input', function (e){
        var address = document.getElementById(tagId).value
        address = address.replace(/[^A-Za-z\d\s\#]/g,'')    //replace all non alphanumeric chars, spaces and hash tag with nothing
        document.getElementById(tagId).value = address
    })
}


function checkZip(tagId){
    var id = '#' + tagId
    $(id).on('input', function (e){
        var zip = document.getElementById(tagId).value
        zip = zip.replace(/[^\d\s\-]/g, '')     //replace all non digit, space or dash '-' chars with nothing
        document.getElementById(tagId).value = zip
    })
}

/**
 * Search for clients and show/hide them 
 */
function userPageSearchClients(){
    var nameTags = document.getElementsByTagName('name')
    var updateTags = document.getElementsByTagName('updated')
    var tags
    var input = document.getElementById('inputNameSearch').value.toUpperCase()
    var name = ''
    var tohide = ''

    //name or update date search?
    if(input.trim().match(/^\d/))
        tags = updateTags   //starts with a digit, looking for date updated
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

function viewClient(userid){
    console.log(userid)
    $(".alert").fadeTo(100,1).delay(2000).fadeTo(500,0).slideUp(500)
}

//Need this???
// function checkSpecialCharacters(arrayToCheck){
//     arrayToCheck.forEach(element => {
//         console.log(element)
//     });
// }
