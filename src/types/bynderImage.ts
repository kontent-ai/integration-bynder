export type BynderElementImage =
  & Omit<BynderImage, "url" | "derivatives">
  & Readonly<{
    bynderUrl: string;
    previewUrl: string | undefined;
    webUrl: string | undefined;
  }>;
