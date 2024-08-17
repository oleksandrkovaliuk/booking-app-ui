export type LoadingStatus = {
  status: boolean;
  item?: string;
};

export interface LoadingValue {
  deletingImages: LoadingStatus;
  uploadingImgs: boolean;
}
