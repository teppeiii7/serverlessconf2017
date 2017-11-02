<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="form-group">
              <label for="title">タイトル</label>
              <input type="text" class="form-control" id="title" placeholder="Serverlessconf は、サーバーレスアーキテクチャを用いた...">
            </div>
            <button type="submit" class="btn btn-default" @click="addFeedAction">板つくる</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Feed',
    props: {},
    data() {
      return {
        msg: 'Comments',
        comments: [{
          text: 'Serverlessconf は、サーバーレスアーキテクチャを用いたアプリケーション構築における知見の共有を目的とした、コミュニティ主導の技術カンファレンスです。サーバーレスアーキテクチャは、開発者のひらめきやクリエイティビティを素早くWeb、モバイル、IoT、VUIアプリケーションなどとして実現ができ、スケーラビリティやセキュリティ、インフラの保守といった多数の力仕事から解放されることができる新たなパラダイムシフトです。'
        }]
      }
    },
    computed: {},
    methods: {
      load: function () {
        axios.get('http://headers.jsontest.com/').then((res) => {
          this.stub = res.data
        })
      },
      addFeedAction: function () {

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
