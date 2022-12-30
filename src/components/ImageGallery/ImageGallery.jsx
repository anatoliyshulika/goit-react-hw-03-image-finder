import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ imgList, onClick }) {
  return (
    <Gallery onClick={onClick}>
      {imgList.map(({ webformatURL, largeImageURL, tags, id }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  imgList: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
