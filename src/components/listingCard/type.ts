export interface ListingCardProps {
  images: string[];
  title: string;
  price: string;
  location?: string;
  guests?: number;
  allowPets?: boolean;
  accessible?: boolean;
  description?: string;
  isPreview?: boolean;
  isInProccess?: boolean;
  typeOfPlace?: string;
}
