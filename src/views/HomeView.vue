<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
    import{ db } from "@/firebase";
    import { collection, DocumentSnapshot, getDocs } from "@firebase/firestore";

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  
async mounted(){
  const querySnapshot = await getDocs(collection(db, "books"));

querySnapshot.forEach((doc) => {
   this.books.push({id: doc.id, ...doc.data()})
  
});

},
data(){
  return{
    books:[],
  }
}
}
</script>
