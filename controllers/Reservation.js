import Reservation from '../models/Reservation.js';
import User from '../models/user.js';
import qrCode from 'qrcode';
import nodemailer from 'nodemailer';
// Create a new reservation
const createReservation = async (req, res) => {
    try {
        const newReservation = new Reservation(req.body);
        console.log("Adding reserv options part is done")
        const saved = await newReservation.save();

        const qrCodeData = JSON.stringify(saved);
        const qrCodeBuffer = await qrCode.toBuffer(qrCodeData);

        const user = await User.findById(saved.userId);
        const userEmail = user.email; // Assuming email is stored in user.email
        //drqy exoi vhzh mpbu
        //epicfunmaker@gmail.com
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amrin0865@gmail.com',
                pass: 'yijxnjymlnixmjew'
            }
        });
        console.log("Transporter options part is done");
        const mailOptions = {
            from: 'amrin0865@gmail.com',
            to: userEmail,
            subject: 'Reservation QR Code',
            text: 'Le code QR de votre réservation est joint ci-dessous. Bonne voyage.',
            attachments: [{
                filename: 'reservation_qr_code.png',
                content: qrCodeBuffer,
                encoding: 'base64'
            }]
        };
        console.log("Mail options part is done");
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        console.log("Transfert options part is done");
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a new reservation' });
    }
};

// Get a list of all reservations
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

// Get a single reservation by ID
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reservation' });
    }
};

// Update a reservation by ID
const updateReservation = async (req, res) => {
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reservation' });
    }
};

// Delete a reservation by ID
const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deletedReservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
};

export {
    createReservation,
    getAllReservations,
    getReservationById,
    updateReservation,
    deleteReservation,
};
