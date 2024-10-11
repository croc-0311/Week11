<script setup>
import { ref } from 'vue';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';

const email = ref('');
const message = ref('');

const auth = getAuth();

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'http://localhost:5173/login', // 根据你的环境调整这个URL
  handleCodeInApp: true,
};

const sendEmailLink = async () => {
  try {
    await sendSignInLinkToEmail(auth, email.value, actionCodeSettings);
    window.localStorage.setItem('emailForSignIn', email.value); // Save the email locally to retrieve later
    message.value = 'Email link sent! Check your email to complete sign in.';
  } catch (error) {
    message.value = error.message;
  }
};
</script>

<template>
  <div>
    <input v-model="email" type="email" placeholder="Enter your email">
    <button @click="sendEmailLink">Send Sign-In Link</button>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>