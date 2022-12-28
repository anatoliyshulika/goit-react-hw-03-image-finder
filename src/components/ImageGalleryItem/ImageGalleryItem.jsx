import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
}) {
  return (
    <GalleryItem>
      <GalleryItemImage
        src={webformatURL}
        alt={tags}
        data-url={largeImageURL}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
