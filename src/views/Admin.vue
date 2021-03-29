<template>
  <div v-if="isAdmin === true">
    <h1>Admin Page</h1>
  </div>
  <div v-else>
    <h1 class="text-white text-center">คุณไม่ได้รับอนุญาตให้ใช้งานในส่วนนี้</h1>
  </div>
</template>

<script>
import { db } from "../main"
import firebase from "firebase/app"

export default {
    data() {
        return{
            isAdmin: false
        }
    },
    created() {
        db.collection("users").doc(firebase.auth().currentUser.uid)
        .get().then((doc) => {
            if (doc.exists) {
                this.isAdmin = doc.data().isAdmin
                if(!this.isAdmin){
                    setTimeout( () => this.$router.push({name:'Home'}), 2000);
                    
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }
}
</script>