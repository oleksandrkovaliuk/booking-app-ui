export interface ListingCardProps {
  id?: number;
  images: {
    url: string;
  }[];
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
  isManagable?: boolean;
  isInProccess?: boolean;
  typeOfPlace?: string;
}
