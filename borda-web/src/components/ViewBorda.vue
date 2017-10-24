<template>
  <div class="hello">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card" v-for="(chapter, index) in borda.chapters">
          <div class="card-content">
            <span class="card-title" v-on:click="openChapter(index)"> <i class="book-icon"></i>{{chapter.author}}</span>
            <p>{{chapter.desc}}</p>
          </div>
          <div class="card-action">
            <p>{{chapter.lines.length}}</p>
            <a href="#">مشاركة القصيدة</a>
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li><a href="https://www.facebook.com/bordaelmadyh/" target="_blank">تابعنا علي فيس بوك</a></li>
      <li><a href="https://twitter.com/bordaelmadyh" target="_blank">تابعنا علي تويتر</a></li>
      <li><a href="https://play.google.com/store/apps/details?id=com.ionicframework.borda215096" target="_blank">تحميل تطبيق اندرويد</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import Bordas from '../Bordas'
  export default {
    name: 'ViewBorda',
    data () {
      return {
        borda: Bordas.Bordas[this.$route.params.borda_index]
      }
    },
    methods: {
      openChapter: function (index) {
        this.$router.push({name: 'ChapterDetails', params: {borda_index: this.$route.params.borda_index, chapter_index: index}})
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
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
