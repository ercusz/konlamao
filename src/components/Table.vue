<template>
    <div class="text-white">

        <table style="width:100%;" v-if="floorId == 'first'">
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
                    STAGE <font-awesome-icon icon="guitar" style="color: white"/>                  
                </td>
                <td class="gap border-dark border-3" rowspan="7"></td>
                <td colspan="4"></td>
            </tr>
            <tr> <!-- space -->
                <td colspan="5"><p>{{this.selectedTable}}</p></td>
                <td colspan="4"><h6 class="title">{{'You\'re in ' + floorId + ' floor.'}} </h6></td>
            </tr>
            <tr>
                <td>
                    <button :class="className(first[0])"
                        :disabled="!first[0].available"
                        @click="chooseTable(first[0])"
                        >
                        {{ first[0].id }} <br> {{ first[0].price }}฿
                    </button>
                </td>
                
                <td class="spacing" colspan="3"></td>

                <td>
                    <button :class="className(first[7])"
                        :disabled="!first[7].available"
                        @click="chooseTable(first[7])"
                        >
                        {{ first[7].id }} <br> {{ first[7].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button :class="className(first[11])"
                        :disabled="!first[11].available"
                        @click="chooseTable(first[11])"
                        >
                        {{ first[11].id }} <br> {{ first[11].price }}฿
                    </button>
                </td>
                
                <td></td>
            </tr>
            <tr> <!-- space -->
                <td colspan="5"></td>
                <td colspan="4"></td>
            </tr>
            <tr>
                <td>
                    <button :class="className(first[1])"
                        :disabled="!first[1].available"
                        @click="chooseTable(first[1])"
                        >
                        {{ first[1].id }} <br> {{ first[1].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button :class="className(first[4])"
                        :disabled="!first[4].available"
                        @click="chooseTable(first[4])"
                        >
                        {{ first[4].id }} <br> {{ first[4].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button :class="className(first[8])"
                        :disabled="!first[8].available"
                        @click="chooseTable(first[8])"
                        >
                        {{ first[8].id }} <br> {{ first[8].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button :class="className(first[12])"
                        :disabled="!first[12].available"
                        @click="chooseTable(first[12])"
                        >
                        {{ first[12].id }} <br> {{ first[12].price }}฿
                    </button>
                </td>

                <td></td>

            </tr>

            <tr> <!-- space -->
                <td colspan="5"></td>
                <td colspan="4"></td>
            </tr>

            <tr>
                <td>
                    <button :class="className(first[2])"
                        :disabled="!first[2].available"
                        @click="chooseTable(first[2])"
                        >
                        {{ first[2].id }} <br> {{ first[2].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button :class="className(first[5])"
                        :disabled="!first[5].available"
                        @click="chooseTable(first[5])"
                        >
                        {{ first[5].id }} <br> {{ first[5].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button :class="className(first[9])"
                        :disabled="!first[9].available"
                        @click="chooseTable(first[9])"
                        >
                        {{ first[9].id }} <br> {{ first[9].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button :class="className(first[13])"
                        :disabled="!first[13].available"
                        @click="chooseTable(first[13])"
                        >
                        {{ first[13].id }} <br> {{ first[13].price }}฿
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
                    <button  :class="className(first[14])"
                        :disabled="!first[14].available"
                        @click="chooseTable(first[14])"
                        >
                        {{ first[14].id }} <br> {{ first[14].price }}฿
                    </button>
                </td>
                
                <td></td> 
            </tr>

            <tr>
                <td>
                    <button :class="className(first[3])"
                        :disabled="!first[3].available"
                        @click="chooseTable(first[3])"
                        >
                        {{ first[3].id }} <br> {{ first[3].price }}฿
                    </button>
                </td>
                
                <td></td>

                <td>
                    <button :class="className(first[6])"
                        :disabled="!first[6].available"
                        @click="chooseTable(first[6])"
                        >
                        {{ first[6].id }} <br> {{ first[6].price }}฿
                    </button>
                </td>
                
                <td></td>

                <td>
                    <button :class="className(first[10])"
                        :disabled="!first[10].available"
                        @click="chooseTable(first[10])"
                        >
                        {{ first[10].id }} <br> {{ first[10].price }}฿
                    </button>
                </td>
                
                <td class="gap" rowspan="7"></td>
                <td colspan="4"></td>
            </tr>
            <tr style="height: .5em;"> <!-- Gap -->
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
                    BAR
                </td>
                <td rowspan="3" colspan="2"></td>
            </tr>
            <tr>
                <td rowspan="2" colspan="4" class="bg-dark">
                    TOILET
                </td>
            </tr>
        </table>
        <table style="width:100%;" v-else-if="floorId == 'second'">
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
                    STAGE <font-awesome-icon icon="guitar" style="color: white"/>                  
                </td>
                <td class="gap border-dark border-3" rowspan="17"></td>
                <td colspan="4"></td>
            </tr>
            <tr> <!-- space -->
                <td colspan="5"><p>{{this.selectedTable}}</p></td>
                <td colspan="4"><h6 class="title">{{'You\'re in ' + floorId + ' floor.'}} </h6></td>
            </tr>
            <tr>
                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[0].id }} <br> {{ first[0].price }}฿
                    </button>
                </td>
                
                <td class="spacing" colspan="3"></td>

                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[7].id }} <br> {{ first[7].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button
                        :disabled=true
                        >
                        {{ first[11].id }} <br> {{ first[11].price }}฿
                    </button>
                </td>
                
                <td></td>
            </tr>
            <tr> <!-- space -->
                <td colspan="5"></td>
                <td colspan="4"></td>
            </tr>
            <tr>
                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[1].id }} <br> {{ first[1].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button 
                        :disabled=true
                        >
                        {{ first[4].id }} <br> {{ first[4].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[8].id }} <br> {{ first[8].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button
                        :disabled=true
                        >
                        {{ first[12].id }} <br> {{ first[12].price }}฿
                    </button>
                </td>

                <td></td>

            </tr>

            <tr> <!-- space -->
                <td colspan="5"></td>
                <td colspan="4"></td>
            </tr>

            <tr>
                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[2].id }} <br> {{ first[2].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button 
                        :disabled=true
                        >
                        {{ first[5].id }} <br> {{ first[5].price }}฿
                    </button>
                </td>

                <td></td>

                <td>
                    <button
                        :disabled=true
                        >
                        {{ first[9].id }} <br> {{ first[9].price }}฿
                    </button>
                </td>

                <td></td>

                <td colspan="2">
                    <button 
                        :disabled=true
                        >
                        {{ first[13].id }} <br> {{ first[13].price }}฿
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
                    <button
                        :disabled=true
                        >
                        {{ first[14].id }} <br> {{ first[14].price }}฿
                    </button>
                </td>
                
                <td></td> 
            </tr>

            <tr style="height: .5em;"> <!-- Gap -->
                <td class="gap" colspan="5"></td>
                <td class="gap" colspan="4"></td>
            </tr>

            <tr>
                <td colspan="5">
                    <button :class="className(second[0])"
                        :disabled="!second[0].available"
                        @click="chooseTable(second[0])"
                        >
                        {{ second[0].id }} <br> {{ second[0].price }}฿
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
                <td rowspan="3" colspan="2">
                </td>
                <td>
                    <button :class="className(second[1])"
                        :disabled="!second[1].available"
                        @click="chooseTable(second[1])"
                        >
                        {{ second[1].id }} <br> {{ second[1].price }}฿
                    </button>
                </td>
                <td rowspan="3" colspan="2"></td>
                <td colspan="4" style="border: 2px solid black"></td>
            </tr>
            <tr>
                <td rowspan="2"></td>
                <td colspan="4" style="border: 2px solid black"></td>
            </tr>
        </table>
        <div v-else>
            ERROR 404 NOT FOUND!
        </div>
    </div> 
</template>

<script>
import { floor, first, second } from '../table.json'

export default {
    props: [ 'floorId', 'selectedTable' ],
    data(){
        return {
            first,
            second
        }
    },
    methods: {
        className(table){
            const ids = this.selectedTable.map(t => t.id)
            const idx = ids.indexOf(table.id)
            return [
                'td roomTable text-light',
                { 'btn-danger': !table.available, 'btn-primary': idx != -1 }
            ]
        },
        chooseTable(table){
            return [
                this.$emit('chooseTable', table)
            ]
        }
    },
    computed: {
        tables(){
            return floor[this.floorId]
        }
    }
}
</script>

<style>
table{
    border: 5px solid black !important;
    border-collapse: collapse;
    table-layout: fixed;
    background-color: gray;
}
tr{
    /*border: 2px solid white !important;*/
    border-collapse: collapse;
    text-align: center;
    height: 5vh;
}
td{
    /*border: 2px solid white !important;*/
    border-collapse: collapse;
    text-align: center;
}
.gap{
    border: 3px solid black;
    background-color: white;
    width: 2px;
}
.door{
    border: 3px solid black;
    background-color: green;
    width: 2px;
}
.roomTable{
    text-align: center;
    color: white;
    background-color: black;
    border-radius: 10px;
}
.roomTable:hover{
    background-color: goldenrod;
}
.btn-danger{
    cursor: not-allowed;
}
button .roomTable
{
   display: inline-block;
   width: 100%;       /* set to 100% */
   height: 100%;      /* set to 100% */
   font-size: 100%;
   text-align: center;
}
</style>