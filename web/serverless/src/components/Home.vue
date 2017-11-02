<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <h1 v-on:dblclick="load">{{ msg }}</h1>
        <div>{{ stub }}</div>
        <div class="col-md-12">
          <ul class="list-group" v-for="(feed, index) in feeds" v-bind:key="index">
            <li class="list-group-item"><router-link to="/comments">{{ feed.title }}</router-link></li>
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
      msg: 'Serverlessconf 2017',
      feeds: [
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'},
        {title: 'serverless2017'}
      ],
      stub: {}
    }
  },
  computed: {},
  methods: {
    load: function () {
      axios.get('http://headers.jsontest.com/').then((res) => {
        this.stub = res.data
      })
    }
  },
  mounted: function () {
    this.load()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
