import {mappings,interviewCovers} from "./constant"

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

// Adjust the normalize function to handle .js properly
const normalizeTechName = (tech) => {
  // Remove `.js` if present and normalize the name (e.g., 'react.js' -> 'react')
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key] || key;  // Return the key from mappings, or the original if not found
};

const checkIconExists = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${techIconBaseURL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "/tech.svg", // Fallback to a generic icon if it doesn't exist
    }))
  );

  return results;
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};
