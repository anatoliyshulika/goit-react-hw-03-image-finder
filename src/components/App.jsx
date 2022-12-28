import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

class App extends Component {
  state = {
    searchValue: '',
  };

  handleSubmit = values => {
    this.setState({
      searchValue: values.search,
    });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery searchValue={this.state.searchValue} />
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
