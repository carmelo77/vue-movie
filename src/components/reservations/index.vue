<template>
	<div class="col-md-8 col-md-offset-2">
	<h2 class="text-primary">
		My Movies Reserved
	</h2>
		<table class="table table-striped table-bordered table-hover">
			<thead>
				<tr class="text-info">
					<th scope="col">Title</th>
					<th scope="col">Price</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="item in items">
					<td>{{ item.title }}</td>
					<td>{{ item.price }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import firebase from 'firebase'
import database from '../model/model'
	export default {
			data() {
					return {
							items: [],
							currentId: firebase.auth().currentUser,
					}
			},

			created() {
				var vm = this 

				database.ref().child('reserves').child(this.currentId.uid).on('value', function(snapshot) {
					let snap = snapshot.val();

					snapshot.forEach((snap) => {
						vm.items.push(snap.val())
					})
					
				})
			}
	}
</script>

<style>

</style>
