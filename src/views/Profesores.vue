<template>
  <div class="about">
<!--    <h1>This is an profesores page</h1>-->
    <v-form
        ref="form"
        lazy-validation
        class="pa-2"
        @submit.prevent="guardar"
    >
      <div class="row">
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.ci"
              label="Carnet"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.paterno"
              label="Paterno"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.materno"
              label="Materno"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.nombre"
              label="Nombre"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.especialidad"
              label="Especialidad"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-text-field
              outlined
              v-model="teacher.fechanac"
              label="Fechanac"
              required
          ></v-text-field>
        </div>
        <div class="col-3">
          <v-btn
              type="submit"
              color="success"
              class="mr-4"
          >
            Guardar
          </v-btn>
        </div>
      </div>

    </v-form>
    <table style="width: 100%" border="1">
      <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Expecialidad</th>
        <th>Fechanac</th>
        <th>Opciones</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(teacher,index) in teachers" :key="index">
        <td>{{index+1}}</td>
        <td>{{teacher.paterno}} {{teacher.nombre}} {{teacher.nombre}}</td>
        <td>{{teacher.especialidad}}</td>
        <td>{{teacher.fechanac}}</td>
        <td>
          <v-btn
              color="error"
              class="mr-4"
              @click="eliminar(teacher)"
          >
            Eliminar
          </v-btn>
          <v-btn
              color="warning"
              class="mr-4"
              @click="modificar(teacher)"
          >
            Modificar
          </v-btn>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data(){
    return {
      teachers:[],
      teacher:{},
      boolteacher:true
    }
  },
  mounted() {
    this.misdatos()
  },
  methods:{
    guardar(){
      if (this.boolteacher){
        this.$http.post('http://localhost:8000/api/teacher',this.teacher)
            .then(res=>{
              console.log(res)
              this.misdatos()
              this.teacher={}
            })
      }else{
        this.$http.put('http://localhost:8000/api/teacher/'+this.teacher.id,this.teacher)
            .then(res=>{
              console.log(res)
              this.misdatos()
              this.boolteacher=true
              this.teacher={}
            })
      }

      // console.log(this.teacher)
    },
    eliminar(t){
      this.$http.delete('http://localhost:8000/api/teacher/'+t.id)
          .then(res=>{
            console.log(res)
            this.misdatos()
          })
      // console.log(this.teacher)
    },
    misdatos(){
      this.$http.get('http://localhost:8000/api/teacher')
          .then(res=>{
            // console.log(res.data)
            this.teachers=res.data
          })
    },
    modificar(teacher){
      this.teacher=teacher
      this.boolteacher=false
    }
  }
}
</script>
