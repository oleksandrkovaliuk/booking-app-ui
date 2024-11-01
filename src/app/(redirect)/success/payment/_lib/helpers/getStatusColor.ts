export const getStatusColors = (status: string) => {
  switch (status) {
    case "Processing":
      return { secondary: "rgba(255, 165, 0, 0.3)", primary: "#ffa500" };
    case "Almost done":
      return { secondary: "rgba(173, 216, 230, 0.3)", primary: "#add8e6" };
    case "Complete":
      return { secondary: "rgba(34, 139, 34, 0.3)", primary: "#228b22" };
    default:
      return { secondary: "rgba(255, 69, 58, 0.3)", primary: "#ff453a" };
  }
};
