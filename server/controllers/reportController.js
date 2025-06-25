import Report from '../models/Report.js';

// Get all reports (admin only)
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate('reportedBy', 'fullName email')
      .populate('reportedUser', 'fullName email')
      .populate('booking', 'service scheduledDate')
      .sort({ createdAt: -1 });
    
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's reports
export const getUserReports = async (req, res) => {
  try {
    const reports = await Report.find({ reportedBy: req.user.id })
      .populate('reportedUser', 'fullName email')
      .populate('booking', 'service scheduledDate')
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single report
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id)
      .populate('reportedBy', 'fullName email')
      .populate('reportedUser', 'fullName email')
      .populate('booking', 'service scheduledDate');

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Check if user has permission to view the report
    if (req.user.role !== 'admin' && report.reportedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this report' });
    }

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create report
export const createReport = async (req, res) => {
  try {
    const { title, type, description, reportedUser, booking, priority } = req.body;

    const report = new Report({
      title,
      type,
      description,
      reportedBy: req.user.id,
      reportedUser,
      booking,
      priority
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update report status (admin only)
export const updateReportStatus = async (req, res) => {
  try {
    const { status, resolution } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    report.status = status;
    if (resolution) {
      report.resolution = {
        note: resolution,
        resolvedBy: req.user.id,
        resolvedAt: new Date()
      };
    }

    const updatedReport = await report.save();
    res.json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete report (admin only)
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    await Report.deleteOne({ _id: req.params.id });
    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};