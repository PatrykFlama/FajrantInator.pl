const multer = require('multer');
const fs = require('fs');

const path = __dirname + '/../database/uploads';

const max_file_size = 1024 * 1024 * 5; // 5MB
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.fieldname === 'thumbnailFile') {
            fs.mkdirSync(path+'/images', { recursive: true });
            cb(null, path+'/images');
        } else if(file.fieldname === 'solutionFile') {
            fs.mkdirSync(path+'/files', { recursive: true });
            cb(null, path+'/files');
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'thumbnailFile') {
            cb(null, Date.now() + '-' + file.originalname);
        } else if(file.fieldname === 'solutionFile') {
            cb(null, Date.now() + '-' + file.originalname + '.zip');
        }
    }
});
const upload = multer({ 
    storage: storage, 
    fileFilter: function (req, file, callback) {
        if (file.fieldname === 'thumbnailFile') {
            var ext = file.originalname.split('.')[file.originalname.split('.').length -1];
            if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
                return callback(new Error('Only images are allowed'));
            }
            callback(null, true);
        } else if(file.fieldname === 'solutionFile') {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    limits:{
        fileSize: max_file_size
    }
}).fields([
    { name: 'thumbnailFile', maxCount: 1 },
    { name: 'solutionFile', maxCount: 1 }
]);

module.exports = { upload };