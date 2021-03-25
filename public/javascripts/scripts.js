/**
 * File: scripts.js
 * Type: Javascripts
 * Description: generic app scripts
 */

/**
 * Adds/initializes fields for a new note on the newNote.pug view. 
 * Selectize options are hardcoded here for now, but need to moved to 
 * a config/data file. 
 */
function addNewNoteOptions() {

    document.getElementById('date').valueAsDate = new Date(); //set date input to current

    //- **** Use below code for selectize input field. Currently using datalist **** -//
    //- const icd10_data = !{JSON.stringify(icd10Data)}     //passed to Pug file. Will need to pass to this function if used
    //- var diagnosisOpts =[]
    //- for(var i in icd10_data){
    //-   var tmp = {
    //-     value: icd10_data[i].Description + " - " + icd10_data[i].Code
    //-   }
    //-   diagnosisOpts.push(tmp)
    //- }
    //- addSelectizeInput('diagnosis',diagnosisOpts)

    var interventionsOpts = [
        { value: 'Insight-Oriented' },
        { value: 'Supportive' },
        { value: 'CBT' },
        { value: 'Crisis Intervention/Trauma work' },
        { value: 'Grief workEnergy Psychology: EFT/tapping' },
        { value: 'Grief workEnergy Psychology: Biofield and chakra treatments' },
        { value: 'Grief workEnergy Psychology: Energy corrections' },
        { value: 'Mindfulness techniques: Deep breathing' },
        { value: 'Mindfulness techniques: Guided meditations' },
        { value: 'Mindfulness techniques: Progressive muscle relaxation' },
        { value: 'Mindfulness techniques: Staying present' },
        { value: 'Mindfulness techniques: Use of loving-kindness towards self/others' },
        { value: 'Hypnosis' },
    ]
    addSelectizeInput('interventions', interventionsOpts)

    var shideationOpts = [
        { value: 'None' },
        { value: 'Fleeting' },
        { value: 'Plan/Intent-YES' },
        { value: 'Plan/Intent-NO' },
        { value: 'Contracts for Safety-YES' },
        { value: 'Contracts for Safety-NO' },
    ]
    addSelectizeInput('shideation', shideationOpts)

    var eyecontactOpts = [
        { value: 'WNR' },
        { value: 'Minimal' },
        { value: 'Poor' },
    ]
    addSelectizeInput('eyecontact', eyecontactOpts)

    var jugdmentOpts = [
        { value: 'Poor' },
        { value: 'Fair' },
        { value: 'Good' },
        { value: 'Excellent' },
    ]
    addSelectizeInput('judgment', jugdmentOpts)

    var insightOpts = [
        { value: 'Poor' },
        { value: 'Fair' },
        { value: 'Good' },
        { value: 'Excellent' },
    ]
    addSelectizeInput('insight', insightOpts)

    var speechOpt = [
        { value: 'Soft' },
        { value: 'Loud' },
        { value: 'Rapid' },
        { value: 'Expressive' },
        { value: 'Stilted' },
        { value: 'Poverty' },
        { value: 'These are normal for client' },
    ]
    addSelectizeInput('speech', speechOpt)

    var affectOpt = [
        { value: 'WNR' },
        { value: 'Full' },
        { value: 'Appropriate' },
        { value: 'Inappropriate' },
        { value: 'Smiling' },
        { value: 'Laughter' },
        { value: 'Congruent With Mood' },
        { value: 'Restricted' },
        { value: 'Flat' },
        { value: 'Tearful' },
        { value: 'Dramatic' },
    ]
    addSelectizeInput('affect', affectOpt)

    var moodOpt = [
        { value: 'WNR' },
        { value: 'Bright' },
        { value: 'Anxious' },
        { value: 'Tense' },
        { value: 'Panicky' },
        { value: 'Sad' },
        { value: 'Sullen' },
        { value: 'Depressed' },
        { value: 'Despondent' },
        { value: 'Dysphoric' },
        { value: 'Angry' },
        { value: 'Euphoric' },
        { value: 'Expansive' },
    ]
    addSelectizeInput('mood', moodOpt)

    var psychomotorOpts = [
        { value: 'WNR' },
        { value: 'Lethargic' },
        { value: 'Agitated' },
    ]
    addSelectizeInput('psychomotor', psychomotorOpts)

    var appearanceOpts = [
        { value: 'Well Groomed' },
        { value: 'Adequate' },
        { value: 'Inadequate' },
    ]
    addSelectizeInput('appearance', appearanceOpts)

    var thoughtsOpts = [
        { value: 'Organized' },
        { value: 'Circumstantial' },
        { value: 'Tangential' },
        { value: 'Disorganized' },
        { value: 'Illogical' },
        { value: 'Paranoid' },
    ]
    addSelectizeInput('thoughts', thoughtsOpts)
}


/**
 * Adds selectize multi selectable tags/text to text input field
 * @param {*} tagid - html tag id 
 * @param {*} opts  - selectize options/values 
 */
function addSelectizeInput(tagid, opts) {
    $('#' + tagid).selectize({
        plugins: ['remove_button'],
        options: opts,
        labelField: 'value',
        placeholder: 'Select from list or type your own description...',
        delimiter: ',',
        persist: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    });
}
 

function formatDate(tagid, dateTime, dateTimeFormat){
    $(document).ready(function() {
        document.getElementById(tagid).innerText = moment(dateTime).format(dateTimeFormat)
    })
}

/**
 * Add client info to client form
 * @param {JSON} client - client JSON string
 * @param {boolean} trueOrFalse - disable input?
 */
function addClientToForm(client, trueOrFalse) {
    
    $(document).ready(function () {
        for (x in client){
            try {
                var element = document.getElementById(x)
                if(x == 'id'){
                    element.innerText = 'ID: ' + client[x]
                    continue
                }
                else if(x == 'dt_created'){
                    var dt = 'Created: ' + moment(client.dt_created).format('MM/DD/YYYY')
                    element.innerText = dt.trim()
                    continue
                }
                else if(x == 'dt_updated'){
                    var dt = 'Last Update: ' + moment(client.dt_updated).format('MM/DD/YYYY')
                    element.innerText = dt.trim()
                    continue
                }

                var inputType = element.type
                element.value = client[x]
                
                //If disabling inputs, do this too
                if(trueOrFalse && inputType.indexOf('select') < 0){
                    element.innerText = client[x]
                    element.placeholder = ''
                }

                if(inputType.indexOf('select') > -1){
                    element.disabled = trueOrFalse  //select input field
                    
                    //If on default select value and disabling, replace text
                    if(element.options['selectedIndex'] == 0 && trueOrFalse){
                        element.options[element.options['selectedIndex']].innerText = ""
                    }
                }
                else
                    element.readOnly = trueOrFalse  // all other input fields
                
            } catch (error) {
                console.log('addClientToForm(): \'' + x + '\' ' + error)
            }
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
