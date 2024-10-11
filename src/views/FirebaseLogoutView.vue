<template>
    <div>
      <h1>Log out</h1>
      <button @click="logout">Log out</button>
    </div>
  </template>
  
  <script setup>
  import { getAuth, signOut } from 'firebase/auth';
  import { useRouter } from 'vue-router'


  const auth = getAuth();
  const router = useRouter()


  const logout = () => {
    signOut(auth).then(() => {
      console.log("The user has been logged out");
      console.log(auth.currentUser)
      localStorage.removeItem('isAuthenticated')

      router.push("/");
    }).catch((error) => {
      console.log("Log out error:", error);

    });
  };
  </script>