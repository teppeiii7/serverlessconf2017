<template>
  <div class="hello">
     <div class="container">
      <div class="row">
        <h1 v-on:dblclick="load">{{ msg }}</h1>
        <div>{{ stub }}</div>
        <div class="col-md-12">
          <ul class="list-group" v-for="(comnent, index) in comments" v-bind:key="index">
            <li class="list-group-item">{{ comnent.text }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Comments',
  props: {},
  data () {
    return {
      msg: 'Comments',
      comments: [
        {text: 'Serverlessconf は、サーバーレスアーキテクチャを用いたアプリケーション構築における知見の共有を目的とした、コミュニティ主導の技術カンファレンスです。サーバーレスアーキテクチャは、開発者のひらめきやクリエイティビティを素早くWeb、モバイル、IoT、VUIアプリケーションなどとして実現ができ、スケーラビリティやセキュリティ、インフラの保守といった多数の力仕事から解放されることができる新たなパラダイムシフトです。'}
      ]
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
