import { catchAsyncError } from "../middlewares/catchAsyncError.js";

import { Document } from "../models/Document.js";
import ErrorHandler from "../utils/errorHandler.js";
export const createDocument = catchAsyncError(async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) {
      return next(new ErrorHandler("Please submit title and cotent", 400));
    }

    const document = await Document.create({
      title,
      content,
      owner: req?.user?._id,
    });
    if (!document) {
      return next(new ErrorHandler("Please submit title and cotent", 400));
    }
    res.status(200).json({
      success: true,
      document,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});
export const getDocument = catchAsyncError(async (req, res, next) => {
    try {
      
        const document = await Document.find({});
        res.status(200).json({
          success: true,
          document,
        });
      


  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});
export const updateDocument = catchAsyncError(async (req, res, next) => {
  try {
    const { documentId, content, title } = req.body;
      const document = await Document.findById(documentId);
      console.log(document.owner._id, ", ", req.user?._id);
    if (!document) {
      return next(new ErrorHandler("Please submit title and cotent", 400));
      }
    
    if (!(document.owner._id.toString() == req.user?._id.toString())) {
      return next(new ErrorHandler("Only owner can change Data", 400));
    }
    if (content) {
      document.content = content;
    }
    if (title) {
      document.title = title;
    }
    await document.save();
    res.status(200).json({
      success: true,
      document,
    });
  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});
export const deleteDocument = catchAsyncError(async (req, res, next) => {
    try {
        const document = await Document.findByIdAndDelete(req.params.id);
      if (!document) {
        return next(new ErrorHandler("Please submit title and cotent", 400));
        }
        
res.status(200).json({
  success: true,
  document,
});
       

  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});
export const anyDocument = catchAsyncError(async (req, res, next) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return next(new ErrorHandler("Document not found", 400));
        }
          res.status(200).json({
            success: true,
            document,
          });
       

  } catch (e) {
    return next(new ErrorHandler(e.message, 500));
  }
});
