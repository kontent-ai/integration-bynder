import { FC } from "react";

import { BynderElementImage } from "./types/bynderImage";

type Props = Readonly<{
  images: ReadonlyArray<BynderElementImage>;
  isDisabled: boolean;
  removeImage: (imageId: string) => void;
}>;

export const SelectedImages: FC<Props> = props => (
  <div className="selected">
    {props.images.map(image => (
      <div
        key={image.id}
        className="asset-thumbnail"
      >
        <div className="asset-preview">
          <div className="asset-thumbnail__actions-pane">
            {!!image.webUrl && (
              <a
                className="asset-action"
                title="Download"
                href={image.webUrl}
                target="_blank"
                rel="noreferrer"
              >
                <i className="icon-arrow-down-line" />
              </a>
            )}
            {!props.isDisabled && (
              <button
                className="asset-action asset-action--remove"
                title="Remove"
                onClick={() => props.removeImage(image.id)}
              >
                <i className="icon-times" />
              </button>
            )}
          </div>
          {renderImage(image)}
          <div className="asset-thumbnail__bottom">{image.name}</div>
        </div>
      </div>
    ))}
  </div>
);

SelectedImages.displayName = "SelectedImages";

const renderImage = (image: BynderElementImage) =>
  image.previewUrl
    ? (
      <a
        href={image.bynderUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="asset-thumbnail__image"
          src={image.previewUrl}
          alt={image.description}
        />
      </a>
    )
    : (
      <div className="noimage">
        No image available
      </div>
    );
