import Service from '../models/Service.js';

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const { category, status, provider } = req.query;
    const filter = {
      ...(category && { category }),
      ...(status && { status }),
      ...(provider && { provider })
    };

    const services = await Service.find(filter)
      .populate('provider', 'fullName rating completedJobs')
      .sort({ createdAt: -1 });
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by location
export const getServicesByLocation = async (req, res) => {
  try {
    const { longitude, latitude, radius = 10000 } = req.query; // radius in meters

    const services = await Service.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    }).populate('provider', 'fullName rating completedJobs');

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'fullName rating completedJobs');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service
export const createService = async (req, res) => {
  try {
    const { title, category, description, price, location, radius } = req.body;

    const service = new Service({
      title,
      category,
      description,
      price,
      provider: req.user.id,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      },
      radius
    });

    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user is the service provider
    if (service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    const { title, description, price, location, radius, status } = req.body;

    // Update fields
    if (title) service.title = title;
    if (description) service.description = description;
    if (price) service.price = price;
    if (location) {
      service.location = {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      };
    }
    if (radius) service.radius = radius;
    if (status) service.status = status;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Check if user is the service provider
    if (service.provider.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await Service.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};