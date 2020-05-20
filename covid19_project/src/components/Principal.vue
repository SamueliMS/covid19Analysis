<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-container fluid>
    <v-row justify="space-around">
      
      <v-col cols="5">
        <div class="title mb-1">Guatemala</div>
        <div class="subheading">17,25 Millones de Habitantes</div>
        <v-img src="data:image/png;base64,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" aspect-ratio="2" contain></v-img>
       </v-col>
    </v-row>
  </v-container>

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

    <v-spacer></v-spacer>

    <pure-vue-chart
      :points= y
      :show-y-axis="true"
      :show-x-axis="true"
      :width="1300"
      :height="450"
      :show-values="true"
      :show-trend-line="true"
      :trend-line-width="7"
      trend-line-color="lightblue"
      
    />
    <v-spacer></v-spacer>
    <div class="title mb-1">Proyección</div>

    <v-col cols="12" sm="6" md="3">
      <v-text-field
        v-model="numDay"
        label="Ingresar días de proyección"
        outlined
      ></v-text-field>
    </v-col>

    <v-btn
      color="warning"
      @click="predictiveAnalysis"
    >
      Ejecutar Proyección      
    </v-btn>
    <v-spacer></v-spacer>

    <pure-vue-chart
      :points= proyection
      :show-y-axis="true"
      :show-x-axis="true"
      :width="1300"
      :height="450"
      :show-values="true"
      :show-trend-line="true"
      :trend-line-width="7"
      trend-line-color="lightblue"
      
    />
  </v-form>
</template>

<script>

import axios from 'axios'
import PureVueChart from 'pure-vue-chart';

  export default {
    components: {
      PureVueChart,
      },
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
      datas: [],
      

      //Graphic
      y:[],
      proyection: [],
      numDay: 0,
    }),

    methods: {
      reset () {
        this.dataSet = [];
        this.y = [];
        this.proyection = []; 
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
        var yLocal = {label: '', value: 0}
          dataSetLocal.date = this.datas.date;
          dataSetLocal.country = this.datas.name;
          dataSetLocal.active = this.datas.today_confirmed;
          dataSetLocal.deaths = this.datas.today_deaths;
          dataSetLocal.recovered = this.datas.today_recovered   

          yLocal.label = this.datas.date;
          yLocal.value = this.datas.today_confirmed;          
          
        this.dataSet.push(dataSetLocal); 
        this.y.push(yLocal);       
      },

      predictiveAnalysis(){
        this.proyection = [];        
        var n = this.y.length;
        var suma = 0;
        var prediction = this.y;
        
        
        
        for (const key in prediction) {
           if (prediction.hasOwnProperty(key)) {
              const element = prediction[key];
               suma = suma + element.value;                 
           }
         }

        //  var promedio = suma/n;
        //  promedio = parseInt(promedio);

        var buff = n-1;
        var last = prediction[buff];
        var lastDay = 0;
        var lastValue = last.value; 

        var promedio = lastValue/n;
         promedio = parseInt(promedio);
        

        
         for (let index = 0; index < this.numDay; index++) {
           var cathchProyevtion = {label: 0, value: 0}
           lastDay = lastDay + 1;
           lastValue = lastValue + promedio;
           cathchProyevtion.label = lastDay;
           cathchProyevtion.value = lastValue;  
           this.proyection.push(cathchProyevtion);       
          
         }
         this.proyection;
         

      }
    },
  }
</script>