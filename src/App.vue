<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Add a Book</router-link>
  </nav>
  <router-view/>
</template>
<script>


</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
button{
  padding: 10px 30px;
  font-size: 24px;
  cursor: pointer;
  
	border-radius: 7px;
	border-bottom-left-radius: 0;
  
	background-color: grey;
}
</style>
