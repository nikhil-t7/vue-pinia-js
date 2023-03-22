<script lang="ts" setup>
import { ref } from "vue";
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import { SignInUser } from "../users";
import UserFormSingIn from "./UserFormSingIn.vue";


const usersStore = useUsers()
const modal = useModal()
const error = ref('')

async function handleSignin (newUser: SignInUser) {
  const body = JSON.stringify(newUser);
  const res = await window.fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if ([401, 404].includes(res.status)) {
    error.value = "Username or password was incorrect."
  } else {
    usersStore.authenticate(); 
    modal.hideModal();
  }
}
</script>

<template>
  <UserFormSingIn @submit="handleSignin" :error="error" />
</template>