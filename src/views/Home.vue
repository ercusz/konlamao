<template>
  <div class="home w-80">
    <div class="container text-light mb-5"><h1>สวัสดี, {{ getUsername() }}</h1><h4>{{ getQuotes() }}</h4></div>
    <div class="row justify-content-md-center">
      <div class="col-sm-6">
        <div class="card mb-5 p-0 text-white bg-dark">
          <img
            src="https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">
              <span class="badge bg-warning bg-gradient text-dark"
                >โปรโมชัน</span
              >
              โปรเด็ดคืนนี้🔥
            </h5>
            <p class="card-text">
              ก่อน 20:30 น.<br />🐘 ขวดละ 49฿<br />🐅 ขวดละ 59฿
            </p>
            <p class="card-text text-end text-muted">
              <small id="time">อัปเดตล่าสุดเมื่อ 3 นาทีที่แล้ว</small>
            </p>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="card mb-5 p-0 text-white bg-dark">
          <img
            src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">
              <span class="badge bg-danger bg-gradient text-dark">สำคัญ</span>
              มาตรการป้องกันโควิด-19
            </h5>
            <p class="card-text">
              ลูกค้าทุกท่านต้องล้างมือและผ่านการตรวจวัดอุณหภูมิทุกครั้งก่อนเข้าร้าน
              สวมหน้ากากอนามัยทุกครั้งเมื่อลุกออกจากโต๊ะ
            </p>
            <p class="card-text text-end text-muted">
              <small id="time">อัปเดตล่าสุดเมื่อ 7 เดือนที่ผ่านมา</small>
            </p>
          </div>
        </div>
      </div>

      <div class="col-sm-6">
        <div class="card mb-5 p-0 text-white bg-dark">
          <img
            src="https://i.pinimg.com/564x/d1/fc/5e/d1fc5ed3907504769355db10febd3695.jpg"
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">
              <span class="badge bg-secondary">สิ้นสุด</span> มินิคอนเสิร์ตวง
              Polycat สุด Exclusive!
            </h5>
            <p class="card-text">วันที่ 01 มกราคม 2564</p>
            <a href="#" class="btn bg-primary text-light mb-3">รายละเอียด</a>
            <a
              href="#"
              class="btn bg-danger text-light mb-3 ms-2 disabled"
              aria-disabled="true"
              >จองทันที</a
            >
            <p class="card-text text-end text-muted">
              <small id="time">อัปเดตล่าสุดเมื่อ 1 เดือนที่ผ่านมา</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import firebase from "firebase";
import { db } from "../main"

export default {
  props: ["username"],
  data() {
    return{
      quotes: []
    }
  },
  created(){
    this.loadQuotes()
  },
  methods: {
    loadQuotes(){
      firebase.firestore().collection('Quotes').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((q) => {
            const quote = q.data()
            //console.log(quote)
            this.quotes.push(quote.desc)            
        })     
      })
    },
    getQuotes() {
      return this.quotes[Math.floor((Math.random() * this.quotes.length)+1)]
    },
    getUsername(){
      if(this.username==null){
        return "Guest"
      }else{
        return this.username
      }
    }
  }
}
</script>

<style>
.card-img-top {
  width: 100%;
  height: 30vw;
  object-fit: cover;
}
</style>
