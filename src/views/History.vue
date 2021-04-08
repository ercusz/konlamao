<template>
  <div v-if="this.invoices.length === 0">
    <h2 class="text-white text-center">คุณไม่มีรายการจองโต๊ะล่าสุด</h2>
  </div>
  <div v-else>
    <div
      class="card text-white bg-dark mb-3 shadow-lg"
      v-for="invoice in orderStatus"
      :key="invoice"
    >
      <div class="card-header">
        รหัสการจอง <strong class="text-danger">{{ invoice.id }}</strong>
      </div>
      <div class="card-body">
        <h5 class="card-title">รหัสโต๊ะ: {{ invoice.table }}</h5>
        <p class="card-text">ราคา {{ invoice.price }} บาท</p>
        <p class="card-text">
          สถานะ:
          <label :id="'invoiceState_' + invoice.status.id">{{
            invoice.status.desc
          }}</label>
        </p>
        <button
          class="btn btn-dark mt-3 bg-success"
          data-bs-toggle="modal"
          data-bs-target="#confirmPaymentMethod"
          @click="this.currentConfirm = invoice"
          v-if="invoice.status.id === '0'"
        >
          ส่งหลักฐานการโอนเงิน
        </button>
        <button
          class="btn btn-dark mt-3 bg-secondary"
          data-bs-toggle="modal"
          data-bs-target="#cancelModal"
          @click="this.currentCancel = invoice"
          v-if="invoice.status.id === '0'"
        >
          ยกเลิกการจอง
        </button>
      </div>
      <div class="card-footer text-muted">
        <p class="card-text">เวลาที่จอง {{ getReservedDate(invoice) }}</p>
        <small class="text-danger" v-if="invoice.status.id === '0'"
          >**{{ getTimeDiff(invoice) }}**</small
        >
      </div>
    </div>
  </div>

  <!-- Confirm Modal -->
  <div
    class="modal fade"
    id="confirmPaymentMethod"
    tabindex="-1"
    aria-labelledby="confirmPaymentMethodLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="confirmPaymentMethodLabel">
            ต้องการส่งหลักฐานการโอนเงินของ การจองหมายเลข
            {{ this.currentConfirm.id }} ใช่หรือไม่?
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-dark text-white">
          <div class="mb-3">
            <h4>รายละเอียดการจอง</h4>
            รหัสโต๊ะ:
            <strong class="text-info">{{ this.currentConfirm.table }}</strong
            ><br />
            ราคา
            <strong class="text-info">{{ this.currentConfirm.price }}</strong
            ><br />
          </div>
          <div class="mb-3">
            <h4>ช่องทางการชำระเงิน</h4>
            ชื่อบัญชี: <strong class="text-info">บริษัท คนละเมา จำกัด</strong
            ><br />
            พร้อมเพย์: <strong class="text-info">098-888-6888</strong><br />
            ธนาคารกสิกรไทย: <strong class="text-info">035-0-12345-6</strong
            ><br />
            ธนาคารไทยพาณิชย์: <strong class="text-info">049-3-45678-9</strong
            ><br />
          </div>

          <div>
            <h4>หลักฐานการชำระเงิน</h4>
            <form>
              <label for="selectPaymentMethod">ช่องทางการชำระเงิน</label>
              <select
                v-model="this.selectedPaymentMethod"
                class="form-select"
                id="selectPaymentMethod"
              >
                <option selected>--กรุณาเลือกช่องทางการชำระเงิน--</option>
                <option
                  v-bind:value="pm"
                  v-for="pm in paymentMethod"
                  :key="pm"
                  >{{ pm }}</option
                >
              </select>
              <label for="selectCustomerBank">บัญชีธนาคารของลูกค้า</label>
              <select
                v-model="this.selectedCustomerBank"
                class="form-select"
                id="selectCustomerBank"
              >
                <option selected>--กรุณาเลือกบัญชีธนาคารของลูกค้า--</option>
                <option
                  v-bind:value="cb"
                  v-for="cb in customerBank"
                  :key="cb"
                  >{{ cb }}</option
                >
              </select>

              <label for="paymentMoney">จำนวนเงินที่โอน</label>
              <input
                class="form-control"
                type="number"
                placeholder="กรุณากรอกจำนวนเงินที่โอน(บาท)"
                id="paymentMoney"
                v-model="paymentMoney"
              />

              <label for="paymentDate">วันที่โอน</label>
              <input
                type="date"
                placeholder="วันที่โอน"
                class="form-control"
                id="paymentDate"
                v-model="paymentDate"
              />

              <label for="paymentTime">เวลาที่โอน</label>
              <div class="input-group" id="paymentTime">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ชั่วโมง"
                  aria-label="Hours"
                  v-model="paymentHours"
                />
                <span class="input-group-text">:</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="นาที"
                  aria-label="Minutes"
                  v-model="paymentMinutes"
                />
              </div>

              <button
                type="button"
                class="btn btn-dark mt-3 bg-danger"
                style="width:100%; height:5vh;"
                @click="sendPaymentDesc"
              >
                ส่งหลักฐานการโอนเงิน
              </button>
            </form>
          </div>
        </div>
        <div class="modal-footer bg-dark">
          ส่งหลักฐานการโอนเงิน แล้วรอการอนุมัติจากผู้ดูแลระบบ
        </div>
      </div>
    </div>
  </div>

  <!-- Cancel Modal -->
  <div
    class="modal fade"
    id="cancelModal"
    tabindex="-1"
    aria-labelledby="cancelModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header bg-dark text-danger">
          <h5 class="modal-title" id="cancelModalLabel">
            คุณต้องการยกเลิกการจอง {{ this.currentCancel.id }} ใช่หรือไม่?
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-dark text-white">
          ถ้ายกเลิกการจองแล้ว จะไม่สามารถย้อนกลับการกระทำได้
        </div>
        <div class="modal-footer bg-dark">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            ไม่ใช่
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="cancelReserve(this.currentCancel)"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../main";
import firebase from "firebase/app";
import moment from "moment";
import * as Yup from "yup";
import TextInput from "../components/TextInput.vue";

export default {
  props: ["username"],
  data() {
    return {
      invoices: [],
      currentCancel: {},
      currentConfirm: [],
      moment: moment,
      paymentMethod: ["พร้อมเพย์", "ธนาคารกสิกรไทย", "ธนาคารไทยพาณิชย์"],
      customerBank: [
        "ธนาคารกสิกรไทย",
        "ธนาคารไทยพาณิชย์",
        "ธนาคารกรุงไทย",
        "ธนาคารกรุงเทพ",
        "ธนาคารกรุงศรีอยุธยา"
      ],
      selectedPaymentMethod: "--กรุณาเลือกช่องทางการชำระเงิน--",
      selectedCustomerBank: "--กรุณาเลือกบัญชีธนาคารของลูกค้า--",
      paymentMoney: 0,
      paymentDate: "",
      paymentHours: 0,
      paymentMinutes: 0
    };
  },
  created() {
    db.collection("invoices")
      .where("uid", "==", db.doc("users/" + firebase.auth().currentUser.uid))
      .get()
      .then(res => {
        res.forEach(doc => {
          const newItem = doc.data();
          newItem.id = doc.id;
          if (newItem.status) {
            newItem.status
              .get()
              .then(res => {
                newItem.status = res.data();
                newItem.status.id = res.id;
                this.invoices.push(newItem);
              })
              .catch(err => console.error(err));
          } else {
            this.invoices.push(newItem);
          }
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  methods: {
    sendPaymentDesc() {
      /*console.log(this.selectedPaymentMethod)
      console.log(this.selectedCustomerBank)
      console.log(this.paymentMoney)
      console.log(new Date(new Date(this.paymentDate).setHours(this.paymentHours, this.paymentMinutes)))
      */
      if (
        this.selectedPaymentMethod != "--กรุณาเลือกช่องทางการชำระเงิน--" &&
        this.selectedCustomerBank != "--กรุณาเลือกบัญชีธนาคารของลูกค้า--" &&
        this.paymentMoney > 0 &&
        this.paymentDate != null &&
        this.paymentHours >= 0 &&
        this.paymentHours <= 24 &&
        this.paymentMinutes >= 0 &&
        this.paymentMinutes <= 60
      ) {
        db.collection("paymentDesc")
          .doc(this.currentConfirm.id)
          .set({
            paymentMethod: this.selectedPaymentMethod,
            customerBank: this.selectedCustomerBank,
            paymentMoney: this.paymentMoney,
            paymentDate: new Date(
              new Date(this.paymentDate).setHours(
                this.paymentHours,
                this.paymentMinutes
              )
            )
          })
          .then(() => {
            db.collection("invoices")
              .doc(this.currentConfirm.id)
              .update({ status: db.doc("invoiceStatus/" + "4") })
              .then(() => {
                db.collection("Tables")
                  .doc(this.currentConfirm.table)
                  .update({ available: true })
                  .then(() => {
                    alert(
                      "ส่งหลักฐานการชำระเงินเรียบร้อย กรุณารอการยืนยันจากระบบ"
                    );
                    window.location.reload();
                  });
              })
              .catch(error => {
                console.log(error);
                console.error("Error updating document: ", error);
              });
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง");
      }
    },
    cancelReserve(invoice) {
      db.collection("invoices")
        .doc(invoice.id)
        .update({ status: db.doc("invoiceStatus/" + "2") })
        .then(() => {
          db.collection("Tables")
            .doc(invoice.table)
            .update({ available: true })
            .then(() => {
              alert("ยกเลิกการจองของคุณเรียบร้อยแล้ว!");
              window.location.reload();
            });
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    },
    getReservedDate(invoice) {
      return moment(invoice.reservedDate.toDate())
        .locale("th")
        .format("dddd, MMMM Do YYYY, h:mm:ss a");
    },
    getTimeDiff(invoice) {
      if (typeof invoice != "undefined") {
        const now = moment();
        //const create = moment(invoice.reservedDate.toDate())
        const expire = moment(invoice.expireDate.toDate());
        /*console.log("================= " + invoice.table + " ======================")
      console.log(invoice.id)
      console.log(now.format())
      //console.log(create.format())
      console.log(expire.format())
      console.log("=================================================")*/
        if (!moment(now).isAfter(expire)) {
          const hours = expire.diff(now, "hours");
          const minutes = parseInt(expire.diff(now, "minutes") - hours * 60);
          return (
            "กรุณาชำระเงินภายใน " + hours + " ชั่วโมง " + minutes + " นาที"
          );
        } else {
          return "สิ้นสุดเวลาชำระเงิน";
        }
      }
    }
  },
  computed: {
    orderStatus: function() {
      return this.invoices.slice().sort(function(a, b) {
        return a.reservedDate < b.reservedDate ? 1 : -1;
      });
    }
  }
};
</script>

<style>
#invoiceState_0 {
  color: gray;
}
#invoiceState_1 {
  color: green;
  font-weight: bold;
}
#invoiceState_2 {
  color: orange;
  font-weight: bold;
}
#invoiceState_3 {
  color: rgb(88, 159, 180);
  font-weight: bold;
}
</style>
