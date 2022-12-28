import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  Button,
  ButtonLabel,
  SearchInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  function handlSubmit(values, actions) {
    if (values.search.trim() === '') {
      toast.info('Please, enter your request');
      return;
    }
    onSubmit(values);
    // actions.resetForm();
  }

  return (
    <Header>
      <Formik initialValues={{ search: '' }} onSubmit={handlSubmit}>
        <SearchForm>
          <Button type="submit">
            <ButtonLabel>Search</ButtonLabel>
          </Button>

          <SearchInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
