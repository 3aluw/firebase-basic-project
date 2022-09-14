<template>
<div class="container">
  <form class="add-form" >
  <label for="book-name">Enter your book name:</label>
  <input type="text" id="book-name"  v-model="bookName">
  <label for="author-name">Enter the name of the author:</label>
  <input type="text" id="author-name"  v-model="authorName" >
  <button @click="addBook()">Create a new books</button>
</form>
<transition>
<p v-show="showAlert" class="alert" >Book isn't created. palease fill all the fields</p>
</transition>
</div>
</template>
<script>
  import{db} from "@/firebase"
  import {addDoc, collection} from "@firebase/firestore"

  export default {
    name:"AboutView",
    data(){
      return{
bookName: null,
authorName: null,
showAlert : false,
      }
    },
    methods:{
     async addBook(){
        if(this.bookName && this.authorName ){
         await addDoc(collection(db,"books"),{
            title: this.bookName,
            author: this.authorName
          })
          this.bookName = this.authorName = null
        }else{
        this.showAlert = true;
        setTimeout(()=>{ this.showAlert = false},3000)
        }
      }
    }

  }
</script>
<style>
.container{
  min-height: 80vh;
display: flex;
justify-content: center;
align-items: center;  

}
.add-form{
  display: flex;
  flex-direction: column;
  gap:0.5rem;

}
button{
  margin: 0.7rem ;
  padding: .3rem;
  cursor: pointer;
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
