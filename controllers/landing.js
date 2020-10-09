
const app_name="MNotes"

//Return landing page
exports.get_landing = (req, res, next) =>{
    res.render('index',{title: app_name});
};