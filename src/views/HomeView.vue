<template>
<div class="cards-container">
  <div class="book-card" v-for="book in books">
   <span>{{book.title}}</span>
   <span>{{book.author}} </span>
  </div>
</div>
</template>

<script>
    import{ db } from "@/firebase";
    import { collection, getDocs } from "@firebase/firestore";

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
<style>
  .cards-container{
    display: flex;
    gap: 1rem;
  }
  .book-card{
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 5px;
    border: 2px black solid ;
  }
</style>