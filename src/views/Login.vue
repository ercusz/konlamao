<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card px-4 py-5 text-white bg-dark">
          <span class="circle bg-danger bg-gradient"
            ><font-awesome-icon :icon="['fas', 'check']" style="color: white"
          /></span>
          <h5 class="mt-3">
            ลงชื่อเข้าใช้
          </h5>
          <small class="mt-2 text-muted"
            >โต๊ะมีจำนวนจำกัด อย่ารอช้า รีบเข้าไปจองเลยสิ!</small
          >

          <Form @submit="onSubmit" :validation-schema="schema">
            <TextInput
              name="email"
              type="email"
              icon="envelope"
              placeholder="Email"
            />

            <TextInput
              name="password"
              type="password"
              icon="lock"
              placeholder="Password"
            />


            <button
              type="submit"
              class="btn btn-dark mt-3 mb-5 bg-danger"
              style="width:100%;"
            >
              เข้าสู่ระบบ
            </button>
          </Form>

          <div class="text-center mt-3">
            <span>ยังไม่มีบัญชี? </span>
            <router-link
              to="/register"
              active-link="active"
              class="fw-bold text-decoration-none text-danger text-gradient"
              >สมัครสมาชิก
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { Form } from "vee-validate";
import * as Yup from "yup";
import TextInput from "../components/TextInput.vue";

export default {
  name: "App",
  components: {
    TextInput,
    Form
  },
  setup() {
    // Using yup to generate a validation schema
    // https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required()
    });

    return {
      schema
    };
  },
  methods: {
    onSubmit(schema) {
      firebase
        .auth()
        .signInWithEmailAndPassword(schema.email, schema.password)
        .then(() => {
          alert("Successfully logged in");
          this.$router.push("/");
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style>
.input-group {
  border-radius: 0.25rem;
}
</style>
