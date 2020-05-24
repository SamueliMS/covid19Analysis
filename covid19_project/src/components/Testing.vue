<template>
<v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
  <v-btn
      color="warning"
      @click="goPage"
    >
      Ir a análsis COVID-19      
    </v-btn>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Drop excel file here or
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">
        Browse
      </el-button>
    </div>
    <v-data-table
      :headers="headers"
      :items="hospitals"
      :items-per-page="5"
      class="elevation-1"
    >
    </v-data-table>
    <v-spacer></v-spacer>
  </div>
  <v-card
    class="mx-auto mt-12"
    max-width="450"
  >
    <v-system-bar></v-system-bar>

    <v-toolbar
      flat
      color="transparent"
    >
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search News"
        single-line
      ></v-text-field>
    </v-toolbar>

    <v-card-text class="py-0">
      <v-chip
        v-for="(keyword, i) in keywords"
        :key="i"
        class="mr-2"
        :href="path"
        target="_blank"
        @click="link"
      >
        {{ keyword }}
      </v-chip>
    </v-card-text>

    <v-list three-line>
      <v-list-item
        v-for="(item, i) in searching"
        :key="i"
        ripple
        :href="item.ubic"
        target="_blank"
      >
        <v-img
          :src="item.image"
          class="mr-4"
          max-width="64"
          min-width="64"
        ></v-img>

        <v-list-item-content>
          <span
            class="text-uppercase font-weight-regular caption"
            v-text="item.name"
          ></span>
          <span
            class="text-uppercase font-weight-regular caption"
            v-text="item.direction"
          ></span>
          <span
            class="text-uppercase font-weight-regular caption"
            v-text="item.tel"
          ></span>

          <div v-text="item.departament"></div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>

   <div>
        <div style="max-width: 800px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between">
            <div>
                <h1>Your coordinates:</h1>
                <p>{{ myCoordinates.lat }} Latitude, {{ myCoordinates.lng }} Longitude</p>
            </div>
            <div>
                <h1>Map coordinates:</h1>
                <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }} Longitude</p>
            </div>
        </div>
        <GmapMap
            :center="myCoordinates"
            :zoom="zoom"
            style="width:640px; height:360px; margin: 32px auto;"
            ref="mapRef"
            @dragend="handleDrag"
        ></GmapMap>
    </div>

  </v-form>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line    
  },
  data() {
    return {
      valid: true,
      loading: false,
      headers: [
          { text: 'Nombre', value: 'name' },
          { text: 'Direccion', value: 'direction' },
          { text: 'Telefono', value: 'tel' },
          { text: 'País', value: 'city' },
          { text: 'Departamento', value: 'departament' },
          //{ text: 'Ubicación', value: 'ubic' },
      ],
      hospitals:[],
      excelData: {
        header: null,
        results: null
      },
      path :'',
      search: '',
      location: '',
      item: [],

      //maps
      map: null,
        myCoordinates: {
            lat: 0,
            lng: 0
        },
        zoom: 7

    }
  },
  computed: {
      keywords () {
        if (!this.search) return []

        const keywords = []

        for (const search of this.searching) {
          keywords.push(search.keyword)
        }

        return keywords
      },
      searching () {
        if (!this.search) return this.hospitals

        const search = this.search.toLowerCase()

        return this.hospitals.filter(item => {
          const text = item.departament.toLowerCase()
          return text.indexOf(search) > -1
        })
      },

       mapCoordinates() {
          if(!this.map) {
              return {
                  lat: 0,
                  lng: 0
              };
          }
          return {
              lat: this.map.getCenter().lat().toFixed(4),
              lng: this.map.getCenter().lng().toFixed(4)
          }
      }
    },

  methods: {
    goPage() {
              this.$router.push('/principal');
        },
     link(){
       this.item.direction
       this.keywords;
       this.search;
       this.path =  this.location
      },
    generateData({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results 

      results.forEach(element => {
        var dataSetLocal =  {name:'',direction: '',tel: 0,city: '',departament: '',ubic: '',};
          dataSetLocal.name = element.Nombre;
          dataSetLocal.direction = element.Direccion;
          dataSetLocal.tel = element.Telefono;
          dataSetLocal.city = element.Pais;
          dataSetLocal.departament = element.Departamento;
          dataSetLocal.ubic = element.Ubicación; 
        this.hospitals.push(dataSetLocal) 
        // this.city.push(dataSetLocal.city)
        // this.departament.push(dataSetLocal.departament)
        // this.hospital.push(dataSetLocal.name)
        
      });    
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return
      this.upload(rawFile)
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }
      const before = this.beforeUpload(rawFile)
      if (before) {
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'array' })
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.getHeaderRow(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    },

    //Mapas***************************+
    handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
  },
  created() {
            // does the user have a saved center? use it instead of the default
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                // get user's coordinates from browser request
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
            }
            // does the user have a saved zoom? use it instead of the default
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
        },
        mounted() {
            // add the map to a data object
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        },
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>