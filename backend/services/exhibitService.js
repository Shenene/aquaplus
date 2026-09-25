import Exhibit from "../models/exhibit.js";

// Retrieve all exhibits
export const getAllExhibits = async () => {
  return Exhibit.findAll({
    order: [["id", "ASC"]],
  });
};

// Retrieve one exhibit using its unique slug
export const getExhibitBySlug = async (slug) => {
  return Exhibit.findOne({
    where: { slug },
  });
};
