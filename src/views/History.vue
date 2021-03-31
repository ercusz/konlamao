<template>

    <div v-if="this.invoices.length === 0">
      <h2 class="text-white text-center">คุณไม่มีรายการจองโต๊ะล่าสุด</h2>
    </div>
    <div v-else>
      <div class="card text-white bg-dark mb-3 shadow-lg" v-for="invoice in orderStatus" :key="invoice">
          <div class="card-header" >
              รหัสการจอง <strong class="text-danger">{{ invoice.id}}</strong>
          </div>
          <div class="card-body">
              <h5 class="card-title">รหัสโต๊ะ: {{ invoice.table.id }}</h5>
              <p class="card-text">ราคา {{ invoice.table.price }} บาท</p>
              <p class="card-text">
                สถานะ: <label :id="'invoiceState_' + invoice.status.id">{{ invoice.status.desc }}</label> 
              </p>
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
              <p class="card-text">เวลาที่จอง {{ getReservedDate(invoice) }} </p>
              <small class="text-danger" v-if="invoice.status.id === '0'" >**{{ getTimeDiff(invoice) }}**</small>
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
import moment from "moment"

export default {
  props: ["username"],
  data() {
    return {
      invoices: [],
      currentCancel: {},
      moment: moment
    };
  },
  created(){
    db.collection('invoices').where("uid", "==", db.doc("users/" + firebase.auth().currentUser.uid)).get()
    .then(res => {
      res.forEach(doc => {
        const newItem = doc.data();
        newItem.id = doc.id;
        if (newItem.table) {
          newItem.table.get()
          .then(res => { 
            newItem.table = res.data()
            newItem.table.id = res.id
            if(newItem.status){
              newItem.status.get()
              .then(res => {
                newItem.status = res.data()
                newItem.status.id = res.id
                this.invoices.push(newItem);
              })
              .catch(err => console.error(err));
            }            
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
      const now = moment()
      //const create = moment(invoice.reservedDate.toDate())
      const expire = moment(invoice.expireDate.toDate())
      /*console.log("================= " + invoice.table.id + " ======================")
      console.log(invoice.id)
      console.log(now.format())
      console.log(create.format())
      console.log(expire.format())
      console.log("=================================================")*/
      if(!moment(now).isAfter(expire)){
        const hours = expire.diff(now, 'hours')
        const minutes = parseInt(expire.diff(now, 'minutes') / 60)
        return "กรุณาชำระเงินภายใน " + hours + " ชั่วโมง " + minutes + " นาที"        
      }
      else{
        return "สิ้นสุดเวลาชำระเงิน"
      }

    },
    cancelReserve(invoice){
      db.collection("invoices").doc(invoice.id)
      .update({'status': db.doc('invoiceStatus/' + '2')}).then(() => {
            db.collection("Tables").doc(invoice.table.id)
            .update({'available': true})
            .then(() => {
              alert("ยกเลิกการจองของคุณเรียบร้อยแล้ว!");
              window.location.reload()  
            })                   
      }).catch((error) => {
          console.error("Error updating document: ", error);
      });
    },
    getReservedDate(invoice){
      return moment(invoice.reservedDate.toDate()).locale('th').format("dddd, MMMM Do YYYY, h:mm:ss a")
    }
  },
  computed: {
    orderStatus: function (){
      return this.invoices.slice().sort(function(a, b){
        return (a.reservedDate < b.reservedDate) ? 1 : -1;
      });
    },

  }
}
</script>

<style>
#invoiceState_0{
  color: gray;
}
#invoiceState_1{
  color: green;
  font-weight: bold;
}
#invoiceState_2{
  color: orange;
  font-weight: bold;
}
#invoiceState_3{
  color: rgb(88, 159, 180);
  font-weight: bold;
}
</style>
