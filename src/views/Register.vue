<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-7">
        <div class="card px-4 py-5 text-white bg-dark">
          <span class="circle bg-danger bg-gradient"
            ><font-awesome-icon :icon="['fas', 'check']" style="color: white"
          /></span>
          <h5 class="mt-3">
            ขี้เมามากกว่า 10,000 คน<br />
            จากทั่วทั้งมหาลัยฯ ได้เข้าร่วมแล้ว
          </h5>
          <small class="mt-2 text-muted"
            >แล้วคุณล่ะรออะไรอยู่? เข้าร่วมกับเรา แล้วเมาไปด้วยกันสิ!</small
          >

          <Form @submit="onSubmit" :validation-schema="schema">
            <TextInput
              name="username"
              type="text"
              icon="user"
              placeholder="Username"
              success-message="ชื่อนี้ดูเหมาะกับคุณดีนะ!"
            />

            <TextInput
              name="email"
              type="email"
              icon="envelope"
              placeholder="Email"
              success-message="เป็นอีเมล์ที่ดีนะ.. ไม่ต้องห่วงว่าเราจะส่งอีเมล์ขยะไปให้คุณ"
            />

            <TextInput
              name="password"
              type="password"
              icon="lock"
              placeholder="Password"
              success-message="เป็นรหัสผ่านที่ยอดเยี่ยม!"
            />

            <TextInput
              name="confirmpassword"
              type="password"
              icon="lock"
              placeholder="Confirm Password"
              success-message="หวังว่าคุณจะจำรหัสผ่านนี้ได้นะ"
            />

            <TextInput
              name="date"
              type="date"
              icon="calendar-alt"
              placeholder="Date of Birth"
              class="mb-5"
            />

            <div class="form-check mb-3">
              <Field
                name="terms"
                class="form-check-input bg-danger"
                type="checkbox"
                id="flexCheckChecked"
                value="false"
              />

              <label class="form-check-label bt-3" for="flexCheckChecked">
                ฉันยอมรับ<a
                  class="fw-bold text-decoration-none text-danger text-gradient"
                  data-bs-toggle="modal"
                  data-bs-target="#TermOfUseModal"
                  >ข้อตกลงในการใช้งาน</a
                >
              </label>
            </div>
            <Error-Message
              class="text-danger"
              name="terms"
              style="font-size: 14px;"
            ></Error-Message>

            <button
              type="submit"
              class="btn btn-dark mt-3 bg-danger"
              style="width:100%; height:5vh;"
            >
              สมัครสมาชิก
            </button>
          </Form>

          <div class="text-center mt-4">
            <span>เป็นสมาชิกอยู่แล้ว? </span>
            <router-link
              to="/login"
              active-link="active"
              class="fw-bold text-decoration-none text-danger text-gradient"
              >เข้าสู่ระบบ
            </router-link>
          </div>

          <!-- Modal -->
          <div
            class="modal fade"
            id="TermOfUseModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-dark" id="staticBackdropLabel">
                    ข้อตกลงในการใช้งาน
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-dark">
                  คนละเมา.com จัดทำขึ้นเพื่อการศึกษาเท่านั้น
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary bg-dark text-light"
                    data-bs-dismiss="modal"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";
import TextInput from "../components/TextInput.vue";

export default {
  name: "App",
  components: {
    TextInput,
    Form,
    Field,
    ErrorMessage
  },
  setup() {
    // Using yup to generate a validation schema
    // https://vee-validate.logaretm.com/v4/guide/validation#validation-schemas-with-yup
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(8)
        .required(),
      confirmpassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน"),
      date: Yup.date()
        .required()
        .nullable()
        .typeError("กรุณากรอกวันเกิด")
        .test("age", "อายุคุณยังไม่ถึงเกณฑ์ขั้นต่ำ", function(birthdate) {
          const cutoff = new Date();
          cutoff.setFullYear(cutoff.getFullYear() - 20);
          return birthdate <= cutoff;
        }),
      terms: Yup.string().required("กรุณาอ่านและยอมรับข้อตกลงในการใช้งาน")
    });

    return {
      schema
    };
  },
  methods: {
    onSubmit(schema) {

      firebase
        .auth()
        .createUserWithEmailAndPassword(schema.email, schema.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: schema.username
            }).then(() => {
              db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                  username: schema.username,
                  birthDate: new Date(schema.date),
                  createdDate: firebase.firestore.Timestamp.now(),
                  phoneNumber: "",
                  phoneVerified: false
                })
                .then(() => {
                  alert("Successfully registered! Please login.");
                  this.$router.push("/login");
                })
                .catch(error => {
                  console.error("Error writing document: ", error);
                });
            });
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>

<style>
.height {
  height: 100vh;
}

.card {
  border: none;
  padding: 20px;
  background-color: #1c1e21;
  color: black;
}

.circle {
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 10px;
  border-radius: 50%;
}

.input-group {
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
}

.input-group i {
  position: absolute;
  font-size: 18px;
  top: 15px;
  left: 10px;
}

.form-control {
  text-indent: 5px;
  font-size: 15px;
}

.form-check-label {
  margin-top: 2px;
  font-size: 14px;
}

.signup {
  height: 50px;
  font-size: 14px;
}

.social {
  height: 5vh;
  width: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.social:hover {
  background-color: white;
  border-color: white;
  color: black;
}

.modal-header {
  background-color: whitesmoke;
}

* {
  box-sizing: border-box;
}

:root {
  --primary-color: #0071fe;
  --error-color: #f23648;
  --error-bg-color: #fddfe2;
  --success-color: #21a67a;
  --success-bg-color: #e0eee4;
}
</style>
