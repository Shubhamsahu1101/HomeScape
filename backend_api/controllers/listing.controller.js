import Listing from '../models/listing.model.js';


export const createListing = async (req, res) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const deleteListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found!' });
    }

    if (req.user.id !== listing.userRef) {
        return res.status(401).json({ message: 'You can only delete your own listings!' });
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json({});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const updateListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.status(404).json({ message: 'Listing not found!' });
    }
    if (req.user.id !== listing.userRef) {
        return res.status(401).json({ message: 'You can only update your own listings!' });
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const getUserListings = async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(401).json({ message: 'You can view only your own listings!' });
    }

    try {
        const filteredListings = await Listing.find({ userRef: req.params.id });
        res.status(200).json(filteredListings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found!' });
        }
        res.status(200).json(listing);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
