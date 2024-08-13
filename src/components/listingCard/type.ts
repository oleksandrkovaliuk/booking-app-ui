export interface ListingCardProps {
  images: string[];
  title: string;
  price: string;
  location?: {
    formattedAddress: string;
    shorterAddress: string;
  };
  guests?: number;
  allowPets?: boolean;
  accessible?: boolean;
  description?: string;
  isPreview?: boolean;
  isPublic?: boolean;
  isInProccess?: boolean;
  typeOfPlace?: string;
}
