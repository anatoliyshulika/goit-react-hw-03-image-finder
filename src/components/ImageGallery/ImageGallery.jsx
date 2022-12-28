import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import Box from 'components/Box/Box';
import fetchData from 'services/api';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

const PER_PAGE = 20;

export default class ImageGallery extends Component {
  state = {
    imgList: [],
    page: 1,
    totalPages: 0,
    error: null,
    status: 'idle',
    isModalShown: false,
    url: '',
    tag: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { searchValue } = this.props;

    if (prevProps.searchValue !== searchValue) {
      this.setState({
        imgList: [],
        page: 1,
        totalPages: 0,
        status: 'pending',
      });

      fetchData(searchValue, page, PER_PAGE)
        .then(res => {
          if (res.hits.length < 1) {
            toast.info('Nothing was found according to your request');
            this.setState({
              status: 'resolved',
            });
          }
          this.setState({
            imgList: res.hits,
            totalPages: Math.ceil(res.totalHits / PER_PAGE),
            status: 'resolved',
          });
          window.scrollTo({
            top: 0,
          });
        })
        .catch(error =>
          this.setState({ error: error.response.data, status: 'rejected' })
        );
    }

    if (
      prevState.page !== page &&
      prevProps.searchValue === searchValue &&
      page > 1
    ) {
      this.setState({
        status: 'pending',
      });

      fetchData(searchValue, page, PER_PAGE)
        .then(res => {
          this.setState({
            imgList: [...prevState.imgList, ...res.hits],
            status: 'resolved',
          });
          window.scrollBy({
            top: 576,
            behavior: 'smooth',
          });
        })
        .catch(error =>
          this.setState({ error: error.response.data, status: 'rejected' })
        );
    }
  }

  getNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = e => {
    this.setState(state => ({
      isModalShown: true,
      url: e.target.dataset.url,
      tag: e.target.alt,
      status: 'pending',
    }));
  };

  closeModal = () => {
    this.setState(state => ({
      isModalShown: false,
    }));
  };

  closeLoader = () => {
    this.setState(state => ({
      status: 'idle',
    }));
  };

  render() {
    const { imgList, status, totalPages, page, url, tag } = this.state;

    if (status === 'rejected') {
      return (
        <Box
          width="100%"
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {toast.error(this.state.error)}
          <h1>Something went wrong, please reload this page</h1>
        </Box>
      );
    }

    return (
      <>
        <Gallery onClick={this.openModal}>
          {imgList.map(({ webformatURL, largeImageURL, tags, id }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </Gallery>
        {totalPages > 1 && totalPages > page && (
          <Button handleClick={this.getNextPage} />
        )}
        {status === 'pending' && <Loader />}
        {this.state.isModalShown && (
          <Modal
            onClose={this.closeModal}
            onCloseLoader={this.closeLoader}
            url={url}
            tag={tag}
          />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
