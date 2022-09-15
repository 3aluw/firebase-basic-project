<template>

  <nav>
    <div class="search-bar-cont">
      
    
    </div>
  </nav>
<div class="cards-container">
  <div class="book-card" v-for="book in books">
   <span>{{book.title}}</span>
   <span>{{book.author}} </span>
  </div>
</div>
<div class="delete-container">
  <form  class="delete-form">
    <label for="book-name">Enter the book name to delete:</label>
  <input type="text" id="book-name"  v-model="bookToDelete" >
  <button @click="deleteBook">Delete the book</button>

  </form>
</div>
<transition>
<p v-show="showAlert" class="alert" >There is no book with this name</p>
</transition>
</template>

<script>
    import{ db } from "@/firebase";
    import { collection, getDocs, doc, deleteDoc, onSnapshot } from "@firebase/firestore";

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  
async beforeCreate(){

  const unsub = onSnapshot(collection(db, "books"), (docs) => {
    this.books=[];
    console.log(docs,docs.docs)
   docs.forEach((doc) => {
   this.books.push({id: doc.id, ...doc.data()})
  
});
});
//getDocs function
  /*
  const querySnapshot = await getDocs(collection(db, "books"));

querySnapshot.forEach((doc) => {
   this.books.push({id: doc.id, ...doc.data()})
  
});
console.log(this.books)*/
},
data(){
  return{
    books:[],
    bookToDelete:null,
    showAlert: false,
  }
},
methods:{
  async deleteBook(){
    let book =   this.books.find((el)=>el.title === this.bookToDelete)
    try{ 
      book.id
    }
    catch{
      this.showAlert = true;
      setTimeout(()=>{ this.showAlert = false},3000);
      return undefined;
    }
    await deleteDoc(doc(db, "books", book.id));

 
  }
},

}
</script>
<style>
  .cards-container{
    display: flex;
    gap: 1rem;

  }
  .delete-form{
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
  }
  .book-card{
    padding: .5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 5px;
    border: 2px black solid ;
  }
  .alert{
  position: absolute;
  bottom: 0;
  left: 0;
  width:50%;
  margin:20px auto;
  padding:30px;
  border-radius:5px;
  box-shadow:0 0 15px 5px #ccc;
  background-color: #f7a7a3;
  border-left: 5px solid #8f130c;
  
  
}
.trans-alert{
  transition: all 5s ease-in-out ;
  opacity: 1;
  
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>