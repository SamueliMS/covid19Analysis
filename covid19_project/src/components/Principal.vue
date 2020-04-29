<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-col cols="12" sm="6" md="4">
      <v-menu
        ref="to_menu"
        v-model="to_menu"
        :close-on-content-click="false"
        :return-value.sync="to_date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="to_date"
            label="Seleccione fecha de inicio"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="to_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="to_menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.to_menu.save( to_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>
    
    <v-col cols="12" sm="6" md="4">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="date"
            label="Seleccione fecha de final"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
    <v-spacer></v-spacer>

    <v-btn
      color="warning"
      @click="getData"
    >
      Extaer datos      
    </v-btn>
    

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="processData"
    >
      Llenar tabla
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Resetear Formulario
    </v-btn>

    

    <v-data-table
      :headers="headers"
      :items="dataSet"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-form>
</template>

<script>

import axios from 'axios'

  export default {
    data: () => ({
      //date
      to_date: new Date().toISOString().substr(0, 10),
      date: new Date().toISOString().substr(0, 10),      
      to_menu: false,
      menu: false,

      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,

    //Table
      headers: [
          {
            text: 'Dates',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          { text: 'Country', value: 'country' },
          { text: 'Confirmated Cases', value: 'active' },
          { text: 'Deaths Cases', value: 'deaths' },
          { text: 'Recovered Caases', value: 'recovered' },
      ],

      dataSet: [],

      //Data
      content:[],
      datas: []
    }),

    methods: {
      reset () {
        this.dataSet = [];
      },
      //Return country and date interval
       getData(){         
        axios.get('https://cors-anywhere.herokuapp.com/'+'https://api.covid19tracking.narrativa.com/api/country/guatemala?date_from='+ this.to_date+'&date_to='+this.date).then(
          Response =>{                        
            var data = Response.request.response
            this.content = JSON.parse(data);
            alert("Datos extaidos");  
          }).catch(e =>alert(e))
      },

      processData(){
         var dates = this.content.dates;
         for (const key in dates) {
           if (dates.hasOwnProperty(key)) {
              const element = dates[key];
              this.datas = element.countries.Guatemala;
              this.workData();             
           }
         }
         alert("Datos insertados a tabla correctamente");
      },

      workData(){        
        var dataSetLocal =  {date:'',country: '',active: 0,deaths: 0,recovered: 0,};
          dataSetLocal.date = this.datas.date;
          dataSetLocal.country = this.datas.name;
          dataSetLocal.active = this.datas.today_confirmed;
          dataSetLocal.deaths = this.datas.today_deaths;
          dataSetLocal.recovered = this.datas.today_recovered         
        this.dataSet.push(dataSetLocal);        
      }
    },
  }
</script>