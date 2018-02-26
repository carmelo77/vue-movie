<template>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand" href="#">Movie's Cinema</a>
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
	      <ul class="nav navbar-nav">
	        <li>
	        	<router-link to="/" v-if="!auth">
	          		Login
	          	</router-link></li>
            <li>
	          	<router-link to="/register" v-if="!auth">
	          		Register
	          	</router-link>
	          </li>
	        <li>
						<router-link to="/movies" v-if="auth">
							Movies
						</router-link></li>
					</li>
					<li>
						<router-link to="/reservations" v-if="auth">
							My reservations
						</router-link></li>
					</li>
					<li><a href="#" @click="logout()" v-if="auth">Logout</a></li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
	</nav>
</template>

<script>
import firebase from 'firebase'
import swal from 'sweetalert2'
import bus from '../model/bus'
	export default {
		data() {
			return {
				auth: false
			}
		},

		created() {
			this.verify()

			bus.$on('unathenticated', () => {
				this.auth = false
			});
		},

		methods: {
			verify() {
				firebase.auth().onAuthStateChanged(user => {
					if(user) {
						this.auth = true
					}
				})
			},
			logout: function() {
				firebase.auth().signOut()
				bus.$emit('unathenticated')
				this.$router.replace('/')
			}
		}

	}
	
</script>

<style>
	
</style>