<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="verifyPhone"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header bg-dark text-danger">
          <h5 class="modal-title" id="staticBackdropLabel">
            ยืนยันเบอร์โทรศัพท์
          </h5>
          <button
            ref="Close"
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h2>กรอกเบอร์โทรศัพท์เพื่อรับ OTP</h2>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">+66</span>
            <input
              type="number"
              v-model="phNo"
              class="form-control"
              placeholder="กรอกเบอร์โทรศัพท์"
            />
            <button
              class="btn btn-dark bg-danger"
              id="sign-in-button"
              @click="sendOtp"
              aria-describedby="basic-addon1"
            >
              รับ OTP
            </button>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">OTP</span>
            <input
              type="number"
              v-model="otp"
              class="form-control"
              placeholder="กรอกรหัส OTP"
            />
            <button
              class="btn btn-dark bg-danger"
              id="sign-in-button"
              @click="verifyOtp"
              aria-describedby="basic-addon1"
            >
              ยืนยัน OTP
            </button>
          </div>
          <div id="recaptcha-container"></div>
          <button class="btn btn-dark bg-danger" @click="sendOtp()">
            ส่ง OTP ใหม่
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="this.verified === false && timeCheck() === true" class="container">
    <h3 class="title text-white">กรุณายืนยันเบอร์โทรศัพท์ก่อนจองโต๊ะ</h3>
    <button
      type="button"
      class="btn btn-dark mt-3 bg-danger"
      data-bs-toggle="modal"
      data-bs-target="#verifyPhone"
    >
      ยืนยันเบอร์โทรศัพท์
    </button>
  </div>

  <div
    v-else-if="this.verified === true && timeCheck() === true"
    class="box text-light"
  >
    <h3 class="title">Reservation System</h3>

    <div>
      <h4>จะหมดเวลาจอง {{ moment }}</h4>
    </div>
    <div v-if="selectedTable.length > 0" class="mb-3">
      <transition name="fade">
        <div class="card card-body bg-dark text-white">
          <span class="circle bg-danger bg-gradient mb-2"
            ><font-awesome-icon :icon="['fas', 'check']" style="color: white"
          /></span>
          <h4>
            <b class="text-danger text-gradient"
              >โต๊ะที่คุณเลือก คือ {{ selectedTable[0].id }}</b
            >
          </h4>
          ค่าเปิดโต๊ะ {{ selectedTable[0].price }} บาท (รวมเครื่องดื่ม🍺)

          <div v-if="isAdmin === true">
            <label for="reservedName">ชื่อผู้จอง</label>
            <input
              class="form-control"
              type="text"
              placeholder="กรุณากรอกชื่อผู้จอง"
              id="reservedName"
              v-model="reservedName"
            />
            <label for="reservedPhone">เบอร์โทรศัพท์ผู้จอง</label>
            <input
              class="form-control"
              type="text"
              placeholder="กรุณากรอกเบอร์โทรศัพท์ผู้จอง"
              id="reservedPhone"
              v-model="reservedPhone"
            />
          </div>

          <h6 class="text-secondary">
            <br />หากคุณไม่ชำระเงินค่าจองโต๊ะก่อน 19:00 น.<br />โต๊ะของคุณจะหลุดจองทันที
          </h6>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button
              class="btn-sm btn-danger btn-gradient me-md-1"
              type="button"
              @click="confirmReservation()"
            >
              <b>ยืนยัน</b>
            </button>
            <button
              class="btn-sm btn-secondary btn-gradient text-white"
              type="button"
              @click="clearTable()"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </transition>
    </div>
    <tables
      :floorId="floorId"
      @chooseTable="handleChooseTable"
      :selectedTable="selectedTable"
    />
  </div>
  <template v-else>
    <h1 class="text-white text-center">
      หมดเวลาในการจองโต๊ะ<br />กรุณาลองใหม่อีกครั้งในช่วงเวลา 00:00 น. จนถึง
      19:00 น.
    </h1>
  </template>
</template>

<script>
import Floors from "../components/Floor.vue";
import Tables from "../components/Table";
import firebase from "firebase";
import { db } from "../main";
import moment from "moment";

export default {
  props: ["username", "isAdmin"],
  components: { Tables },
  data() {
    return {
      floorId: "first",
      selectedTable: [],
      phNo: "",
      appVerifier: "",
      otp: "",
      verified: false,
      moment: moment()
        .locale("th")
        .to(moment().set({ hour: 19, minute: 0 })),
      reservedName: "",
      reservedPhone: ""
    };
  },
  methods: {
    handleChooseTable(table) {
      const ids = this.selectedTable.map(t => t.id);
      const idx = ids.indexOf(table.id);

      if (
        idx === -1 &&
        this.selectedTable.length < 1 &&
        table.available === true
      ) {
        this.selectedTable.push(table);
      } else {
        this.selectedTable.splice(idx, 1);
        this.selectedTable.push(table);
      }

      //console.log(this.selectedTable.length);
    },
    clearTable() {
      this.selectedTable = [];
    },
    calExpireTime() {
      const expire = firebase.firestore.Timestamp.now().toDate();
      return new Date(expire.setHours(expire.getHours() + 2));
    },
    confirmReservation() {
      if (this.selectedTable[0].available === true) {
        if (this.isAdmin == true) {
          db.collection("invoices")
            .add({
              name: this.reservedName,
              phone: this.reservedPhone,
              reservedDate: firebase.firestore.Timestamp.now(),
              expireDate: this.calExpireTime(),
              table: this.selectedTable[0].id,
              price: this.selectedTable[0].price,
              status: db.doc("invoiceStatus/" + "0")
            })
            .then(() => {
              db.doc("Tables/" + this.selectedTable[0].id)
                .update({
                  available: false
                })
                .then(() => {
                  this.selectedTable = [];
                  alert("Successfully reserved!");
                })
                .catch(error => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            })
            .catch(error => {
              console.error("Error writing document: ", error);
            });
        } else {
          db.collection("invoices")
            .add({
              uid: db.doc("users/" + firebase.auth().currentUser.uid),
              reservedDate: firebase.firestore.Timestamp.now(),
              expireDate: this.calExpireTime(),
              table: this.selectedTable[0].id,
              price: this.selectedTable[0].price,
              status: db.doc("invoiceStatus/" + "0")
            })
            .then(() => {
              db.doc("Tables/" + this.selectedTable[0].id)
                .update({
                  available: false
                })
                .then(() => {
                  this.selectedTable = [];
                  alert("Successfully reserved!");
                })
                .catch(error => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            })
            .catch(error => {
              console.error("Error writing document: ", error);
            });
        }
      } else {
        alert("เกิดข้อผิดพลาด โต๊ะถูกคนอื่นจองไปแล้ว!");
      }
    },
    sendOtp() {
      if (this.phNo.length < 9) {
        alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง!");
      } else {
        //
        const countryCode = "+66";
        const phoneNumber = countryCode + this.phNo;
        //
        const appVerifier = this.appVerifier;
        //
        db.get;
        firebase
          .auth()
          .currentUser.linkWithPhoneNumber(phoneNumber, appVerifier)
          .then(confirmationResult => {
            // At this point SMS is sent. Ask user for code.
            window.confirmationResult = confirmationResult;
            alert("ส่ง OTP สำเร็จ กรุณาตรวจสอบข้อความในโทรศัพท์ของท่าน");
          })
          .then(result => {
            // Phone credential now linked to current user.
            // User now can sign in with email/pass or phone.
          })
          .catch(error => {
            // Error occurred.
          });
      }
    },
    //
    verifyOtp() {
      if (this.phNo.length < 9 || this.otp.length != 6) {
        alert("กรุณากรอกเบอร์โทรศัพท์ หรือ OTP ให้ถูกต้อง!");
      } else {
        //
        const code = this.otp;
        //
        window.confirmationResult
          .confirm(code)
          .then(result => {
            // User signed in successfully.
            const user = result.user;
            // ...
            db.collection("users")
              .doc(firebase.auth().currentUser.uid)
              .update({ phoneNumber: this.phNo, phoneVerified: true });
            this.verified = true;
            this.$refs.Close.click();
          })
          .catch(error => {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error);
          });
      }
    },
    initReCaptcha() {
      setTimeout(() => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    },
    timeCheck() {
      const now = new Date(
        firebase.firestore.Timestamp.now().seconds * 1000
      ).getTime();
      //const now = new Date(firebase.firestore.Timestamp.now().seconds*1000).setHours(22, 0, 0) //for testing
      const timeClose = new Date(
        firebase.firestore.Timestamp.now().seconds * 1000
      ).setHours(19, 0, 0);
      const diff = parseInt(timeClose - now);
      if (diff < 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    this.timeCheck();
    this.initReCaptcha();
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(res => {
        //console.log(firebase.auth().currentUser.uid)
        //console.log(res.data().phoneVerified)
        if (res.data().phoneVerified != null) {
          if (res.data().phoneVerified === true) {
            this.verified = true;
          } else {
            this.verified = false;
          }
        } else {
          this.verified = false;
        }
      })
      .catch(error => {
        this.verified = false;
      });
  }
};
</script>
