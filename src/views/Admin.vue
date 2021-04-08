<template>
  <div v-if="isAdmin === true">
    <h1 class="text-white mb-3">ระบบจัดการข้อมูล</h1>
    <div class="card text-white bg-dark mb-3 shadow-lg">
      <div v-if="this.selectedTable != 'กรุณาเลือกโต๊ะ'">
        <h3>แก้ไขรายละเอียดโต๊ะ</h3>
        <h4>โต๊ะ: {{ this.selectedTable.id }}</h4>
        <h6>floor: {{ this.selectedTable.floor }}</h6>
        <h6>available: {{ this.selectedTable.available }}</h6>
        <h6 class="mb-3">price: {{ this.selectedTable.price }} ฿</h6>
      </div>

      <div class="btn-group">
        <select v-model="this.selectedTable" class="form-select">
          <option selected>กรุณาเลือกโต๊ะ</option>
          <option v-bind:value="t" v-for="t in tableSort" :key="t">{{
            t.id
          }}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <select
          v-model="this.tableOption"
          class="form-select-sm"
          for="inputText"
        >
          <option selected>กรุณาเลือกฟิลด์</option>
          <option value="floor">floor</option>
          <option value="available">available</option>
          <option value="price">price</option>
        </select>
        <input
          v-model="this.tableOptionData"
          :placeholder="this.tableOption"
          id="inputText"
          type="text"
          class="form-control"
          aria-label="Text input with dropdown button"
        />
      </div>
      <button class="btn btn-dark mt-3 bg-success" @click="updateTable()">
        ยืนยัน
      </button>
      <button class="btn btn-dark mt-3 bg-danger" @click="deleteTable()">
        ลบโต๊ะ
      </button>
    </div>

    <div class="card text-white bg-dark mb-3 shadow-lg">
      <h3>เพิ่มโต๊ะ</h3>
      <div>
        <label for="ADDTableId">รหัสโต๊ะ</label>
        <input
          class="form-control"
          type="text"
          placeholder="กรุณากรอกรหัสโต๊ะ"
          id="ADDTableId"
          v-model="this.ADDTableId"
        />

        <label for="ADDTableFloor">ชั้น</label>
        <input
          class="form-control"
          type="number"
          placeholder="กรุณากรอกชั้น"
          id="ADDTableFloor"
          v-model="this.ADDTableFloor"
        />

        <label for="ADDTablePrice">ราคา</label>
        <input
          class="form-control"
          type="number"
          placeholder="กรุณากรอกราคา"
          id="ADDTablePrice"
          v-model="this.ADDTablePrice"
        />

        <label for="ADDTableAvailable">สถานะโต๊ะว่าง</label>
        <input
          class="form-control"
          type="text"
          placeholder="กรุณากรอกสถานะโต๊ะว่าง"
          id="ADDTableAvailable"
          v-model="this.ADDTableAvailable"
        />
      </div>
      <button class="btn btn-dark mt-3 bg-success" @click="addTables()">
        ยืนยัน
      </button>
    </div>

    <div class="card text-white bg-dark mb-3 shadow-lg">
      <h3>ปรับสถานะโต๊ะ/การจอง</h3>
      <button
        class="btn btn-dark mt-3 bg-success"
        @click="availableAllTables()"
      >
        ปรับสถานะเป็นโต๊ะว่างทั้งหมด
      </button>
      <button
        class="btn btn-dark mt-3 bg-danger"
        @click="cancelExpiredInvoices()"
      >
        ยกเลิกการจองที่หมดเวลาชำระเงิน
      </button>
      <button
        class="btn btn-dark mt-3 bg-secondary"
        @click="cancelAllInvoices()"
      >
        ยกเลิกการจองทั้งหมด
      </button>
    </div>

    <div class="card text-white bg-dark mb-3 shadow-lg">
      <h3>ข้อมูลการจองโต๊ะของวันนี้</h3>
      จำนวนโต๊ะที่ถูกจองทั้งหมด(รวมโต๊ะที่ถูกยกเลิก):
      <strong class="text-info">{{ this.allReservedTables.length }} โต๊ะ</strong
      ><br />
      ราคาค่าจองโต๊ะที่ต้องได้รับ(ไม่รวมการจองที่ถูกยกเลิก):
      <strong class="text-info">
        {{
          this.allReservedTables.reduce(function(a, b) {
            return b.status.id !== "2" && b.status.id !== "3"
              ? parseInt(a) + parseInt(b.price)
              : 0;
          }, 0)
        }}
        บาท</strong
      ><br />
      ราคาค่าจองโต๊ะที่ได้รับแล้ว:
      <strong class="text-info">
        {{
          this.allReservedTables.reduce(function(a, b) {
            return b.status.id === "1"
              ? parseInt(a) + parseInt(b.price)
              : parseInt(a);
          }, 0)
        }}
        บาท </strong
      ><br />
    </div>

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
        <p class="card-text">เวลาที่จอง {{ getReservedDate(invoice) }}</p>
        <button
          class="btn btn-dark mt-3 bg-success"
          data-bs-toggle="modal"
          data-bs-target="#confirmModal"
          @click="
            this.currentConfirm = invoice;
            getPaymentDesc(invoice);
          "
          v-if="invoice.status.id === '0' || invoice.status.id === '4'"
        >
          ยืนยันการชำระเงิน
        </button>
        <button
          class="btn btn-dark mt-3 bg-secondary"
          data-bs-toggle="modal"
          data-bs-target="#cancelModal"
          @click="this.currentCancel = invoice"
          v-if="invoice.status.id === '0' || invoice.status.id === '4'"
        >
          ยกเลิกการจอง
        </button>
      </div>
      <div class="card-footer text-muted">
        Username ผู้จอง
        <strong class="text-info">{{ getUsername(invoice) }}</strong
        ><br />
        เบอร์ติดต่อ
        <strong class="text-info">{{ getPhoneNumber(invoice) }}</strong>
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="text-white text-center">คุณไม่ได้รับอนุญาตให้ใช้งานในส่วนนี้</h1>
  </div>

  <!-- Confirm Modal -->
  <div
    class="modal fade"
    id="confirmModal"
    tabindex="-1"
    aria-labelledby="confirmModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content bg-dark text-white">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="confirmModalLabel">
            คุณต้องการยืนยันการชำระเงินของการจอง
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
            <h4>ข้อมูลการจอง</h4>
            รหัสโต๊ะ:
            <strong class="text-info">{{ this.currentConfirm.table }}</strong
            ><br />
            ราคา
            <strong class="text-info">{{ this.currentConfirm.price }}</strong
            ><br />
            ผู้จอง
            <strong class="text-info">{{
              getUsername(this.currentConfirm)
            }}</strong
            ><br />
            เบอร์ติดต่อ
            <strong class="text-info">{{
              getPhoneNumber(this.currentConfirm)
            }}</strong>
          </div>
          <div class="mb-3" v-if="this.currentPaymentDesc != null">
            <h4>ข้อมูลการชำระเงิน</h4>
            ช่องทางการชำระเงิน:
            <strong class="text-info">{{
              this.currentPaymentDesc.paymentMethod
            }}</strong
            ><br />
            ธนาคารของลูกค้า:
            <strong class="text-info">{{
              this.currentPaymentDesc.customerBank
            }}</strong
            ><br />
            จำนวนเงินที่โอน:
            <strong class="text-info">{{
              this.currentPaymentDesc.paymentMoney
            }}</strong
            ><br />
            วันที่และเวลาที่โอน:
            <strong class="text-info">{{
              getPaymentDate(this.currentPaymentDesc)
            }}</strong>
          </div>
          <div v-else>
            <h4>ไม่พบข้อมูลการชำระเงิน</h4>
          </div>
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
            class="btn btn-success"
            @click="confirmPaid(this.currentConfirm)"
          >
            ยืนยัน
          </button>
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
            @click="cancelReserve(this.currentCancel, true)"
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

export default {
  props: ["username", "isAdmin"],
  data() {
    return {
      invoices: [],
      tables: [],
      currentCancel: {},
      currentConfirm: [],
      moment: moment,
      selectedTable: "กรุณาเลือกโต๊ะ",
      tableOption: "กรุณาเลือกฟิลด์",
      tableOptionData: null,
      expiredInvoices: [],
      currentPaymentDesc: {},
      allReservedTables: [],
      allReservedTablesPrice: 0,
      ADDTableId: "",
      ADDTableFloor: 0,
      ADDTablePrice: 0,
      ADDTableAvailable: false
    };
  },
  created() {
    if (!this.isAdmin) {
      setTimeout(() => this.$router.push({ name: "Home" }), 2000);
    }

    db.collection("Tables")
      .get()
      .then(res => {
        res.forEach(doc => {
          const newItem = doc.data();
          newItem.id = doc.id;
          this.tables.push(newItem);
        });
      })
      .catch(err => {
        console.error(err);
      });

    db.collection("invoices")
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
                if (typeof newItem.uid != "undefined") {
                  newItem.uid
                    .get()
                    .then(res => {
                      newItem.uid = res.data();
                      newItem.uid.id = res.id;
                      this.invoices.push(newItem);
                    })
                    .catch(err => console.error(err));
                } else {
                  this.invoices.push(newItem);
                }
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

    this.getReservedTableFromInvoices();
  },
  methods: {
    addTables() {
      if (
        this.ADDTableId != null &&
        this.ADDTableFloor >= 1 &&
        this.ADDTableFloor <= 2 &&
        this.ADDTablePrice >= 0
      ) {
        db.collection("Tables")
          .doc(this.ADDTableId)
          .set({
            available: this.ADDTableAvailable === "true",
            floor: parseInt(this.ADDTableFloor),
            price: parseInt(this.ADDTablePrice)
          })
          .then(() => {
            alert("เพิ่มโต๊ะเรียบร้อย!");
            window.location.reload();
          })
          .catch(error => {
            console.error("Error writing document: ", error);
          });
      } else {
        alert("กรุณากรอกข้อมูลให้ถูกต้อง!");
      }
    },
    getReservedTableFromInvoices() {
      const midnight = new Date(
        new Date(firebase.firestore.Timestamp.now().seconds * 1000).setHours(
          0,
          0,
          0
        )
      );
      const closereserve = new Date(
        new Date(firebase.firestore.Timestamp.now().seconds * 1000).setHours(
          19,
          0,
          0
        )
      );
      console.log(midnight);
      console.log(closereserve);
      db.collection("invoices")
        .where("reservedDate", ">=", midnight)
        .where("reservedDate", "<=", closereserve)
        .get()
        .then(res => {
          res.forEach(doc => {
            const newItem = doc.data();
            newItem.id = doc.id;
            if (newItem.status) {
              newItem.status.get().then(res => {
                newItem.status = res.data();
                newItem.status.id = res.id;
                this.allReservedTables.push(newItem);
              });
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
      console.log(this.allReservedTables);
    },
    getPaymentDesc(invoice) {
      db.collection("paymentDesc")
        .doc(invoice.id)
        .get()
        .then(res => {
          const newItem = res.data();
          newItem.id = res.id;
          this.currentPaymentDesc = newItem;
          console.log(this.currentPaymentDesc);
        })
        .catch(err => {
          console.error(err);
          this.currentPaymentDesc = null;
        });
    },
    isExpired(invoice) {
      const now = moment();
      const expire = moment(invoice.expireDate.toDate());
      if (!moment(now).isAfter(expire)) {
        return false;
      } else {
        return true;
      }
    },
    getTimeDiff(invoice) {
      if (!this.isExpired(invoice)) {
        const now = moment();
        const expire = moment(invoice.expireDate.toDate());
        const hours = expire.diff(now, "hours");
        const minutes = parseInt(expire.diff(now, "minutes") / 60);
        return hours + " ชั่วโมง " + minutes + " นาที";
      } else {
        return "สิ้นสุดเวลาชำระเงิน";
      }
    },
    cancelReserve(invoice, system) {
      let option = "";
      if (system === true) {
        option = "3";
      } else {
        option = "2";
      }

      db.collection("invoices")
        .doc(invoice.id)
        .update({ status: db.doc("invoiceStatus/" + option) })
        .then(() => {
          db.collection("Tables")
            .doc(invoice.table.id)
            .update({ available: true })
            .then(() => {
              if (system === false) {
                alert("ยกเลิกการจองเรียบร้อยแล้ว!");
                window.location.reload();
              } else {
                console.log("success");
              }
            });
        })
        .catch(error => {
          console.error("Error updating document: ", error);
        });
    },
    confirmPaid(invoice) {
      db.collection("invoices")
        .doc(invoice.id)
        .update({ status: db.doc("invoiceStatus/" + "1") })
        .then(() => {
          alert("ยืนยันการชำระเงินเรียบร้อยแล้ว!");
          window.location.reload();
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
    getPaymentDate(paymentdesc) {
      if (typeof paymentdesc.paymentDate != "undefined") {
        return moment(paymentdesc.paymentDate.toDate())
          .locale("th")
          .format("dddd, MMMM Do YYYY, h:mm:ss a");
      }
    },
    getUsername(invoice) {
      if (typeof invoice.uid != "undefined") {
        return invoice.uid.username;
      } else {
        return invoice.name;
      }
    },
    getPhoneNumber(invoice) {
      if (typeof invoice.uid != "undefined") {
        return invoice.uid.phoneNumber;
      } else {
        return invoice.phone;
      }
    },
    deleteTable() {
      if (this.selectedTable != "กรุณาเลือกโต๊ะ") {
        db.collection("Tables")
          .doc(this.selectedTable.id)
          .delete()
          .then(() => {
            alert("ลบโต๊ะเรียบร้อยแล้ว!");
          })
          .catch(error => {
            console.error("Error removing document: ", error);
          });
      } else {
        alert("กรุณาเลือกโต๊ะก่อนทำรายการ!");
      }
    },
    updateTable() {
      if (
        this.selectedTable != "กรุณาเลือกโต๊ะ" &&
        this.tableOption != "กรุณาเลือกฟิลด์" &&
        this.tableOptionData != null
      ) {
        console.log("Hello World");
        let available = false;
        let floor = 0;
        let price = 0;
        let data = {};
        switch (this.tableOption) {
          case "available":
            available = this.tableOptionData === "true";
            data = { available: available };
            break;
          case "floor":
            floor = parseInt(this.tableOptionData);
            data = { floor: floor };
            break;
          case "price":
            price = parseInt(this.tableOptionData);
            data = { price: price };
            break;
          default:
            break;
        }
        db.collection("Tables")
          .doc(this.selectedTable.id)
          .update(data)
          .then(() => {
            alert("อัปเดตข้อมูลเรียบร้อย!");
            window.location.reload();
          });
      } else {
        alert("กรุณาเลือกโต๊ะก่อนทำรายการ!");
      }
    },
    availableAllTables() {
      db.collection("Tables")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref
              .update({
                available: true
              })
              .then(() => {
                console.log("available all tables");
              });
          });
        });
      alert("อัปเดตข้อมูลเรียบร้อย!");
      window.location.reload();
    },
    cancelExpiredInvoices() {
      this.invoices.forEach(invoice => {
        if (this.isExpired(invoice) === true && invoice.status.id === "0") {
          this.cancelReserve(invoice, true);
        }
      });
      alert("ยกเลิกการจองที่หมดอายุเรียบร้อย!");
      window.location.reload();
    },
    cancelAllInvoices() {
      this.invoices.forEach(invoice => {
        if (invoice.status.id === "0") {
          this.cancelReserve(invoice, true);
        }
      });
      alert("ยกเลิกการจองทั้งหมดเรียบร้อย!");
      window.location.reload();
    }
  },
  computed: {
    orderStatus: function() {
      return this.invoices.slice().sort(function(a, b) {
        return a.status < b.status ? 1 : -1;
      });
    },
    tableSort: function() {
      return this.tables.slice().sort(function(a, b) {
        return a.id > b.id ? 1 : -1;
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
