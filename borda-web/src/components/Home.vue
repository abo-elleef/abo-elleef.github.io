<template>
  <div class="hello">
    <div class="row">
      <div class="col s12 m6 offset-m3">
        <div class="card" v-for="(borda, index) in Bordas">
          <div class="card-content">
            <span class="card-title" v-on:click="openBorda(index)"> <i class="book-icon"></i>{{borda.author}}</span>
            <p>{{borda.desc}}</p>
          </div>
          <div class="card-action">
            <p>{{borda.chapters.length}}</p>
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
    name: 'Home',
    data () {
      return {
        Bordas: Bordas.Bordas
      }
    },
    methods: {
      openBorda: function (index) {
        this.$router.push({ name: 'ViewBorda', params: { borda_index: index } })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .book-icon {
    background-image: url('../assets/book.png');
    background-repeat: no-repeat;
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 10px 10px  0px;
  }
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
