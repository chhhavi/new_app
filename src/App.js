import React from "react";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import TextField from "@data-driven-forms/mui-component-mapper/text-field";
import Checkbox from "@data-driven-forms/mui-component-mapper/checkbox";
import FormTemplate from "@data-driven-forms/mui-component-mapper/form-template";
import PlainText from "@data-driven-forms/mui-component-mapper/plain-text";
import DateAdapter from '@mui/lab/AdapterMoment';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'
import { LocalizationProvider, DatePicker } from '@mui/lab';
import ComponentMapper from '@data-driven-forms/mui-component-mapper/component-mapper';
import './styles.css'

const schema = {
  fields: [
    {
        component: "plain-text",
        name: "your deets",
        label: "Your deets",
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: "name",
      validate: [{ type: validatorTypes.REQUIRED }],
      // isRequired: true,
      label: "Name"
    },
    // {
    //   component: componentTypes.TEXT_FIELD,
    //   name: "email",
    //   validate: [{ type: validatorTypes.REQUIRED }, { type: "email" }],
    //   isRequired: true,
    //   label: "Email",
    //   type: "email"
    // },
    {
      component: componentTypes.TEXT_FIELD,
      name: "zipcode",
      validate: [{ type: validatorTypes.REQUIRED }, {type: "zipcode"}],
      // isRequired: true,
      label: "Zip Code"
    },
    {
      component: componentTypes.DATE_PICKER,
      label: "Date Picker",
      name: "date-picker"
    },
  ]
};

function validateEmail(config) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (stateValue) => {
    const result = re.test(String(stateValue).toLowerCase());
    return result === false ? "This is not a valid email address!" : undefined;
  };
}

function validateZipcode(config){
  const re = /(^\d{5}$)|(^\d{5}-\d{4}$)/
  return (stateValue) => {
    const result = re.test(String(stateValue).toLowerCase());
    return result === false ? "This is not a valid zip code!" : undefined;
  };
}

const validatorMapper = {
  email: validateEmail,
  zipcode: validateZipcode
};

const DetailsForm = () => {
  return (
    <FormRenderer
      schema={schema}
      FormTemplate={FormTemplate}
      validatorMapper={validatorMapper}
      componentMapper={ComponentMapper}
      onSubmit={(values) => console.log("form values: ", values)}
    />
  );
};

function App() {
  return (
    <div className="wrapper-component">
      
      <LocalizationProvider dateAdapter={DateAdapter}>
      <ThemeProvider theme={theme}>
        <>
        <CssBaseline />
          <DetailsForm />
        </>
      </ThemeProvider>
      </LocalizationProvider>
    </div>
  );
}

export default App;
