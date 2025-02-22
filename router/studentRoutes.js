const express = require("express");
const router = express.Router();
const {addStudentData,getStudentData, getStudentId, changeStatus, declineStudent}= require("../controllers/studentControllers")
const { addFavorite, removeFavorite, getFavorites, getallFavorite }=require("../controllers/favoriteControllers")
const multer = require('multer');
const { paymentStore, getPaymentData }= require("../controllers/paymentControllers")
const upload = multer({ storage: multer.memoryStorage() }); 
router.post(
  '/add-student',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'identityProof', maxCount: 1 },
  ]),
  addStudentData
);
router.get("/get-student",getStudentData)

router.get("/student-details/:id",getStudentId)
router.put("/update-student/:id",changeStatus)
router.delete("/delete-student/:id",declineStudent)
router.post("/add-favorite",addFavorite)
router.post('/remove-favorite',removeFavorite)
router.get('/get-favorites',  getFavorites);
router.get("/get-all-favorites",getallFavorite)
router.post("/store-payment",paymentStore)
router.get("/get-payments",getPaymentData)
router.get("/get-paymentbyid/:id",getPaymentData)



module.exports=router