<template>

  <nav>
    <div class="search-bar-cont">
    <input @keyup.enter="searchHandler" placeholder="seacrh a book" v-model="searchedBook" @blur="showSearchList=false; searchArray = []">
    <ul class="search-list" v-show="showSearchList">
      <li v-for="book in searchArray">
      <strong>{{book.title}}</strong><br>
      <small> by: {{book.author}}</small>
      </li>
    </ul>
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
    import { collection, getDocs, doc, deleteDoc, onSnapshot, query, where, orderBy } from "@firebase/firestore";

// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },

data(){
  return{
    searchedBook : null,
    searchArray:[],
    showSearchList : false,

    books:[],
    bookToDelete:null,
    showAlert: false,
    alertMessage:"",
    
  }
},
methods:{
  //querrying data
  async searchHandler(){
    
   const q = query(collection(db,"books"), where("title", "==", this.searchedBook),orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.docs.length){
querySnapshot.forEach((doc) => {
  this.showSearchList = true;
  this.searchArray.push({...doc.data(), id: doc.id})
  console.log(this.searchArray);
});}
else{
this.showAlert = true;
setTimeout(()=>{ this.showAlert = false},3000);
}

  },
  //deleting data
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
  //retriving data
async beforeCreate(){

  const unsub = onSnapshot(collection(db, "books"), (docs) => {
    this.books=[];
 
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
input{
  font-size:18px;
  padding:10px 10px 10px 5px;
  display:block;
  width:300px;
  border:none;
  border-bottom:1px solid #757575;
}
input:focus{
  border: none;
  outline: 1px dashed rgba(170, 50, 220, .6);
border-radius: 2rem;
}
.search-bar-cont{
  position: relative;

}
.search-list{
  list-style: none;
  position: absolute;
  width:300px;
  background-color: whitesmoke;
  margin-top: 5px;
  padding: 10px;
}

</style>