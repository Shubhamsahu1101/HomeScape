import express from 'express';
import { createListing, updateListing, deleteListing, getUserListings, getListing, getAllListings } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);

router.post('/update/:id', verifyToken, updateListing);

router.delete('/delete/:id', verifyToken, deleteListing);

router.get('/user-listings/:id', verifyToken, getUserListings);

router.get('/get/:id', getListing);

router.get('/all', getAllListings);

export default router;