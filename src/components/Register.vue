<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-7">
        <div class="card px-5 py-5 text-white bg-dark">
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

          <form @submit.prevent="signup">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon :icon="['fas', 'user']"
              /></span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model="username"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon :icon="['fas', 'envelope']"
              /></span>
              <input
                type="email"
                class="form-control"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                v-model="email"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon :icon="['fas', 'lock']"
              /></span>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon1"
                v-model="password"
                name="password"
                data-bv-identical="true"
                data-bv-identical-field="confirmPassword"
                data-bv-identical-message="The password and its confirm are not the same"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1"
                ><font-awesome-icon :icon="['fas', 'lock']"
              /></span>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                aria-describedby="basic-addon1"
                v-model="confirmPassword"
                name="confirmPassword"
                data-bv-identical="true"
                data-bv-identical-field="password"
                data-bv-identical-message="The password and its confirm are not the same"
              />
            </div>

            <div class="mb-3">
              <v-date-picker v-model="date">
                <template v-slot="{ inputValue, inputEvents }">
                  <div class="input-group">
                    <span class="input-group-text" id="basic-addon1"
                      ><font-awesome-icon :icon="['fas', 'calendar-alt']"
                    /></span>
                    <input
                      class="form-control"
                      :value="inputValue"
                      v-on="inputEvents"
                      placeholder="Date of Birth"
                      aria-label="Birthdate"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </div>
                </template>
              </v-date-picker>
            </div>

            <div class="form-check">
              <input
                class="form-check-input bg-danger"
                type="checkbox"
                id="flexCheckChecked"
                required
              />
              
              <label class="form-check-label" for="flexCheckChecked">
                ฉันยอมรับ<a
                  class="fw-bold text-decoration-none text-danger text-gradient"
                  data-bs-toggle="modal"
                  data-bs-target="#TermOfUseModal"
                  >ข้อตกลงในการใช้งาน</a
                >
              </label>      
            </div>

            <button type="submit" class="btn btn-dark mt-3 bg-danger" style="width:100%;">
              สมัครสมาชิก
            </button>
          </form>

          <div class="text-center mt-3">
            <span>หรือสมัครสมาชิกด้วยโซเชียลมีเดีย</span>
          </div>

          <div class="d-flex justify-content-center mt-4">
            <span class="social"
              ><font-awesome-icon :icon="['fab', 'google']" class="social-icon"
            /></span>
            <span class="social"
              ><font-awesome-icon
                :icon="['fab', 'facebook']"
                class="social-icon"
            /></span>
            <span class="social"
              ><font-awesome-icon :icon="['fab', 'twitter']" class="social-icon"
            /></span>
            <span class="social"
              ><font-awesome-icon
                :icon="['fab', 'linkedin']"
                class="social-icon"
            /></span>
          </div>

          <div class="text-center mt-4">
            <span>เป็นสมาชิกอยู่แล้ว? </span>
            <a
              class="fw-bold text-decoration-none text-danger text-gradient"
              href="#Login"
              >เข้าสู่ระบบ</a
            >
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
                  ...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...<br />...ทดสอบ...
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

function _calculateAge(birthday) { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export default {
  
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      date: new Date(),
    };
  },
  methods: {
    signup() {
      if(_calculateAge(this.date) >= 20){
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(() => {
            db.collection("users").doc(firebase.auth().currentUser.uid).set({
                username: this.username,
                birthDate: this.date,
                createdDate: firebase.firestore.Timestamp.now(),
                isStaff: false
            })
            .then(() => {
                alert('Successfully registered! Please login.');
                this.$router.push("/login");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });          
          })
          .catch(error => {
            alert(error.message);
          });
      }
      else{
        alert('You\'re not allowed to use the website.');
      }
      
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
  background-color: #1c1e21;
  text-indent: 5px;
  font-size: 15px;
}

.form-control:focus {
  background-color: #25272a;
  box-shadow: none;
  color: black;
  border-color: #7f6ce7;
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
  height: 50px;
  width: 50px;
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
</style>
