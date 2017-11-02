<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <h1 v-on:dblclick="load">{{ msg }}</h1>
        <div>{{ stub }}</div>
        <div class="col-md-12">
          <ul class="list-group" v-for="(feed, index) in feeds" v-bind:key="index">
            <li class="list-group-item">
              <router-link to="/feeds">{{ feed.title }} : {{ feed.img_url }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Home',
    props: {},
    data () {
      return {
        msg: 'Home',
        feeds: [],
        stub: {},
        error: {}
      }
    },
    computed: {},
    methods: {
      load: function () {
        const self = this
        self.error = {}
        self.feeds = []
        axios.get('https://wrctegoz0l.execute-api.ap-northeast-1.amazonaws.com/api/feeds', {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            self.feeds = res.data.Items
          })
          .catch(error => {
            self.error = error
          })
      }
    },
    mounted: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
