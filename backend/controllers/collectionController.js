import { createSavedExhibit, deleteSavedExhibit, getCollectionByUserId, getExhibitById, getSavedExhibit, updateSavedExhibitNote } from "../services/collectionService.js";

// Get the authenticated user's saved exhibits
export async function getCollection(req, res) {
  try {
    const collection = await getCollectionByUserId(req.session.userId);

    return res.status(200).json({
      collection,
    });
  } catch (error) {
    console.error("Unable to get collection:", error);

    return res.status(500).json({
      message: "Unable to load your collection.",
    });
  }
}

// Save an exhibit to the authenticated user's collection
export async function saveExhibit(req, res) {
  try {
    const { exhibitId, note = null } = req.body ?? {};

    const parsedExhibitId = Number(exhibitId);

    if (!Number.isInteger(parsedExhibitId) || parsedExhibitId <= 0) {
      return res.status(400).json({
        message: "A valid exhibit ID is required.",
      });
    }

    if (note !== null && typeof note !== "string") {
      return res.status(400).json({
        message: "Note must be text.",
      });
    }

    const trimmedNote = typeof note === "string" ? note.trim() : null;

    if (trimmedNote && [...trimmedNote].length > 200) {
      return res.status(400).json({
        message: "Note must be 200 characters or fewer.",
      });
    }

    const exhibit = await getExhibitById(parsedExhibitId);

    if (!exhibit) {
      return res.status(404).json({
        message: "Exhibit not found.",
      });
    }

    const existingSavedExhibit = await getSavedExhibit(req.session.userId, parsedExhibitId);

    if (existingSavedExhibit) {
      return res.status(409).json({
        message: "This exhibit is already in your collection.",
      });
    }

    const savedExhibit = await createSavedExhibit(req.session.userId, parsedExhibitId, trimmedNote || null);

    return res.status(201).json({
      message: "Exhibit saved to your collection.",
      savedExhibit,
    });
  } catch (error) {
    console.error("Unable to save exhibit:", error);

    return res.status(500).json({
      message: "Unable to save this exhibit right now.",
    });
  }
}

// Update the note for one saved exhibit
export async function updateNote(req, res) {
  try {
    const exhibitId = Number(req.params.exhibitId);

    const { note } = req.body ?? {};

    if (!Number.isInteger(exhibitId) || exhibitId <= 0) {
      return res.status(400).json({
        message: "A valid exhibit ID is required.",
      });
    }

    if (typeof note !== "string") {
      return res.status(400).json({
        message: "Note must be text.",
      });
    }

    const trimmedNote = note.trim();

    if ([...trimmedNote].length > 200) {
      return res.status(400).json({
        message: "Note must be 200 characters or fewer.",
      });
    }

    const savedExhibit = await getSavedExhibit(req.session.userId, exhibitId);

    if (!savedExhibit) {
      return res.status(404).json({
        message: "Saved exhibit not found in your collection.",
      });
    }

    const updatedSavedExhibit = await updateSavedExhibitNote(savedExhibit, trimmedNote || null);

    return res.status(200).json({
      message: "Your note has been updated.",
      savedExhibit: updatedSavedExhibit,
    });
  } catch (error) {
    console.error("Unable to update note:", error);

    return res.status(500).json({
      message: "Unable to update your note right now.",
    });
  }
}

// Remove one exhibit from the authenticated user's collection
export async function removeExhibit(req, res) {
  try {
    const exhibitId = Number(req.params.exhibitId);

    if (!Number.isInteger(exhibitId) || exhibitId <= 0) {
      return res.status(400).json({
        message: "A valid exhibit ID is required.",
      });
    }

    const savedExhibit = await getSavedExhibit(req.session.userId, exhibitId);

    if (!savedExhibit) {
      return res.status(404).json({
        message: "Saved exhibit not found in your collection.",
      });
    }

    await deleteSavedExhibit(savedExhibit);

    return res.status(200).json({
      message: "Removed from My Collection.",
    });
  } catch (error) {
    console.error("Unable to remove exhibit:", error);

    return res.status(500).json({
      message: "Unable to remove this exhibit right now.",
    });
  }
}
