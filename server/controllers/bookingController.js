import Booking from '../models/Booking.js';
import Service from '../models/Service.js';
import User from '../models/User.js';

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service', 'title price')
      .populate('customer', 'fullName email')
      .populate('provider', 'fullName email')
      .sort({ createdAt: -1 });
    
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's bookings (as customer or provider)
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({
      $or: [{ customer: userId }, { provider: userId }]
    })
      .populate('service', 'title price')
      .populate('customer', 'fullName email')
      .populate('provider', 'fullName email')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single booking
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service', 'title price')
      .populate('customer', 'fullName email')
      .populate('provider', 'fullName email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { serviceId, providerId, scheduledDate, scheduledTime, location } = req.body;

    // Validate service and provider
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const provider = await User.findById(providerId);
    if (!provider || provider.role !== 'provider') {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    const booking = new Booking({
      service: serviceId,
      customer: req.user.id,
      provider: providerId,
      scheduledDate,
      scheduledTime,
      price: service.price,
      location
    });

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Validate status update permissions
    if (req.user.role === 'customer' && status !== 'cancelled') {
      return res.status(403).json({ message: 'Unauthorized status update' });
    }

    if (req.user.role === 'provider' && !['confirmed', 'completed'].includes(status)) {
      return res.status(403).json({ message: 'Unauthorized status update' });
    }

    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add rating and review
export const addBookingReview = async (req, res) => {
  try {
    const { score, review } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only customer can add review
    if (booking.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized to add review' });
    }

    // Can only review completed bookings
    if (booking.status !== 'completed') {
      return res.status(400).json({ message: 'Can only review completed bookings' });
    }

    booking.rating = {
      score,
      review,
      createdAt: new Date()
    };

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};