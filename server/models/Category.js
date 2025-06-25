import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
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

// Update the updatedAt timestamp before saving
categorySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add any static or instance methods here
categorySchema.statics.findActive = function() {
  return this.find({ status: 'active' });
};

categorySchema.methods.activate = function() {
  this.status = 'active';
  return this.save();
};

categorySchema.methods.deactivate = function() {
  this.status = 'inactive';
  return this.save();
};

export default mongoose.model('Category', categorySchema);