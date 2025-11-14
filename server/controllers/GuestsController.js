import Guests from "../models/Guests.js";
import multer from "multer";

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const addGuests = async (req, res) => {
  try {
    const { guestName, birthDate, fatherName, motherName, idCardNumber, phoneNumber, roomNumber } = req.body;

    if (!guestName || !birthDate || !fatherName || !motherName || !idCardNumber || !phoneNumber || !roomNumber) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    let photoPath = "";
    if (req.file) {
      photoPath = `/uploads/${req.file.filename}`; 
    }

    const newGuest = new Guests({
      guestName,
      birthDate,
      fatherName,
      motherName,
      idCardNumber,
      phoneNumber,
      roomNumber,
      photo: photoPath,
    });

    await newGuest.save();

    res.status(201).json({ message: "Bébé ajouté avec succès!", guest: newGuest });
  } catch (error) {
    console.error("Erreur lors de l'ajout du bébé:", error);
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};

const getGuests = async (req, res) => {
  try {
    const guests = await Guests.find();
    return res.status(200).json(guests);
  } catch (error) {
    console.error("Erreur lors de la récupération des bébés:", error);
    return res.status(500).json({ error: "Erreur serveur lors de la récupération des bébés." });
  }
};

const getGuestByRoom = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const guest = await Guests.findOne({ roomNumber });

    if (!guest) {
      return res.status(404).json({ message: "Bébé non trouvé." });
    }

    res.status(200).json(guest);
  } catch (error) {
    console.error("Erreur lors de la récupération du hote:", error);
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};

// Function to handle guest photo upload
const uploadGuestPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier téléchargé." });
  }

  try {
    const updatedGuest = await Guests.findOneAndUpdate(
      { roomNumber: req.params.roomNumber },
      { photo: `/uploads/${req.file.filename}` }, 
      { new: true }
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Bébé non trouvé." });
    }

    res.status(200).json(updatedGuest);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la photo du bébé:", error);
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};

// Function to handle guest deletion
const deleteGuest = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const deletedGuest = await Guests.findOneAndDelete({ roomNumber });

    if (!deletedGuest) {
      return res.status(404).json({ message: "Bébé non trouvé." });
    }

    res.status(200).json({ message: "Bébé supprimé avec succès!" });
  } catch (error) {
    console.error("Erreur lors de la suppression du bébé:", error);
    res.status(500).json({ message: "Erreur serveur. Veuillez réessayer plus tard." });
  }
};

export { addGuests, getGuests, getGuestByRoom, uploadGuestPhoto, deleteGuest, upload };
