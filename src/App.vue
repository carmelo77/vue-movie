<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <div class="row">
        <router-view/>
      </div>
    </div>
      
    <footer class="text-center">
      &copy - 2018
    </footer>
  </div>
</template>

<script>
import navbar from './components/partial/navbar'

export default {
  
  components: { navbar },

  data() {
    return {
      
    }
  }
}
</script>

<style>
  footer {
    border-top: 1px solid;
    padding: 18px;
    margin-top: 185px;
    background-color: #62B1E1;

  }
</style>
