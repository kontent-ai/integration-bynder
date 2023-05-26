type BynderFile = Readonly<{
  fileSize: null | number;
  height: null | number;
  width: null | number;
  url: string;
}>;

type BynderImage = Readonly<{
  id: string;
  databaseId: string;
  name: string;
  description: string;
  updatedAt: string;
  url: string;
  derivatives: Record<string, string>;
  files: Record<string, BynderFile>;
}>;

declare const BynderCompactView: Readonly<{
  open: (
    options: Readonly<{
      onSuccess?: (assets: ReadonlyArray<BynderImage>) => void;
      portal?: Readonly<{ url?: string; editable?: boolean }>;
      mode?: "MultiSelect" | "SingleSelect" | "SingleSelectFile";
      assetTypes?: ReadonlyArray<"image" | "video" | "document" | "audio">;
    }>,
  ) => void;
}>;
