// ANIMATIONS
export const appearAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
export const deepAppearAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export const motion_transition = { duration: 0.4, ease: "easeOut" };
export const sloverTransition = { ...motion_transition, duration: 0.6 };

// MAP OPATIONS/STYLES
export const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  outline: "none",
};

export const options = {
  gestureHandling: "greedy",
  scrollwheel: true,
  draggable: true,
  fullscreenControl: false,
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: true,
};

// ACCEPT FILES TYPE

export const imageTypes = [
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
