import React, { memo } from 'react';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

import CustomFormItem from '../formItem';

const CustomForm = ({ inputs, values, errors, handleChange }) => {
  return (
    <>
      {inputs.map((input) => (
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CustomFormItem key={input.id} input={input} values={values} errors={errors} handleChange={handleChange} />
        </Grid>

      ))}
    </>
  );
};

export default memo(CustomForm);

CustomForm.propTypes = {
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      variant: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  values: PropTypes.shape({
    // TODO
  }).isRequired,
  errors: PropTypes.shape({
    // TODO
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

CustomFormItem.defaultProps = {
  inputs: [],
};
