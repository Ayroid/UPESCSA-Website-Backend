// IMPORTING MODULES
import multer from "multer";
import path from "path";

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "blogImg":
        cb(null, "public/images/blogs");
        break;
      case "allianceImg":
        cb(null, "public/images/alliance");
        break;
      case "eventImg":
        cb(null, "public/images/events");
        break;
      case "csrImg":
        cb(null, "public/images/csr");
        break;
      default:
        cb(null, "public/images/others");
        break;
    }
  },
  filename: (req, file, cb) => {
    switch (file.fieldname) {
      case "blogImg":
        cb(null, `${req.body.blogTitle}${path.extname(file.originalname)}`);
        break;
      case "allianceImg":
        cb(null, `${req.body.allianceName}${path.extname(file.originalname)}`);
        break;
      case "eventImg":
        cb(null, `${req.body.eventName}${path.extname(file.originalname)}`);
        break;
      case "csrImg":
        cb(null, `${req.body.csrYear}${path.extname(file.originalname)}`);
        break;
      default:
        cb(null, `${req.body.fileName}${path.extname(file.originalname)}`);
        break;
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// MULTER UPLOAD
const upload = multer({ storage });

// EXPORTING FUNCTIONS
export { upload as UPLOAD };
