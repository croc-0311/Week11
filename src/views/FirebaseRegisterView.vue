<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"/></p>
  <p><input type="password" placeholder="Password" v-model="password"/></p>
  <p>
    <select v-model="role">
      <option disabled value="">Please select one</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
  </p>
  <p v-if="errorMessage">{{ errorMessage }}</p>
  <p>
    <button @click="register">Save to Firebase</button>
  </p>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const role = ref("")
const errorMessage = ref("")
const router = useRouter()
const auth = getAuth()
const db = getFirestore()

const register = () => {
  if (!role.value) {
    errorMessage.value = "Please select a role before submitting."
    return;
  }
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      return setDoc(doc(db, "users", user.uid), {
        email: email.value,
        role: role.value
      });
    })
    .then(() => {
      console.log("Firebase Register Successful and user role set");
      router.push("/firebaseSignin");
    })
    .catch((error) => {
      console.error(error.code, error.message);
      errorMessage.value = error.message;
    });
};
</script>