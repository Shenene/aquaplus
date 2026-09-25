import * as exhibitService from "../services/exhibitService.js";

// GET  /api/exhibits
export const getExhibits = async (req, res) => {
  try {
    const exhibits = await exhibitService.getAllExhibits();

    res.status(200).json(exhibits);
  } catch (error) {
    console.error("Unable to retrieve exhibits:", error.message);

    res.status(500).json({
      message: "Unable to retrieve exhibits",
    });
  }
};

// GET /api/exhibits/:slug
export const getExhibitBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const exhibit = await exhibitService.getExhibitBySlug(slug);

    if (!exhibit) {
      return res.status(404).json({
        message: "Exhibit not found",
      });
    }

    res.status(200).json(exhibit);
  } catch (error) {
    console.error("Unable to retrieve exhibit:", error.message);

    res.status(500).json({
      message: "Unable to retrieve exhibit",
    });
  }
};
