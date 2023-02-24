<template>

<div class='dashboard-main-container'>
    <nav-bar v-if='tableData' :csvdata='tableData'/>

    <el-table
        class='dashboard-table'
      :data="tableData"
      height="650"
      :row-class-name="tableRowClassName">
      >
      <el-table-column type="expand">
      <template slot-scope="props">

          <div class='expand-container' style='display:none' :id='"print-" + props.row.id'>
<div style="text-align: center;">
              <h3 style="text-align: center; padding-top:50px;" class='tx__20 tx__semibold tx__margin-small--bottom'>Wniosek o korzystanie z usługi transportu <br>door-to-door w Gminie Mielno</h3></div>
          <div class='expand-container__item'>
              <h3 class='tx__20 tx__main-color tx__semibold tx__margin-small--bottom'>Dane zamawiającego:</h3>
              <table class='expand-table'>
                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Imię i nazwisko:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.names }}
                      </td>
                  </tr>
                  

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Data urodzenia/wiek:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.birthdate }} - {{ props.row.age }} l.
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Data zgłoszenia:
                      </td>
                      <td class='expand-table__td'>
                          {{ new Date(props.row.timestamp).getFullYear()+
          "/"+(new Date(props.row.timestamp).getMonth()+1)+
          "/"+new Date(props.row.timestamp).getDate() }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Numer telefonu:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.phonenumber }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Adres odbioru:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.street }} <br>
                          {{ props.row.city }}, 
                          {{ props.row.postcode }}
                      </td>
                  </tr>

              </table>
          </div>

          <div class='expand-container__item'>
              <h3 class='tx__20 tx__main-color tx__semibold tx__margin-small--bottom'>Przejazd:</h3>
               <table class='expand-table'>
                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Nazwa:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.destinationname }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Adres docelowy:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.destinationstreet }} <br>
                          {{ props.row.destinationcity }}, 
                          {{ props.row.destinationpostcode }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Data odbioru:
                      </td>
                      <td class='expand-table__td'>
                          {{ props.row.startdate }} o godz.
                          {{ props.row.starthour }} 
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Przejazd w dwie strony ?
                      </td>
                      <td class='expand-table__td'>
                          <template v-if="props.row.ifround == 'Tak'">
                              Tak
                          </template>
                          <template v-else>
                              Nie 
                          </template>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Potrzebny czas:
                      </td>
                      <td class='expand-table__td'>
                            {{ props.row.neededtime }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebne wypożyczenie wózka inwalidzkiego?
                      </td>
                      <td class='expand-table__td'>
                            {{ props.row.ifwheelchair }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebny przewóz wózka inwalidzkiego?
                      </td>
                      <td class='expand-table__td'>
                            {{ props.row.ifwheelchairincar }}
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebna pomoc asystenta?
                      </td>
                      <td class='expand-table__td'>
                            {{ props.row.ifhelp }}
                      </td>
                  </tr>

                   <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Dodatkowe informacje:
                      </td>
                      <td class='expand-table__td'>
                          <template v-if="props.row.additionalinfo">
                              {{ props.row.additionalinfo }}
                          </template>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Realizacja usługi w celu:
                      </td>
                      <td class='expand-table__td'>
                          <template>
                              {{ props.row.purpose }}
                          </template>
                      </td>
                  </tr>


              </table>
          </div>
        </div>

         <div class='expand-container'>
             
          <div class='expand-container__item'>
              <h3 class='tx__20 tx__main-color tx__semibold tx__margin-small--bottom'>Dane zamawiającego:</h3>
              <table class='expand-table'>
                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                           Imię i nazwisko: 
                      </td>
                      <td class='expand-table__td'>
                          <el-input style='width: 90%' class='tx__14' v-model="props.row.draft.names"></el-input>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Numer telefonu:
                      </td>
                      <td class='expand-table__td'>
                          <el-input style='width: 90%' class='tx__14' v-model='props.row.draft.phonenumber'></el-input>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Data urodzenia
                      </td>
                      <td class='expand-table__td'>
                    
                         {{ props.row.draft.birthdate }} (wiek: {{props.row.draft.age}})

                    <!-- <el-date-picker
                    @input='validateAge'
                    disabled
                      class='tx__14'
                      style='width: 90%'
                      value-format='dd-MM-yyyy'
                      v-model="props.row.draft.birthdate"
                      :picker-options="pickerOptionsBirth"
                      type="date"
                      placeholder="Wybierz datę urodzenia">
                    </el-date-picker> -->

 

          
                      </td>
                  </tr>


                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Orzeczenie o niepełnosprawności:
                      </td>
                      <td class='expand-table__td'>
                           <el-radio class='tx__14' v-model='props.row.draft.ifdisabled' label="Tak">Tak</el-radio>
                            <el-radio class='tx__14' v-model='props.row.draft.ifdisabled' label="Nie">Nie</el-radio>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Stopień niepełnosprawności:
                      </td>
                      <td class='expand-table__td'>
                          <el-select style='width: 90%' v-model="props.row.draft.disabilitylevel"  placeholder="Wybierz stopień niepełnosprawności">
                                        <el-option
                                    class='tx__14'
                                    label="Lekki"
                                    
                                    value="Lekki">
                                    </el-option>
                                    <el-option
                                    class='tx__14'
                                    label="Umiarkowany"
                                    value="Umiarkowany">
                                    </el-option>
                                    <el-option
                                    class='tx__14'
                                    label="Znaczny"
                                    value="Znaczny">
                                    </el-option>
                         </el-select>
                          
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Powód ograniczonej mobilności:
                      </td>
                      <td class='expand-table__td'>
                          <el-select style='width: 90%' v-model="props.row.draft.reason"  placeholder="Wybierz powód">
                                        <el-option
                                            class='tx__14'
                                            label="Stan zdrowia"
                                            value="Stan zdrowia">
                                            </el-option>
                                            <el-option
                                            class='tx__14'
                                            label="Wiek"
                                            value="Wiek">
                                            </el-option>
                                            <el-option
                                            class='tx__14'
                                            label="Inne"
                                            value="Inne">
                                            </el-option>
                                            <el-option
                                            class='tx__14'
                                            label="Nie posiadam ograniczeń mobilnych"
                                            value="Nie posiadam ograniczeń mobilnych">
                                            </el-option>
                         </el-select>
                          
                      </td>
                  </tr>
                  

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Data odbioru:
                      </td>
                      <td class='expand-table__td'>
                          
                          <el-date-picker
                            class='tx__14'
                            style='width: 90%; margin-bottom: 10px'
                            value-format='yyyy/MM/dd'
                            v-model='props.row.draft.startdate'
                            :picker-options="pickerOptions"
                            type="date"
                            placeholder="Wybierz datę przejazdu">
                            </el-date-picker>

                            <el-time-select
                    class='tx__14'
                    v-model='props.row.draft.starthour'
                      style='width: 90%'
                      :picker-options="{
                        start: '00:00',
                        step: '00:15',
                        end: '23:45'
                      }"
                      placeholder="Wybierz godzinę">
                    </el-time-select>
                          
                        
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Adres odbioru:
                      </td>
                      <td class='expand-table__td'>
                          
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.street'></el-input>
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.city'></el-input>
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.postcode'></el-input>
                        
                      </td>
                  </tr>

              </table>
          </div>

          <div class='expand-container__item'>
              <h3 class='tx__20 tx__main-color tx__semibold tx__margin-small--bottom'>Przejazd:</h3>
               <table class='expand-table'>
                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Nazwa:
                      </td>
                      <td class='expand-table__td'>
                          <el-input style='width: 90%' class='tx__14' v-model='props.row.draft.destinationname'></el-input>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Adres docelowy:
                      </td>
                      <td class='expand-table__td'>
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.destinationstreet'></el-input>
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.destinationcity'></el-input>
                          <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.destinationpostcode'></el-input>
                      </td>
                  </tr>

           

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Przejazd w dwie strony?
                      </td>
                      <td class='expand-table__td'>
                            <el-radio class='tx__14' v-model='props.row.draft.ifround' label="Tak">Tak</el-radio>
                            <el-radio class='tx__14' v-model='props.row.draft.ifround' label="Nie">Nie</el-radio>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebne wypożyczenie wózka inwalidzkiego?
                      </td>
                      <td class='expand-table__td'>
                            <el-radio class='tx__14' v-model='props.row.draft.ifwheelchair' label="Tak">Tak</el-radio>
                            <el-radio class='tx__14' v-model='props.row.draft.ifwheelchair' label="Nie">Nie</el-radio>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebny przewóz wózka inwalidzkiego?
                      </td>
                      <td class='expand-table__td'>
                            <el-radio class='tx__14' v-model='props.row.draft.ifwheelchairincar' label="Tak">Tak</el-radio>
                            <el-radio class='tx__14' v-model='props.row.draft.ifwheelchairincar' label="Nie">Nie</el-radio>
                      </td>
                  </tr>

                  

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Czy potrzebna pomoc asystenta?
                      </td>
                      <td class='expand-table__td'>
                            <el-radio class='tx__14' v-model='props.row.draft.ifhelp' label="Tak">Tak</el-radio>
                            <el-radio class='tx__14' v-model='props.row.draft.ifhelp' label="Nie">Nie</el-radio>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Potrzebny czas:
                      </td>
                      <td class='expand-table__td'>
                            <el-input style='width: 90%; margin-bottom: 10px' class='tx__14' v-model='props.row.draft.neededtime'></el-input>
                      </td>
                  </tr>

                   <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Dodatkowe informacje:
                      </td>
                      <td class='expand-table__td'>
                          <el-input
                                class='tx__14'
                                type="textarea"
                                placeholder="Wpisz dodatkowe informacje"
                                v-model="props.row.draft.additionalinfo"
                                maxlength="250"
                                show-word-limit
                            >
                            </el-input>
                      </td>
                  </tr>

                  <tr class='expand-table__tr'>
                      <td class='expand-table__td'>
                          Realizacja usługi w celu:
                      </td>
                      <td class='expand-table__td'>
                          <el-select style='width: 100%' v-model="props.row.draft.purpose"  placeholder="Wybierz cel przejazdu">
                                        <el-option
                                class='tx__14'
                                v-for="item in availablePurposes"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">


                                <span style="float: left">{{ item.label }}</span>
                                    <span style="float: right"><el-popover
                                    placement="right-start"
                                    :title="item.label"
                                    width="200"
                                    trigger="hover"
                                    :content="item.description">
                                    <el-button style='padding: 2px 6px; font-size: 12px; border-radius: 100px;' slot="reference">?</el-button> 
                                    </el-popover>
                                    </span>
                            

                                </el-option>
                         </el-select>
                          
                      </td>
                  </tr>


              </table>
          </div>
        
        </div>

        <div class="button-container">
            <el-button @click="print(props.row.id)">Drukuj</el-button>
            <el-button @click="update(props.row.id)">Zapisz zmiany</el-button>
        </div>

      </template>
    </el-table-column>
      <el-table-column
        prop="names"
        label="Imię i nazwisko"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="Numer telefonu"
        width="180">
      </el-table-column>
      <el-table-column
      width="180"
        label="Data przejazdu">

            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.startdate + ' ' + scope.row.starthour }}</span>
            </template>
        
        </el-table-column>
        <el-table-column
        prop="city"
        label="Odbiór z">
      </el-table-column>
      <el-table-column
        prop="destinationcity"
        label="Przejazd do">
      </el-table-column>
      <el-table-column
        label="Status"
        width="180">

        <template slot-scope="scope">
            <template v-if="scope.row.status === 'toconfirm'">
                <el-tag
                type="warning"
                disable-transitions>DO POTWIERDZENIA</el-tag>
            </template>

            <template v-if="scope.row.status === 'confirmed'">
                <el-tag
                type="success"
                disable-transitions>POTWIERDZONE</el-tag>
            </template>

            <template v-if="scope.row.status === 'completed'">
                <el-tag
                type="primary"
                disable-transitions>ZREALIZOWANE</el-tag>
            </template>

            <template v-if="scope.row.status === 'deleted'">
                <el-tag
                type="danger"
                disable-transitions>ANULOWANE</el-tag>
            </template>
      </template>

      </el-table-column>
      <el-table-column
      fixed="right"
    
      width="240">
      <template slot-scope="scope">
        <el-button @click="statusChange(scope.row.id)" :disabled='scope.row.status == "completed"' type="text" size="small">Zmień status</el-button>
        <el-button @click="statusDelete(scope.row.id)" :disabled='scope.row.status == "deleted" || scope.row.status == "completed"' type="text" size="small">Usuń</el-button>
                <el-button @click="duplicate(scope.row.id)" :disabled='scope.row.status == "deleted" || scope.row.status == "completed"' type="text" size="small">Duplikuj</el-button>

      </template>
    </el-table-column>
    </el-table>


</div>
  
</template>

<script>

import db from '../firestore'
import NavBar from '../components/NavBar.vue'


export default {
    name: 'Dashboard',
    components: { NavBar },
    data() {
        return {
            edited: [],

            availablePurposes: [
        {
          value: 'Społecznym',
          label: 'Społecznym',
          description: 'Których celem jest nabycie, przywrócenie lub wzmocnienie kompetencji społecznych, zaradności, samodzielności i aktywności społecznej, m.in. poprzez udział w zajęciach w Centrum Integracji Społecznej (CIS), Klubie Integracji Społecznej (KIS) lub Warsztacie Terapii Zajęciowej (WTZ).'
        },
        {
          value: 'Zawodowym',
          label: 'Zawodowym',
          description: 'Których celem jest pomoc w utrzymaniu zatrudnienia, podjęciu decyzji dotyczącej wyboru lub zmiany zawodu, wyposażenie w kompetencje i kwalifikacje zawodowe oraz umiejętności pożądane na rynku pracy.'
        },
        {
          value: 'Edukacyjnym',
          label: 'Edukacyjnym',
          description: 'Których celem jest wzrost poziomu wykształcenia, dostosowanie wykształcenia do potrzeb rynku pracy (m.in. edukacja formalna).'
        },
        {
          value: 'Zdrowotnym',
          label: 'Zdrowotnym',
          description: 'Których celem jest wyeliminowanie lub złagodzenie barier zdrowotnych utrudniających funkcjonowanie w społeczeństwie lub powodujących oddalenie od rynku pracy.'
        },
      ],
            pickerOptions: {
                firstDayOfWeek: 1,
                // disabledDate(time) {
                
                // var sunday = new Date(time).getDay() === 0; 
                // var saturday = new Date(time).getDay() === 6; 
                // return sunday + saturday + (time < new Date());
                
                // }
            },
            pickerOptionsBirth: {
                firstDayOfWeek: 1,
                disabledDate(time) {
                
                
                return (time > (new Date().setDate(new Date().getDate())));
                
                }
      },
            tableData: []
        }
    },

    created() {

        this.queryList()
    },

   

    methods: {

        reset(id) {

            this.tableData.find(x => x.id === id).name = this.tableData.find(x => x.id === id).draft.name

        },

        update(id) {

            var tempArray = this.tableData.find(x => x.id === id)

            console.log(tempArray)

            db.collection("submited").doc(id).update({
                names: tempArray.draft.names,
                birthdate: tempArray.draft.birthdate,
                age: tempArray.draft.age,
                phonenumber: tempArray.draft.phonenumber,
                city: tempArray.draft.city,
                street: tempArray.draft.street,
                postcode: tempArray.draft.postcode,
                startdate: tempArray.draft.startdate,
                starthour: tempArray.draft.starthour,
                destinationcity: tempArray.draft.destinationcity,
                destinationpostcode: tempArray.draft.destinationpostcode,
                destinationstreet: tempArray.draft.destinationstreet,
                destinationname: tempArray.draft.destinationname,
                ifround: tempArray.draft.ifround,
                neededtime: tempArray.draft.neededtime,
                ifdisabled: tempArray.draft.ifdisabled,
                disabilitylevel: tempArray.draft.disabilitylevel,
                reason: tempArray.draft.reason,
                ifwheelchair: tempArray.draft.ifwheelchair,
                ifwheelchairincar: tempArray.draft.ifwheelchairincar,
                ifhelp: tempArray.draft.ifhelp,
                additionalinfo: tempArray.draft.additionalinfo,
                checked: true,
                purpose: tempArray.draft.purpose,
                status: 'toconfirm'

            }).then(() => {
                this.queryList()
            })

        },

        queryList() {

            this.tableData = []

            var self = this

        db.collection("submited").orderBy('timestamp', 'desc')
            .get()
            .then((querySnapshot) => {
      
                querySnapshot.forEach(function(doc) {

                    var tempObj = doc.data()
                    tempObj.id = doc.id
                    tempObj.draft = {...tempObj}
                    
                    self.tableData.push(tempObj)
                   
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


        },

    statusChange(id) {

        

        var tempArray = this.tableData.find(x => x.id === id)

        if(this.tableData.find(x => x.id === id).status == 'toconfirm'){
                db.collection("submited").doc(id).update({
                status: 'confirmed'
            }).then(() => {
                this.queryList()
                this.sendSMS(tempArray.phonenumber, `Potwierdzamy zamówienie przejazdu w dniu ${tempArray.startdate} o godz. ${tempArray.starthour}. W pilnych wypadkach prosimy o kontakt z dyspozytorem (518900101).`)
            })
        } else if(this.tableData.find(x => x.id === id).status == 'confirmed') {
            db.collection("submited").doc(id).update({
                status: 'completed'
            }).then(() => {
                this.queryList()
            })
        } else if(this.tableData.find(x => x.id === id).status == 'deleted') {

            db.collection("submited").doc(id).update({
                status: 'toconfirm'
            }).then(() => {
                this.queryList()
            })

        }
        

    },

    duplicate(id) {

        db.collection("submited").doc(id).get().then((doc) => {
        

            db.collection("submited").add({

                ...doc.data(),
                status: 'toconfirm',
                timestamp : Date.now()

             }).then(() => {
                 location.reload();
             })

        }).catch((error) => {
                console.log("Error getting document:", error);
        });
    },

    statusDelete(id) {

        db.collection("submited").doc(id).update({
            status: 'deleted'
        }).then(() => {
            this.queryList()
        })

    },


      tableRowClassName({row, rowIndex}) {
     
        if (row.status === 'toconfirm') {
          return 'warning-row';
        } else if (row.status === 'confirmed') {
          return 'success-row';
        } else if (row.status === 'completed') {
          return 'completed-row';
        } else if (row.status === 'deleted') {
          return 'deleted-row';
        }
        return '';
      },

      print(id) {
                    // Get HTML to print from element
            const prtHtml = document.getElementById('print-' + id).innerHTML;

            const newHtml = '<img style="text-align: center; width: 100%" src="https://firebasestorage.googleapis.com/v0/b/przejazdy-mielno.appspot.com/o/logotypes_z1.png?alt=media&token=3cf49c6b-7520-4fc4-a4bd-3ed85849af11"><p style="text-align: center">Usługi indywidualnego transportu door-to-door oraz poprawa dostępności architektonicznej wielorodzinnych budynków mieszkalnych</p><br/><hr><br/><p style="text-align: right">Załącznik nr 1 do Regulaminu</p>'

            const newHtml2 = newHtml.concat(prtHtml)

            const newHtml3 = newHtml2.concat('<div style="margin: 10px; padding: 25px"><p><b>Oświadczenie wnioskodawcy dotyczące danych zawartych we wniosku</b></p><p>Jest mi wiadome, że wystąpienie okoiczności wskazująych na niezgodność ze stanem faktycznym i prawnym informacji podanych we wniosku może skutkować odrzuceniem wniosku lub wstrzymaniem poprzednio przyznanego przewozu.</p></div><div style="margin: 10px; padding: 25px; float: right"><p style="font-size: 12px; text-align: center">......................................................<br/>podpis</p></div><div style="position: absolute; bottom: 10px;">"<hr><img style="text-align: center; width: 100%" src="https://firebasestorage.googleapis.com/v0/b/przejazdy-mielno.appspot.com/o/logotypes_z2.png?alt=media&token=da8aecf4-4f83-401d-900f-dbd62ca58828"></div>')

            console.log(newHtml2)

            // Get all stylesheets HTML
            let stylesHtml = '';
            for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
            stylesHtml += node.outerHTML;
            }

            // Open the print window
            const WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');

            WinPrint.document.write(`<!DOCTYPE html>
            <html>
            <head>
                ${stylesHtml}
            </head>
            <body>
                ${newHtml3}
            </body>
            </html>`);

            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            
                },

                sendSMS(receiver, text) {

                var module = require('serwersms.pl');

                    try{

                        var object = module.serwerSMS('webapi_przejazdymielno','ccafc8af');
                        var messages = object.oMessages;

                        // SMS FULL

                        var params = new Object();

                        params.phone  = [receiver];
                        params.text   = text;
                        params.sender = 'INFORMACJA'; 
                        params.details = true;
                        params.test = false;

                        var callback = function(data){

                            var obj = JSON.parse(data);
                            console.log(obj);
                        }
                        messages.sendSms(params,callback);

                    
                
                }catch(err) {
                        console.log(err.message);
                    }
         }
    },

}
</script>

<style lang="scss">

.dashboard-main-container {
  background-color: #E5E5E5;
  width: 100vw;
  height: 100%;
  min-width: 100%;
  min-height: 100vh;
  display: flex;
}

.dashboard-table {
    width: 100%;
    max-width: 1400px;
    margin: 100px 20px 50px 20px
}

.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }

.el-table .completed-row div {
    opacity: 0.4;
}

.el-table .deleted-row div {
    opacity: 0.4;
}

.expand-container {

     display: flex;
     justify-content: space-evenly;;

}

.button-container {
    margin: 25px;
    display: flex;
    justify-content: flex-end;
}

.expand-container__item {
    margin: 25px;
    padding: 10px;
}

.el-table__expanded-cell[class*=cell] {
    padding: 50px 50px;
}

.expand-table {


    &__tr {
        
    }

    &__td {
        min-width: 200px !important;
    }
}

</style>