<template>
  <div class="container">
    <div class="row">
      <h1 class="pull-left text-info">
        Availables Movies
      </h1>

      <div class="col-md-12 pull-left movies-panel">
        <div class="panel panel-primary">
          <div class="panel-heading">
            Title: {{ name }}
          </div>
          <div class="panel-body">
            <img v-for="movie in movies" 
              @click="activate(movie)"
                :src="movie.image" width="15%"
                  :key="movie.name"
                    :class="{'movie-active': is_active == movie.id}">
          </div>
          <div class="panel-footer">
           Price: ${{ price }} - <button
            @click="store(id)" :class="className(id)"><i :class="classIcon(id)"></i></button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import bus from '../model/bus'
import firebase from 'firebase'
import database from '../model/model'
import swal from 'sweetalert2'
import $ from 'jquery'

let moviesRef = database.ref('reserves');
  export default {
    data() {
      return {
        movies: [
          {id: 1, name: 'Tarzan', image: 'http://4.bp.blogspot.com/_t2NLf0Xf0i4/SfIvJrvh3nI/AAAAAAAABP0/W05CL29Rb2A/s640/Tarzan_-_tt0120855__-_es_-_1999.jpg', price: 5.00},
          {id: 2, name: 'Piratas del Caribe', image: 'http://www.caratulasylogos.com/sites/default/files/piratas_del_caribe_en_mareas_misteriosas.jpg', price: 6.00},
          {id: 3, name: 'La era del hielo', image: 'https://vignette.wikia.nocookie.net/soundeffects/images/1/17/Ice_Age_Dawn_of_the_Dinosaurs_Poster.png/revision/latest/scale-to-width-down/250?cb=20151210174610', price: 5.00},
          {id: 4, name: 'Enrredados', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1DFmAjto-1xRFOAyC8KtvFeOEd4CtRk6k_CpuPxiLPkShjUg', price: 5.50},
          {id: 5, name: 'Thor', image: 'http://www.fasebonus.net/wp-content/uploads/2014/03/Thor-2-Ver.-Japonesa-280x400.jpg', price: 8.00}
        ], 

        is_active: 1,
        id: 1,
        name: 'Tarzan',
        price: '5.00',
        currentId: firebase.auth().currentUser,
        items: []
      }
    },

    mounted() {
      this.index()
    },

    methods: {

      className(id) {

        let found = this.items.map(f => f.movie_id)
        let data = found.indexOf(id)
        console.log('This result is: '+data)

        return [
          'btn',
            {'btn-primary': data === -1, 'btn-danger': data >= 0}
        ]
      },

      classIcon(id) {

        let found = this.items.map(f => f.movie_id)
        let data = found.indexOf(id)
        console.log('This result is: '+data)

        return [
          'fa',
            {'fa-check': data === -1, 'fa-close': data >= 0}
        ]
      },

      activate(movie) {
        this.is_active = movie.id
        this.name = movie.name
        this.price = movie.price
        this.id = movie.id
      },

      store(id) {
        let info = []
        let keys = []
        let vm = this

        let found = this.items.map(f => f.movie_id)
        let data = found.indexOf(id)

        if(data === -1) {

          moviesRef.child(this.currentId.uid).push({
            title: this.name,
            price: this.price,
            movie_id: id
          });

          vm.items.push({
            title: this.name,
            price: this.price,
            movie_id: id
          })

          swal('Movie reserved successfully!', '', 'success')

        } else {

          database.ref().child('reserves').child(this.currentId.uid).on('value', function(snapshot) {
            
            snapshot.forEach((data) => {
              info.push(data.val())
              keys.push(data.key)
            })
            
            let found = info.map(f => f.movie_id)
            let result = found.indexOf(id)

            database.ref('reserves')
              .child(vm.currentId.uid)
                .child(keys[result])
                  .remove()

            vm.items.splice(result, 1)
            swal('Movie reserved deleted!', '', 'error')
          })
        }
      },

      index() {
        let vm = this

				database.ref().child('reserves').child(this.currentId.uid).on('value', function(snapshot) {

					snapshot.forEach((data) => {
            vm.items.push(data.val())
					})
				})
      }
    }
  }

  $(document).ready(function(){
    $('.movies-panel').hide()
  })
</script>

<style>
  img {
    padding: 10px 10px;
    height: 220px;
    cursor: pointer;
  }

  .movie-active {
    background-color: green; 
    border: 1px solid;
  }
</style>