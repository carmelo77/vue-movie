<template>
  <div class="col-md-8 col-md-offset-2">
    <div class="panel panel-primary">
      <div class="panel-heading">
        Registrate en el sistema
      </div>
      <div class="panel-body">
        <form @submit.prevent="onSubmit()">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" v-model="name" id="name" placeholder="Name">
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" v-model="email" id="email" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="password" id="password" placeholder="Password">
          </div>
          <button class="btn btn-info">Save</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Database from './model/model'
import swal from 'sweetalert2'
import * as firebase from 'firebase'

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: ''
      }
    },

    methods: {
      onSubmit: function() {

        var vm = this

        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            user.updateProfile({
              displayName: vm.name,
            })

            this.$router.push('/')
            swal('Has register successfully!', '' , 'success')

          }).catch(error => {
            swal(error.message, '', 'error')
          })

          
      },
    }
  }
</script>

<style>
  
</style>