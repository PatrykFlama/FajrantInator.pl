const multer = require('multer');
const fs = require('fs');

const path = __dirname + '/../database/uploads';
const max_image_size = 1024 * 1024 * 5; // 5MB

// const upload = multer({ dest: path });
const images_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(path+'/images', { recursive: true });
        cb(null, path+'/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const images_upload = multer({ 
    storage: images_storage, 
    fileFilter: function (req, file, callback) {
        var ext = file.originalname.split('.')[file.originalname.split('.').length -1];
        if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
    limits:{
        fileSize: max_image_size
    }
});

module.exports = { images_upload };