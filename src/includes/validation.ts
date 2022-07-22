import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces,
  email,
  confirmed,
} from '@vee-validate/rules';

interface stringIndex {
  [index: string]: string;
}

export default {
  // configure custom plugin
  install(app: any) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alpha_spaces', alpha_spaces);
    defineRule('email', email);
    defineRule('password_mismatch', confirmed);

    configure({
      generateMessage(ctx) {
        const messages: stringIndex = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short`,
          max: `The field ${ctx.field} is too long`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces`,
          email: `The field ${ctx.field} must be a valid email`,
          password_mismatch: `The password don't match`,
          invalid: `The field ${ctx.field} is invalid`,
        };

        const message: string = messages[ctx.rule ? ctx.rule.name : 'invalid'];

        return message;
      },

      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false /* very aggresive */,
      validateOnModelUpdate: true,
    });
  },
};
