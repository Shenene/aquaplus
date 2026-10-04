import Exhibit from "../models/exhibit.js";
import SavedExhibit from "../models/savedExhibit.js";

// Get all exhibits saved by one authenticated user
export async function getCollectionByUserId(userId) {
  return SavedExhibit.findAll({
    where: {
      userId,
    },
    attributes: ["id", "exhibitId", "note", "createdAt", "updatedAt"],
    include: [
      {
        model: Exhibit,
        as: "exhibit",
        attributes: ["id", "slug", "name", "category", "summary", "imageUrl", "mobileImageUrl"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
}

// Find one saved exhibit belonging to one user
export async function getSavedExhibit(userId, exhibitId) {
  return SavedExhibit.findOne({
    where: {
      userId,
      exhibitId,
    },
  });
}

// Check that the exhibit itself exists
export async function getExhibitById(exhibitId) {
  return Exhibit.findByPk(exhibitId);
}

// Save an exhibit to a user's collection
export async function createSavedExhibit(userId, exhibitId, note) {
  return SavedExhibit.create({
    userId,
    exhibitId,
    note,
  });
}

// Update the note for a saved exhibit
export async function updateSavedExhibitNote(savedExhibit, note) {
  savedExhibit.note = note;

  await savedExhibit.save();

  return savedExhibit;
}

// Remove an exhibit from a user's collection
export async function deleteSavedExhibit(savedExhibit) {
  await savedExhibit.destroy();
}
