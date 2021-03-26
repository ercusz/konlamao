<template>
    <div class="box text-light">
        <h3 class="title">Reservation System</h3>
        <floor @chooseFloor="handleChooseFloor" :floorId="floorId"/>
        <div v-if="selectedTable.length>0" class="mb-3">
            <transition name="fade">
            <div class="card card-body bg-dark text-white">
                <h4><b class="text-danger text-gradient">โต๊ะที่คุณเลือก คือ {{selectedTable[0].id}}</b></h4>
                ค่าเปิดโต๊ะ {{selectedTable[0].price}} บาท (รวมเครื่องดื่ม)
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                    <button class="btn-sm btn-danger btn-gradient me-md-1" type="button"><b>ยืนยัน</b></button>
                    <button class="btn-sm btn-secondary btn-gradient" type="button" @click="clearTable()">ยกเลิก</button>
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
import Floor from '../components/Floor.vue'
import Tables from '../components/Table'

export default {
    components: { Floor, Tables },
    data(){
        return{
            floorId: '',
            selectedTable: []
        }
    },
    methods: {
        handleChooseFloor(floorId){
            this.floorId = floorId
        },
        handleChooseTable(table){
            const ids = this.selectedTable.map(t => t.id)
            const idx = ids.indexOf(table.id)

            if(idx === -1 && this.selectedTable.length < 1 && table.available === true) {
                this.selectedTable.push(table)
            }
            else {
                this.selectedTable.splice(idx, 1)
                this.selectedTable.push(table)
            }

            console.log(this.selectedTable.length)
        },
        clearTable(){
            this.selectedTable = []
        }
    }
}
</script>

