<template>
  <h1>About Page</h1>
  <hr>
  <h2>{{ name }}</h2>
  <button @click="onChangeName">
    Cambiar nombre
  </button>
</template>

<script>
export default {

  data() {
    return {
      name: 'Jose'
    }
  },
  methods: {
    onChangeName() {
      this.name = 'Andrés'
    }
  },
  // ejecutar algún tipo de validación antes de que el componente se cree
//   beforeCreate() {
//     console.log('beforeCreate')
//   },
//   created() {
//     this.name = 'Juan Carlos' // esta orden en beforeCreate no tendría efecto. Todavía no existe el data
//     console.log('created')
//     // Peticiones HTTP
//   },
//   beforeMount() {
//     console.log('beforeMount')
//   },
//   mounted() {
//     console.log('mounted')
//   },
//   beforeUpdate() {
//     console.log('beforeUpdate')
//   },
//   updated() {
//     console.log('updated')
//   },
//   activated() {
//     console.log('activated')
//   },
//   deactivated() {
//     console.log('deactivated')
//   },
//   beforeUnmount() {
//     console.log('beforeUnmount')
//   },
//   unmounted() {
//     console.log('unmounted')
//   },
//   errorCaptured() {
//     console.log('errorCaptured')
//   },
//   renderTracked() {
//     console.log('renderTracked')
//   },
//   renderTriggered() {
//     console.log('renderTriggered')
//   },
}
</script>
