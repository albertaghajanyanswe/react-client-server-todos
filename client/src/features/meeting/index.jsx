import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import styles from './styles';
import { Box, Button, Grid, Paper } from '@mui/material';
import useForm from 'components/customUseForm/useForm';
import CustomForm from 'components/customUseForm/form';
import M from 'messages';
import {formOptions} from './config/config';
import PageTitle from 'components/pageTitle';
import { getInitialErrors } from 'helpers/helper';

const Meeting = ({ title }) => {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const submit = () => {
    console.log('values = ', values);
    console.log('errors = ', errors);
  }

  const initialValues = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  }

  const initialErrors = {}; // getInitialErrors(formOptions.inputs);
  console.log("initialErrors = ", initialErrors)
  const { values, errors, handleChange, handleSubmit } = useForm(submit, initialValues, initialErrors, formOptions.inputs, false);

  return (
    <Box component={Paper} elevation={5} p={3}>
      <PageTitle>{M.get(title)}</PageTitle>

      <form noValidate onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <CustomForm inputs={formOptions.inputs} values={values} errors={errors} handleChange={handleChange} />
          <Grid item xs={12} sm={12} md={12} lg={12} className={classes.submitContent}>
            <Button color="primary" variant="contained" fullWidth type="submit" className={classes.submit}>
              {M.get('meeting.createMeeting')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

Meeting.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Meeting;
