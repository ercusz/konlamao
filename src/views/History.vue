<template>
    <div class="card text-white bg-dark mb-3" v-for="invoice in invoices" :key="invoice">
        <div class="card-header" >
            คำสั่งซื้อ {{invoice.id}}
        </div>
        <div class="card-body">
            <h5 class="card-title">รหัสโต๊ะ: {{}}</h5>
            <p class="card-text">ราคา {{}} บาท</p>
            <a href="#" class="btn btn-dark mt-3 bg-secondary">ยกเลิกการจอง</a>
        </div>
        <div class="card-footer text-muted">
            <small class="text-danger">กรุณาจ่ายเงินภายใน {{getTimeDiff(invoice)}} นาที</small>
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
      invoices: []
    };
  },
  created(){
    db.collection('reservedTables').where("uid", "==", firebase.auth().currentUser.uid).onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added' || change.type === "modified" || change.type === "removed"){
          this.invoices.push({
            ...change.doc.data(),
            id: change.doc.id
          })
        }
      })
    })
    console.log(this.invoices)
  },
  methods: {
      getTimeDiff(invoice){
          //const diff = invoice.expireDate - invoice.reservedDate;
          const date1 = invoice.expireDate.nanoseconds
          const date2 = invoice.reservedDate.nanoseconds
          const difference = Math.abs(date2 - date1)
          const daysDifference = Math.floor(difference/1000);

    return daysDifference

  
      }
  }
}
</script>
