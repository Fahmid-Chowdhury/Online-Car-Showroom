const path = require('path');

function upload(req, res){
    if(req.file.filename){
        res.status(201).json({
            message: "Image upload successfull",
            url: req.file.filename
        });
    }else {
        res.status(201).json({
            message: "Something went wrong"
        });
    };
};
function getimage(req, res){
    const image = req.params.filename;
    res.sendFile(path.join(__dirname, '../uploads/' + image));
}

module.exports = {
    upload: upload,
    getImage: getimage
}