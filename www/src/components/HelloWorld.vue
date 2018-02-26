<template>
  <div class="home">
    <nav class="navbar navbar-light justify-content-between">
      <img src="../assets/logo2.jpg" height="200">
      <div class="search-box">
        <h3>{{createdUser.username}}</h3>
        <h4>Search:</h4>
        <input type="text" v-model="query" placeholder=" Look up grams by user!">
      </div>
      <!-- button to login -->
      <!-- Button trigger login modal -->
      <button type="button" class="btn location-bottom btn-lg btn-nav" data-toggle="modal" data-target="#exampleModal">
        <b>Login</b>
      </button>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <img src="../assets/logo2.jpg" height="175">
            </div>
            <form @submit.prevent="createUser(createdUser)">
              <div class="modal-body">
                  <div>
                      <i class="fas mar-right fa-1x fa-user"></i>
                      <input type="text" name="username" v-model="createdUser.createdUser" placeholder=" Username" required>
                    </div>
                <div>
                  <input type="text" name="userEmail" v-model="createdUser.email" placeholder=" Email" required>
                </div>
                <div>
                    <i class="far mar-right fa-1x fa-edit"></i>
                  <input type="password" name="password" v-model="createdUser.password" placeholder=" Password">
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-lg btn-primary"><b>Create User</b></button>
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal"><b>close</b></button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <!-- Button trigger modal -->
      <button type="button" class="btn location-bottom btn-lg btn-nav" data-toggle="modal" data-target="#exampleModal">
        <b>POST</b>
      </button>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
                <img src="../assets/logo2.jpg" height="175">
              <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button> -->
            </div>
            <form @submit.prevent="createGram(gram)">
              <div class="modal-body">
                  <div>
                      <i class="fas mar-right fa-1x fa-user"></i>
                      <input type="text" name="username" v-model="gram.user" placeholder=" Username" required>
                    </div>
                <div>
                    <i class="far mar-right fa-1x fa-image"></i>
                  <input type="link" name="img" v-model="gram.img" placeholder=" Image URL" required>
                </div>
                <div>
                    <i class="far mar-right fa-1x fa-edit"></i>
                  <input type="text" name="caption" v-model="gram.caption" placeholder=" Gram Caption">
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-lg btn-primary"><b>post gram</b></button>
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal"><b>close</b></button>
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
        query: '',
        createdUser: {
          createdUser: ''
        }
      }
    },
    methods: {
      createGram(gram) {
        console.log(gram)
        this.$store.dispatch('createGram', gram)
        this.gram = {}
        $('#exampleModal').modal('hide')
      },
      createUser(userData){
        this.$store.dispatch('createUser', userData)
        this.createUser = {}
        $('#exampleModal').modal('hide')
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
.search-box{
  flex-basis: 25%;
  color: white;
}
.search-box input {
  height: 2.5rem;
  border-radius: 10px;
  width: 100%;
}
.btn-nav {
  background-color: #3e91d6;
  color: white
}
.granola-holder{
  margin-top: 1rem;
}
.modal-body input{
  width: 90%;
  margin:.2rem 0;
  border-radius: 10px;
  height: 2.5rem;
}
.mar-right{
  margin-right: .5rem
}
.modal-header{
  background-color: #22244b;
}
.modal-header img{
  margin: auto;
}

.location-bottom {
  justify-self: flex-end;
}

</style>