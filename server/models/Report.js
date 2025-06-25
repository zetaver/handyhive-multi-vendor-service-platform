import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['quality', 'payment', 'behavior', 'other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  resolution: {
    note: String,
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    resolvedAt: Date
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
reportSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add instance methods
reportSchema.methods.isResolvedBy = function(userId) {
  return this.resolution && this.resolution.resolvedBy.toString() === userId;
};

reportSchema.methods.canBeViewedBy = function(userId, userRole) {
  return userRole === 'admin' || this.reportedBy.toString() === userId;
};

export default mongoose.model('Report', reportSchema);