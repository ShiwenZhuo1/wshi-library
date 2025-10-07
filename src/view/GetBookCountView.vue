<template>
  <div id="app" class="container mt-4">
    <h2>Book Counter</h2>
    <button @click="getBookCount">Get Book Count</button>
    <p v-if="Count !== null">Total number of Books: {{ Count }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      Count: null,
      error: null
    };
  },
  methods: {
    async getBookCount() {
      try {
        const response = await axios.get('https://us-central1-week7-wenzhuoshi.cloudfunctions.net/countBooks');
        this.Count = response.data.count;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count',this.error);
        this.Count = null;
        this.error = error;
      }
    }
  }
};
</script>
