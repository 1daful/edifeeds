<template lang="pug">
  
#app
  transition(name="fade")
    .loader-overlay(v-if="loading")
      .loader
      h2 Fetching movie data
  transition(name="slide-fade" appear)
    .movie(id="movie-card" v-if="!loading")
      movie-data(:movie="movie" :error="error")
      input.movie__search(id="movie-search" type="text" placeholder="Enter a movie title" @keyup.enter="searchHandler")
    
template(id="tpl-movie-data" v-if="!loading")
  .movie__data
    .movie__poster(v-if="!error")
      span.movie__poster--fill
        transition(name="fade")
          img(:src="movie.Poster" @load="imgLoaded" v-show="showImg")
      span.movie__poster--featured
        transition(name="fade")
          img(:src="movie.Poster" @load="imgLoaded" v-show="showImg")
    .movie__details(v-if="!error")
      h2.movie__title {{movie.Title}}
      ul.movie__tags.list--inline
        li.movie__rated {{movie.Rated}}
        li.movie__year {{movie.Year}}
        li.movie__genre {{movie.Genre}}
      p.movie__plot {{movie.Plot}}
      .movie__credits
        p <strong>Written by:</strong> {{movie.Writer}}
        p <strong>Directed by:</strong> {{movie.Director}}
        p <strong>Starring:</strong>
        ul.movie__actors.list--inline
          li(v-for="actor in movie.Actors") {{actor}}
    .movie__error(v-show="error")
      h2 {{movie.Error}}
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

const key = '2fb7569a';
const defaultTitle = 'stargate';
const url = `https://www.omdbapi.com/?apikey=${key}&t=`;


var app = new Vue({
  el: '#app',
  
  data: {
    movie: {},
    loading: true,
    error: false
  },
  
  methods: {
    findMovie: function(title) {
      this.error = false;
      this.loading = true;
      
      fetch(url + title).then(res => res.json()).then(data => {
          this.movie = data;
          if (this.movie.Actors) this.movie.Actors = data.Actors.split(', ');
          if (this.movie.Error) this.error = true;
          this.loading = false;
      }).catch(err => {
        this.error = true;
        this.loading = false;
      });
    },
    
    searchHandler: function(e) {
      if (e.target.value) {
        this.findMovie(e.target.value);
        e.target.blur();
      }
    },
  },
  
  mounted() {
    this.findMovie(defaultTitle);
  },
})

export default defineComponent ({
  name: 'movie-data',
  props: ['movie', 'error'],
  template: '#tpl-movie-data',
  
  data: function() {
    return {
      showImg: false
    }
  },
    
  methods: {
    imgLoaded: function() {
      this.showImg = true;
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Lato:400,900');

$font-body: 'Lato', sans-serif;
$font-heading: $font-body;
$base-spacing: 12px;
$base-radius: 0.8em;
$base-trans-spd: 0.4s;
$poster-width: 140px;
$poster-span: 200px;
$bp-md: 600px;
$bp-sm: 400px;

* {
  box-sizing: border-box;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $base-spacing;
  min-height: 100vh;
  font-family: $font-body;
  background-color: whitesmoke;
}

h1, h2, p, ul {
  line-height: 1.2;
  
  &:not(:last-child) {
    margin-bottom: $base-spacing;
  }
}

p, li {
  font-size: 0.9em;
  line-height: 1.5;
}

p + ul {
  margin-top: -$base-spacing + 2px;
}

h1, h2, strong {
  font-weight: 900;
}

input {
  padding: 6px;
  font-family: $font-body;
  font-size: 16px;
  border: 1px solid gainsboro;
  border-radius: 2px;
  -webkit-appearance: none;
}

.list {
  &--inline li {
    display: inline-block;
    
    &:not(:last-child) {
      margin-right: $base-spacing;
    }
  }
}

.movie {
  position: relative;
  overflow: hidden;
  margin: $base-spacing auto;
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: $base-radius;
  box-shadow: rgba(black, 0.2) 0 30px 18px -24px;
}

.movie {
  &__data {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: $poster-span * 2;
      
    @media (min-width: $bp-md) {
      flex-direction: row;
    }
  }
  
  &__search {
    position: absolute;
    top: $base-spacing * 2;
    right: $base-spacing * 2;
    margin: auto;
    width: calc(100% - (#{$base-spacing} * 4));
    
    @media (min-width: $bp-sm) {
      max-width: 200px;
    }
  }
  
  &__tags {
    font-size: 0.75em;
    color: darkgray;
  }
  
  &__poster {
    position: relative;
    display: flex;
    width: 100%;
    transform: translateZ(0);
    
    @media (min-width: $bp-md) {
      margin-right: $base-spacing;
      width: $poster-span;
    }
    
    &--fill {
      position: absolute;
      overflow: hidden;
      top: -80%;
      bottom: -20%;
      left: -20%;
      width: 150%;
      height: 150%;
      background-color: gainsboro;
      transform: rotate(5deg);
      
      @media (min-width: $bp-md) {
        top: -20%;
        width: 100%;
      }
      
      img {
        filter: blur(6px);
        object-fit: cover;
        width: 100%;
        height: 100%;
        transform: scale(1.4);
      }
    }
    
    &--featured {
      position: relative;
      display: block;
      align-self: center;
      margin-top: $base-spacing * 7;
      margin-left: $base-spacing * 2;
      width: $poster-width;
      background-color: lightgray;
      border-radius: 2px;
      z-index: 1;
      
      @media (min-width: $bp-md) {
        left: $poster-width / 2.5;
        margin: auto;
      }
      
      img {
        display: block;
        width: 100%;
        box-shadow: rgba(black, 0.6) 0 6px 12px -6px;
        
        &[src="N/A"] {
          min-height: 206px;
          opacity: 0;
        }
      }
    }
  }
  
  &__details {
    flex: 1;
    padding: $base-spacing * 2;
    
    @media (min-width: $bp-md) {
      padding: $base-spacing * 6;
    }
  }
  
  &__title {
    font-family: $font-heading;
    font-size: 2em;
  }
  
  &__error {
    align-self: center;
    justify-self: center;
    width: 100%;
    text-align: center;
  }
}

.loader-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
  z-index: 100;

  * + * {
    margin-top: 6px;
  }
}

.loader {
  $size: 32px;
  $spd: 2s;
  position: relative;
  border-radius: 100%;
  width: $size;
  height: $size;
  
  &:before,
  &:after {
    content: "";
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-width: 4px;
    border-radius: 100%;
    border-style: solid;
  }
  
  &:before {
    border-color: inherit;
    opacity: .2;
  }
  
  &:after {
    border-bottom-color: transparent;
    border-left-color: inherit;
    border-right-color: transparent;
    border-top-color: transparent;
    transform: translateZ(0);
    animation: spin $spd infinite cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

// Animations and transitions
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1080deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $base-trans-spd;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: 
    opacity $base-trans-spd,
    transform $base-trans-spd;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>

