<template>
  <div
    class="TextInput input-group"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
  >
    <span class="input-group-text" id="basic-addon1"
      ><font-awesome-icon :icon="icon"
    /></span>
    <input
      :name="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      aria-describedby="basic-addon1"
      class="form-control"
    />
  </div>
  <p
    class="help-message"
    :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    v-show="errorMessage || meta.valid"
  >
    {{ errorMessage || successMessage }}
  </p>
</template>

<script>
import { useField } from "vee-validate";

export default {
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ""
    },
    successMessage: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta
    } = useField(props.name, undefined, {
      initialValue: props.value
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta
    };
  }
};
</script>

<style scoped>
.TextInput {
  position: relative;
  margin-bottom: 1.5vh;
  width: 100%;
}

.TextInput.has-error,
.TextInput.success {
  margin-bottom: 0;
}

input:focus {
  border-color: var(--primary-color);
  background-color: white;
  border-radius: 0.25rem;
}

.help-message {
  bottom: calc(-1.5 * 1em);
  left: 0;
  margin: 0;
}

.TextInput.has-error input {
  background-color: var(--error-bg-color);
  color: var(--error-color);
}

.TextInput.has-error input:focus {
  border-color: var(--error-color);
}

.TextInput.has-error,
.help-message.has-error {
  color: var(--error-color);
  font-size: 1.5vh;
}

.TextInput.success input {
  background-color: var(--success-bg-color);
  color: var(--success-color);
}

.TextInput.success input:focus {
  border-color: var(--success-color);
}

.TextInput.success .help-message,
.help-message.success {
  color: var(--success-color);
}
</style>
