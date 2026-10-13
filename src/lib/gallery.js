/** Cover first, then gallery screenshots, without duplicates. */
export const gallerySlides = (project) =>
  [project.cover, ...project.gallery].filter((img, i, all) => img && all.indexOf(img) === i);
