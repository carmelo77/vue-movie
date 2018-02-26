<template>
  <div class="col-md-12">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-primary">
        <div class="panel-heading">
          Ingresa al sistema
        </div>
        <div class="panel-body">
          <form>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" v-model="password" placeholder="Password">
            </div>
            <button class="btn btn-info" @click.prevent="signin()">Log-in</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import swal from 'sweetalert2'
import bus from './model/bus'

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },

    methods: {

      signin: function() {

        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
					.then(user => {
						if(user) {
							this.$router.push('/movies')
							swal(user.displayName+' has ingresado al sistema!', '', 'success')
							return
						}
					}).catch(function(e) {
						swal(e.message, '', 'error')
					})
      }
    }
  }
</script>

<style>
  
</style>