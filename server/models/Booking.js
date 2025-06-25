import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    address: String,
    coordinates: {
      type: [Number],
      required: true
    }
  },
  rating: {
    score: {
      type: Number,
      min: 1,
      max: 5
    },
    review: String,
    createdAt: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add instance methods
bookingSchema.methods.canBeUpdatedBy = function(userId) {
  return this.customer.toString() === userId || this.provider.toString() === userId;
};

bookingSchema.methods.canBeCancelledBy = function(userId) {
  return this.customer.toString() === userId && this.status === 'pending';
};

export default mongoose.model('Booking', bookingSchema);