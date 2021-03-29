<template>
    <div v-if="this.invoices.length === 0">
      <h2 class="text-white text-center">คุณไม่มีรายการจองโต๊ะล่าสุด</h2>
    </div>
    <div v-else>
      <div class="card text-white bg-dark mb-3 shadow-lg" v-for="invoice in invoices" :key="invoice">
          <div class="card-header" >
              รหัสการจอง <strong class="text-danger">{{ invoice.id}}</strong>
          </div>
          <div class="card-body">
              <h5 class="card-title">รหัสโต๊ะ: {{ invoice.table.id }}</h5>
              <p class="card-text">ราคา {{ invoice.table.price }} บาท</p>
              <button
                class="btn btn-dark mt-3 bg-secondary" 
                data-bs-toggle="modal" 
                data-bs-target="#cancelModal"
                @click="this.currentCancel = invoice"                
              >
              ยกเลิกการจอง
              </button>
          </div>
          <div class="card-footer text-muted">
              <small class="text-danger">**กรุณาจ่ายเงินภายใน {{ getTimeDiff(invoice) }}**</small>
          </div>
          
      </div>
    </div>


    <!-- Cancel Modal -->
    <div class="modal fade" id="cancelModal" tabindex="-1" aria-labelledby="cancelModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-white">
          <div class="modal-header bg-dark text-danger">
            <h5 class="modal-title" id="cancelModalLabel">คุณต้องการยกเลิกการจอง {{this.currentCancel.id}} ใช่หรือไม่?</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body bg-dark text-white">
            ถ้ายกเลิกการจองแล้ว จะไม่สามารถย้อนกลับการกระทำได้
          </div>
          <div class="modal-footer bg-dark">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">ไม่ใช่</button>
            <button type="button" class="btn btn-danger" @click="cancelReserve(this.currentCancel)">ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>  
</template>

<script>
import { db } from "../main"
import firebase from "firebase/app"

export default {
  props: ["username"],
  data() {
    return {
      invoices: [],
      currentCancel: {}
    };
  },
  created(){
    db.collection('reservedTables').where("uid", "==", db.doc("users/" + firebase.auth().currentUser.uid)).get()
    .then(res => {
      res.forEach(doc => {
        const newItem = doc.data();
        newItem.id = doc.id;
        if (newItem.table) {
          newItem.table.get()
          .then(res => { 
            newItem.table = res.data()
            newItem.table.id = res.id
            this.invoices.push(newItem);
          })
          .catch(err => console.error(err));
        } else {
          this.invoices.push(newItem);  
        }

      });
    })
    .catch(err => { console.error(err) }); 
    
  },
  methods: {
      getTimeDiff(invoice){
        const diff = new Date(invoice.expireDate.seconds).getTime() - new Date(invoice.reservedDate.seconds).getTime()
        const hours = parseInt( diff / 3600 );
        const minutes = parseInt( (diff - (hours * 3600)) / 60 );
        return hours + " ชั่วโมง " + minutes + " นาที"
      },
      cancelReserve(invoice){
        db.collection("reservedTables").doc(invoice.id)
        .delete().then(() => {
              db.collection("Tables").doc(invoice.table.id).update({'available': true});
              alert("ลบการจองของคุณออกจากระบบเรียบร้อย!");
              window.location.reload()       
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }
  }
}
</script>
