<template>
  <div class="mx-auto" style="max-width: 560px;">
    <h1 class="text-center mt-0 mb-4">Add Book</h1>

    <form @submit.prevent="addBook" class="d-flex flex-column gap-3">
      <div>
        <label for="isbn" class="form-label">ISBN:</label>
        <input id="isbn" v-model="isbn" type="text" class="form-control" required />
      </div>

      <div>
        <label for="name" class="form-label">Name:</label>
        <input id="name" v-model="name" type="text" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary align-self-center px-4">Add Book</button>
    </form>

    <div class="mt-5">
      <BookList />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import db from '../Firebase/init.js';
import { collection, addDoc } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

export default {
  components: { BookList },
  setup() {
    const isbn = ref('');
    const name = ref('');

    const addBook = async () => {
      try {
        const isbnnumber = Number(isbn.value);
        if (isNaN(isbnnumber)) {
          alert('ISBN must be a valid number');
          return;
        }
        await addDoc(collection(db, 'books'), {
          isbn: isbnnumber,
          name: name.value   // Cloud Function 会把字符串字段统一转成大写
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully');
      } catch (error) {
        console.error('Error adding book:', error);
      }
    };

    return { isbn, name, addBook };
  }
};
</script>
