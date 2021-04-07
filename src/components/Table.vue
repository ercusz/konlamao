<template>
  <div class="text-white">
    <!--First Floor-->
    <table style="width:100%;" v-if="floorId == 'HUMYAI'" class="shadow-lg">
      <colgroup>
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:.5em;" />
        <col style="width:12%;" />
        <col style="width:6%;" />
        <col style="width:6%;" />
        <col style="width:12%;" />
      </colgroup>
      <tr rowspan="2">
        <td colspan="5" class="bg-dark border-dark border-3">
          <h3>
            STAGE <font-awesome-icon icon="guitar" style="color: white" />
          </h3>
        </td>
        <td class="gap border-dark border-3" rowspan="7"></td>
        <td class="p-3 bg-dark" colspan="4">
          <div class="d-grid gap-2 d-md-block">
            <button class="btn-danger btn-gradient mb-1 rounded shadow-lg">
              กำลังเลือก</button
            ><br />
            <button class="btn-dark btn-gradient mb-1 rounded shadow-lg">
              ว่าง</button
            ><br />
            <button
              class="btn-secondary text-white btn-gradient mb-1 rounded shadow-lg"
            >
              ถูกจองแล้ว</button
            ><br />
          </div>
        </td>
      </tr>
      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4">
          <h6 class="title">{{ "You're on the " + floorId + " floor." }}</h6>
        </td>
      </tr>
      <tr>
        <td>
          <button
            :class="className(tables[0])"
            :disabled="!tables[0].available"
            @click="chooseTable(tables[0])"
          >
            {{ tables[0].id }} <br />
            {{ tables[0].price }}฿
          </button>
        </td>

        <td class="spacing" colspan="3"></td>

        <td>
          <button
            :class="className(tables[7])"
            :disabled="!tables[7].available"
            @click="chooseTable(tables[7])"
          >
            {{ tables[7].id }} <br />
            {{ tables[7].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button
            :class="className(tables[11])"
            :disabled="!tables[11].available"
            @click="chooseTable(tables[11])"
          >
            {{ tables[11].id }} <br />
            {{ tables[11].price }}฿
          </button>
        </td>

        <td></td>
      </tr>
      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td>
          <button
            :class="className(tables[1])"
            :disabled="!tables[1].available"
            @click="chooseTable(tables[1])"
          >
            {{ tables[1].id }} <br />
            {{ tables[1].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[4])"
            :disabled="!tables[4].available"
            @click="chooseTable(tables[4])"
          >
            {{ tables[4].id }} <br />
            {{ tables[4].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[8])"
            :disabled="!tables[8].available"
            @click="chooseTable(tables[8])"
          >
            {{ tables[8].id }} <br />
            {{ tables[8].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button
            :class="className(tables[12])"
            :disabled="!tables[12].available"
            @click="chooseTable(tables[12])"
          >
            {{ tables[12].id }} <br />
            {{ tables[12].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4"></td>
      </tr>

      <tr>
        <td>
          <button
            :class="className(tables[2])"
            :disabled="!tables[2].available"
            @click="chooseTable(tables[2])"
          >
            {{ tables[2].id }} <br />
            {{ tables[2].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[5])"
            :disabled="!tables[5].available"
            @click="chooseTable(tables[5])"
          >
            {{ tables[5].id }} <br />
            {{ tables[5].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[9])"
            :disabled="!tables[9].available"
            @click="chooseTable(tables[9])"
          >
            {{ tables[9].id }} <br />
            {{ tables[9].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button
            :class="className(tables[13])"
            :disabled="!tables[13].available"
            @click="chooseTable(tables[13])"
          >
            {{ tables[13].id }} <br />
            {{ tables[13].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr>
        <td rowspan="2" colspan="5"></td>
        <td class="door"></td>
        <td colspan="4"></td>
      </tr>

      <tr>
        <td class="door"></td>

        <td></td>

        <td colspan="2">
          <button
            :class="className(tables[14])"
            :disabled="!tables[14].available"
            @click="chooseTable(tables[14])"
          >
            {{ tables[14].id }} <br />
            {{ tables[14].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr>
        <td>
          <button
            :class="className(tables[3])"
            :disabled="!tables[3].available"
            @click="chooseTable(tables[3])"
          >
            {{ tables[3].id }} <br />
            {{ tables[3].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[6])"
            :disabled="!tables[6].available"
            @click="chooseTable(tables[6])"
          >
            {{ tables[6].id }} <br />
            {{ tables[6].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button
            :class="className(tables[10])"
            :disabled="!tables[10].available"
            @click="chooseTable(tables[10])"
          >
            {{ tables[10].id }} <br />
            {{ tables[10].price }}฿
          </button>
        </td>

        <td class="gap" rowspan="7"></td>
        <td colspan="4"></td>
      </tr>
      <tr style="height: .5em;">
        <!-- Gap -->
        <td class="gap" colspan="5"></td>
        <td class="door" colspan="2"></td>
        <td class="door" colspan="2"></td>
      </tr>
      <tr>
        <td colspan="5" rowspan="2"></td>
        <td rowspan="3" colspan="4"></td>
      </tr>
      <tr></tr>
      <tr>
        <td rowspan="3" colspan="3" class="bg-dark">
          <h5>
            BAR <font-awesome-icon icon="cocktail" style="color: white" />
          </h5>
        </td>
        <td rowspan="3" colspan="2"></td>
      </tr>
      <tr>
        <td rowspan="2" colspan="4" class="bg-dark">
          TOILET <font-awesome-icon icon="toilet" style="color: white" />
        </td>
      </tr>
      <tr></tr>
      <tr class="bg-dark">
        <td class="bg-dark border-3 shadow-lg p-0" colspan="10">
          <small
            >ขอขอบคุณแผนผังโต๊ะจาก
            <a
              href="https://www.facebook.com/The-Oldies-by-Sod-Bar-192233891418527"
              >The Oldies by sod bar</a
            ></small
          >
        </td>
      </tr>
    </table>

    <!--Second Floor-->
    <table
      style="width:100%;"
      v-else-if="floorId == 'HUMNOI'"
      class="shadow-lg"
    >
      <colgroup>
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:12%;" />
        <col style="width:.5em;" />
        <col style="width:12%;" />
        <col style="width:6%;" />
        <col style="width:6%;" />
        <col style="width:12%;" />
      </colgroup>
      <tr rowspan="2">
        <td colspan="5" class="bg-dark border-dark border-3">
          <h3>
            STAGE <font-awesome-icon icon="guitar" style="color: white" />
          </h3>
        </td>
        <td class="gap border-dark border-3" rowspan="17"></td>
        <td class="p-3 bg-dark" colspan="4">
          <div class="d-grid d-md-block">
            <button class="btn-danger btn-gradient mb-1 rounded shadow-lg">
              กำลังเลือก</button
            ><br />
            <button class="btn-dark btn-gradient mb-1 rounded shadow-lg">
              ว่าง</button
            ><br />
            <button
              class="btn-secondary text-white btn-gradient mb-1 rounded shadow-lg"
            >
              ถูกจองแล้ว</button
            ><br />
          </div>
        </td>
      </tr>
      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4">
          <h6 class="title">{{ "You're on the " + floorId + " floor." }}</h6>
        </td>
      </tr>
      <tr>
        <td>
          <button :disabled="true">
            {{ tables[0].id }} <br />
            {{ tables[0].price }}฿
          </button>
        </td>

        <td class="spacing" colspan="3"></td>

        <td>
          <button :disabled="true">
            {{ tables[7].id }} <br />
            {{ tables[7].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button :disabled="true">
            {{ tables[11].id }} <br />
            {{ tables[11].price }}฿
          </button>
        </td>

        <td></td>
      </tr>
      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4"></td>
      </tr>
      <tr>
        <td>
          <button :disabled="true">
            {{ tables[1].id }} <br />
            {{ tables[1].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button :disabled="true">
            {{ tables[4].id }} <br />
            {{ tables[4].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button :disabled="true">
            {{ tables[8].id }} <br />
            {{ tables[8].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button :disabled="true">
            {{ tables[12].id }} <br />
            {{ tables[12].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr>
        <!-- space -->
        <td colspan="5"></td>
        <td colspan="4"></td>
      </tr>

      <tr>
        <td>
          <button :disabled="true">
            {{ tables[2].id }} <br />
            {{ tables[2].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button :disabled="true">
            {{ tables[5].id }} <br />
            {{ tables[5].price }}฿
          </button>
        </td>

        <td></td>

        <td>
          <button :disabled="true">
            {{ tables[9].id }} <br />
            {{ tables[9].price }}฿
          </button>
        </td>

        <td></td>

        <td colspan="2">
          <button :disabled="true">
            {{ tables[13].id }} <br />
            {{ tables[13].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr>
        <td rowspan="2" colspan="5"></td>
        <td colspan="4"></td>
      </tr>

      <tr>
        <td></td>

        <td colspan="2">
          <button :disabled="true">
            {{ tables[14].id }} <br />
            {{ tables[14].price }}฿
          </button>
        </td>

        <td></td>
      </tr>

      <tr style="height: .5em;">
        <!-- Gap -->
        <td class="gap" colspan="5"></td>
        <td class="gap" colspan="4"></td>
      </tr>

      <tr>
        <td colspan="5">
          <button
            :class="className(tables[15])"
            :disabled="!tables[15].available"
            @click="chooseTable(tables[15])"
          >
            {{ tables[15].id }} <br />
            {{ tables[15].price }}฿
          </button>
        </td>

        <td colspan="4"></td>
      </tr>

      <tr>
        <td colspan="5" rowspan="2"></td>
        <td colspan="4" style="border: 2px solid black"></td>
      </tr>
      <tr>
        <td colspan="4" style="border: 2px solid black">STAIRS</td>
      </tr>
      <tr>
        <td rowspan="3" colspan="2"></td>
        <td>
          <button
            :class="className(tables[16])"
            :disabled="!tables[16].available"
            @click="chooseTable(tables[16])"
          >
            {{ tables[16].id }} <br />
            {{ tables[16].price }}฿
          </button>
        </td>
        <td rowspan="3" colspan="2"></td>
        <td colspan="4" style="border: 2px solid black"></td>
      </tr>
      <tr>
        <td rowspan="2"></td>
        <td colspan="4" style="border: 2px solid black"></td>
      </tr>
      <tr></tr>
      <tr class="bg-dark">
        <td class="bg-dark border-3 shadow-lg p-0" colspan="10">
          <small
            >ขอขอบคุณแผนผังโต๊ะจาก
            <a
              href="https://www.facebook.com/The-Oldies-by-Sod-Bar-192233891418527"
              >The Oldies by sod bar</a
            ></small
          >
        </td>
      </tr>
    </table>
    
    <div class="card text-white bg-dark mb-3 shadow-lg" v-if="floorId=='first'">
        <div >
            <h3>แก้ไขรายละเอียดโต๊ะ</h3>
            <h4>โต๊ะ: {{this.selectTable.id}}</h4>
            <h6>ชั้น: {{this.selectTable.floor}}</h6>
            <h6>โต๊ะว่าง: {{this.selectTable.available}}</h6>
            <h6 class="mb-3">price: {{this.selectTable.price}} ฿</h6>

            <div class="btn-group">
            <select v-model="this.selectTable" class="form-select">
              <option selected>กรุณาเลือกโต๊ะ</option>
              <option v-bind:value="t" v-for="t in tables" :key="t">{{t.id}}</option>
            </select>
            
          </div>
         
        </div>
         <button
              class="btn btn-dark mt-3 bg-success" 
              @click="chooseTable(this.selectTable)"       
            >
              เลือก
            </button>
    </div>
  </div>
</template>

<script>
import { db } from "../main"

export default {
  props: ["floorId", "selectedTable"],
  data() {
    return {
      tables: [],
      selectTable: "กรุณาเลือกโต๊ะ",
    };
  },
  created(){
    db.collection('Tables').onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if (change.type === 'added' || change.type === "modified" || change.type === "removed"){
          this.tables.push({
            ...change.doc.data(),
            id: change.doc.id
          })
          //Update data realtime
          const objIndex = this.tables.findIndex((obj => obj.id == change.doc.id))
          this.tables[objIndex].available = change.doc.data().available
        }
      })
    })
  },
  methods: {
    className(table) {
      if(typeof table !== 'undefined'){
        //console.log(table)
        const ids = this.selectedTable.map(t => t.id);
        const idx = ids.indexOf(table.id);
        return [
          "td roomTable text-light bg-gradient",
          { "btn-secondary": !table.available, "btn-danger checked": idx != -1 }
        ];
      }
    },
    chooseTable(table) {
      if(table.available === false){
        alert("โต๊ะถูกจองแล้วไม่สามารถเลือกโต๊ะได้")
      }
      else{
        return [this.$emit("chooseTable", table)];
      }
      
    }
  }  
};
</script>

<style>
table {
  border: 5px solid black !important;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: gray;
}
tr {
  /*border: 2px solid white !important;*/
  border-collapse: collapse;
  text-align: center;
  height: 5vh;
}
td {
  /*border: 2px solid white !important;*/
  border-collapse: collapse;
  text-align: center;
}
.gap {
  border: 3px solid black;
  background-color: white;
  width: 2px;
}
.door {
  border: 3px solid black;
  background-color: green;
  width: 2px;
}
.roomTable {
  text-align: center;
  color: white;
  background-color: black;
}
button.roomTable:hover {
  border: 2px solid red;
  color: red;
  font-weight: bolder;
}
button.roomTable:disabled:hover {
  border: 2px solid white;
  background-color: gray;
  font-weight: lighter;
}
.btn-secondary {
  cursor: not-allowed;
}
button.roomTable,
button:disabled {
  display: inline-block;
  width: 100%; /* set to 100% */
  height: 100%; /* set to 100% */
  font-size: 2vw;
  text-align: center;
  border-radius: 5px;
}
</style>
