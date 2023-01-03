import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Box from './Box/Box';
import fetchData from 'services/api';
import { Container } from './App.styled';
import { animateScroll as scroll } from 'react-scroll';

const PER_PAGE = 12;

class App extends Component {
  state = {
    searchValue: '',
    imgList: [],
    page: 1,
    status: 'idle',
    isModalShown: false,
    error: '',
  };

  totalPages = 0;
  modalImgUrl = '';
  modalImgAlt = '';

  componentDidUpdate(_, prevState) {
    const { page, searchValue } = this.state;

    if (prevState.searchValue !== searchValue || prevState.page !== page) {
      this.setState({
        status: 'pending',
      });

      fetchData(searchValue, page, PER_PAGE)
        .then(res => {
          this.totalPages = Math.ceil(res.totalHits / PER_PAGE);
          const imgList = res.hits.map(
            ({ webformatURL, largeImageURL, tags, id }) => ({
              webformatURL,
              largeImageURL,
              tags,
              id,
            })
          );
          return imgList;
        })
        .then(imgList => {
          if (page === 1) {
            this.setState({
              imgList,
              status: 'resolved',
            });
          }
          if (page > 1) {
            this.setState({
              imgList: [...prevState.imgList, ...imgList],
              status: 'resolved',
            });
            scroll.scrollMore(576);
          }
        })
        .catch(error =>
          this.setState({
            error: error.response.data,
            status: 'rejected',
          })
        );
    }
  }

  handleSubmit = values => {
    this.setState({
      searchValue: values.search,
      imgList: [],
      page: 1,
    });
  };

  getNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = e => {
    this.setState(state => ({
      isModalShown: true,
    }));

    this.modalImgUrl = e.target.dataset.url;
    this.modalImgAlt = e.target.alt;
  };

  closeModal = () => {
    this.setState(state => ({
      isModalShown: false,
    }));
  };

  render() {
    const { imgList, page, status, error } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {imgList.length > 0 && (
          <ImageGallery imgList={imgList} onClick={this.openModal} />
        )}
        {this.totalPages > 1 && this.totalPages > page && (
          <Button handleClick={this.getNextPage} />
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <>
            <Box
              width="100%"
              height="100vh"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <h1>Something went wrong, please reload this page</h1>
            </Box>
            {toast.error(error)}
          </>
        )}
        {this.state.isModalShown && (
          <Modal
            onClose={this.closeModal}
            url={this.modalImgUrl}
            tag={this.modalImgAlt}
          />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="dark"
        />
      </Container>
    );
  }
}

export default App;
