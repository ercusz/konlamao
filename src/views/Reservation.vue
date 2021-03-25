<template>
    <div class="box text-light">
        <h3 class="title">Reservation System</h3>
        <floor @chooseFloor="handleChooseFloor" :floorId="floorId"/>
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
        }
    }
}
</script>

