const express = require("express");
const Payment = require("../models/paymentModel");

// Store payment details
const paymentStore= async (req, res) => {
  try {
    const { paymentId, userId, courseId,teacherId } = req.body;

    if (!paymentId || !userId || !courseId || !teacherId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPayment = new Payment({
      paymentId,
      userId,
      courseId,
      teacherId,
      status: "success",
      createdAt: new Date(),
    });

    await newPayment.save();

    res.status(201).json({ message: "Payment stored successfully" });
  } catch (error) {
    console.error("Error storing payment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
const getPaymentData= async (req, res) => {
  try {
    const payment = await Payment.find();
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};
const getpaymentById = async (req, res) => {
  try {
    const { paymentId } = req.params;
console.log(paymentId)
    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      message: 'Error fetching course',
      error: error.message,
    });
  }
};

module.exports={paymentStore,getPaymentData,getpaymentById}
