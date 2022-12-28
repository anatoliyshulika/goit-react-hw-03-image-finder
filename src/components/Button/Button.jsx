import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export default function Button({ handleClick }) {
  return (
    <LoadMoreButton type="button" onClick={handleClick}>
      Load more
    </LoadMoreButton>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
