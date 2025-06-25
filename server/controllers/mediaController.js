import fs from 'fs';
import path from 'path';

// Upload media file
export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const folder = req.params.folder || 'misc';
    const filePath = `media/${folder}/${req.file.filename}`;

    res.status(200).json({
      message: 'File uploaded successfully',
      url: filePath
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete media file
export const deleteMedia = async (req, res) => {
  try {
    const { folder, filename } = req.params;
    const filePath = path.join('storage/media', folder, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};