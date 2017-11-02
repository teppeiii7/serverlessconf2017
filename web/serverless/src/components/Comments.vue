<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>ITA</h2>
    <ul>
      <li><router-link to="/">Serverless2017</router-link></li>
      <li><router-link to="/">Serverless2016</router-link></li>
      <li><router-link to="/">Serverless2015</router-link></li>
      <li><router-link to="/">Serverless2014</router-link></li>
      <li><router-link to="/">Serverless2013</router-link></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Comments',
  data () {
    return {
      msg: 'Hello serverless2017'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-flex;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
