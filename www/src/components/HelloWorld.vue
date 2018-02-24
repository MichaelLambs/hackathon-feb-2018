<template>
  <div class="home">
    <nav class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand">GranolaGram</a>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        POST
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
                <label for="username">username</label>
                <input type="text" name="username" v-model="gram.user">
                <label for="caption">caption</label>
                <input type="text" name="caption" v-model="gram.caption">
                <label for="img">img</label>
                <input type="link" name="img" v-model="gram.img">
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </nav>
    <gramtemplate></gramtemplate>

  </div>
</template>

<script>
  import Userprofile from "./Userprofile.vue"
  import gramtemplate from "./gram.vue"
  export default {
    name: 'HelloWorld',
    data() {
      return {
        gram: {}
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
    
      tidbits() {
        return this.$store.state.tidbits
      },


    },
    components:{
      gramtemplate
    }
  }
</script>

<!--  Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>