import React from "react";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import componentTypes from "@data-driven-forms/react-form-renderer/component-types";
import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";
import TextField from "@data-driven-forms/mui-component-mapper/text-field";
import Checkbox from "@data-driven-forms/mui-component-mapper/checkbox";
import FormTemplate from "@data-driven-forms/mui-component-mapper/form-template";
import PlainText from "@data-driven-forms/mui-component-mapper/plain-text";
import DatePicker from "@data-driven-forms/mui-component-mapper/date-picker";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.DATE_PICKER]: DatePicker,
};

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
      isRequired: true,
      label: "Name"
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: "email",
      validate: [{ type: validatorTypes.REQUIRED }, { type: "email" }],
      isRequired: true,
      label: "Email",
      type: "email"
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

const validatorMapper = {
  email: validateEmail
};

const DetailsForm = () => {
  return (
    <FormRenderer
      schema={schema}
      FormTemplate={FormTemplate}
      validatorMapper={validatorMapper}
      componentMapper={componentMapper}
      onSubmit={(values) => console.log("form values: ", values)}
    />
  );
};

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
      <DetailsForm />
    </div>
  );
}

export default App;
