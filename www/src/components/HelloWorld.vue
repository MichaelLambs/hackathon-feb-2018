<template>
  <div class="home">
    <nav class="navbar navbar-light justify-content-between">
      <img src="../assets/logo.jpg" height="200">
      <input type="text" v-model="query" placeholder="look up grams by user">
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-lg btn-nav" data-toggle="modal" data-target="#exampleModal">
        <b>POST</b>
      </button>

      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">GranolaGram</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="createGram(gram)">
              <div class="modal-body">
                <input type="link" name="img" v-model="gram.img" placeholder="Image URL">
                <input type="text" name="username" v-model="gram.user" placeholder="Username">
                <input type="text" name="caption" v-model="gram.caption" placeholder="Gram Caption">
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <div class="granola-holder">
      <div class="container">
        <div class="list-group" v-for="gram in filterGrams">
          <gramtemplate :gramProp="gram"></gramtemplate>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import gramtemplate from "./gram.vue"
  export default {
    name: 'HelloWorld',
    data() {
      return {
        gram: {},
        query: ''
      }
    },
    methods: {
      createGram(gram) {
        console.log(gram)
        this.$store.dispatch('createGram', gram)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      grams() {
        return this.$store.state.grams
      },
      filterGrams(){
        return this.query.length>2? this.grams.filter(g=>
          g.user.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        ): this.grams
      },
      tidbits() {
        return this.$store.state.tidbits
      },


    },
    components: {
      gramtemplate
    }
  }
</script>

<!--  Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  background-color: #22244b;
}
.btn-nav {
  background-color: #3e91d6;
  color: white
}
.granola-holder{
  margin-top: 1rem;
}

</style>