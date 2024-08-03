const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/svg",
  "image/webp",
  "image/tiff",
  "image/ico",
  "image/apng",
  "image/jxr",
  "image/wdp",
  "image/avif",
];
export const validateImagesTypes = (images: FileList) => {
  const imagesTypes = Array.from(images).map((item) => item.type);

  return imagesTypes.every((item) => allowedTypes.includes(item));
};
