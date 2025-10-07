<template>
  <div id="app" class="container mt-4">
    <h2>Book Count API Result</h2>
    <pre v-if="jsondata">{{ jsondata }}</pre>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CountBookAPI',
  data() {
    return {
      jsondata: null,
      error: null
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get(
          'https://us-central1-week7-wenzhuoshi.cloudfunctions.net/countBooks'
        );
        this.jsondata = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = error;
        this.jsondata = null;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
}

pre {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
  font-size: 14px;
  color: #333;
}
</style>
