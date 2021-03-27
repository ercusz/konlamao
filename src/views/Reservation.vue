<template>
  <div class="box text-light">
    <h3 class="title">Reservation System</h3>
    <floors @chooseFloor="handleChooseFloor" :floorId="floorId" />
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
</template>

<script>
import Floors from "../components/Floor.vue";
import Tables from "../components/Table";
import firebase from "firebase";
import { db } from "../main"

export default {
  props: ["username"],
  components: { Floors, Tables },
  data() {
    return {
      floorId: "",
      selectedTable: []
    };
  },
  methods: {
    handleChooseFloor(floorId) {
      this.floorId = floorId;
    },
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
    confirmReservation(){
      if(this.selectedTable[0].available === true){
        db.collection("reservedTables")
            .add({
              uid: firebase.auth().currentUser.uid,
              reservedDate: firebase.firestore.Timestamp.now(),
              expireDate: new Date(firebase.firestore.Timestamp.now().toDate().setHours(19, 0, 0)),
              table: db.doc('Tables/' + this.selectedTable[0].id)
            })
            .then(() => {
              db.doc('Tables/' + this.selectedTable[0].id).update({
                  available: false
              })
              .then(() => {
                  this.selectedTable = []
                  alert("Successfully reserved!");
              })
              .catch((error) => {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error)
              });      
            })
            .catch(error => {
              console.error("Error writing document: ", error)
            });
      }
      else{
       alert("เกิดข้อผิดพลาด โต๊ะถูกคนอื่นจองไปแล้ว!")
      }
      
    }
  }
};
</script>
