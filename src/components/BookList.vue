<template>
    <div>
      <h1>Book List</h1>
      <div>
        <input type="number" v-model="isbnMin" placeholder="Minimum ISBN">
        <input type="number" v-model="isbnMax" placeholder="Maximum ISBN">
        <input type="number" v-model="limitNum" placeholder="Limit">
        <select v-model="order">
          <option value="asc">ISBN Ascending</option>
          <option value="desc">ISBN Descending</option>
        </select>
        <button @click="fetchBooks">Search</button>
      </div>
      <ul>
        <li v-for="book in books" :key="book.id">
          <div v-if="book.editing">
            <input type="number" v-model="book.newIsbn" placeholder="New ISBN">
            <input type="text" v-model="book.newName" placeholder="New Name">
            <button @click="updateBook(book.id, book.newIsbn, book.newName)">Save</button>
            <button @click="cancelEdit(book)">Cancel</button>
          </div>
          <div v-else>
            {{ book.name }} - ISBN: {{ book.isbn }}
            <button @click="editBook(book)">Update</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue';
import db from '../Firebase/init.js';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const isbnMin = ref('');
    const isbnMax = ref('');
    const limitNum = ref(0); 
    const order = ref('asc'); 

    const fetchBooks = async () => {
      try {
        let booksRef = collection(db, 'books');
        let booksQuery = query(booksRef);

        if (isbnMin.value && isbnMax.value) {
          booksQuery = query(booksRef, where("isbn", ">=", Number(isbnMin.value)), where("isbn", "<=", Number(isbnMax.value)));
        }

        if (order.value === 'asc') {
          booksQuery = query(booksQuery, orderBy("isbn", "asc"));
        } else {
          booksQuery = query(booksQuery, orderBy("isbn", "desc"));
        }

        if (limitNum.value) {
          booksQuery = query(booksQuery, limit(Number(limitNum.value)));
        }

        const querySnapshot = await getDocs(booksQuery);
        books.value = querySnapshot.docs.map(doc => ({
          id: doc.id,  
          name: doc.data().name,
          isbn: doc.data().isbn
        }));
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };


    const deleteBook = async (bookId) => {
      try {
        await deleteDoc(doc(db, 'books', bookId));
        alert('Book deleted successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error deleting book: ', error);
        alert('Error deleting book: ' + error.message);
      }
    };

    const editBook = (book) => {
      book.editing = true;
    };

    const cancelEdit = (book) => {
      book.editing = false;
      book.newIsbn = book.isbn;
      book.newName = book.name;
    };

    const updateBook = async (bookId, newIsbn, newName) => {
      try {
        const bookRef = doc(db, 'books', bookId);
        await updateDoc(bookRef, {
          isbn: newIsbn,
          name: newName
        });
        alert('Book updated successfully!');
        fetchBooks();
      } catch (error) {
        console.error('Error updating book: ', error);
        alert('Error updating book: ' + error.message);
      }
    };


    onMounted(fetchBooks);

    return {
        books,
      isbnMin,
      isbnMax,
      limitNum,
      order,
      fetchBooks,
      deleteBook,
      editBook,
      cancelEdit,
      updateBook
    };
  }
};
</script>