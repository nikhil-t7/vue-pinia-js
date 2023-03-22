<script lang="ts" setup>
import { computed, ref, useSlots } from 'vue';
import FormInput from './FormInput.vue';
import { NewUser } from '../users'
import { validate, length, required ,validatePassword} from '../validation'
import { useUsers } from '../stores/users'
import { useModal } from '../composables/modal';

defineProps<{
  error?: string;
}>();

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()

const firstName = ref('')
const firstNameStatus = computed(() => {
  return validate(firstName.value, [required, length({ min: 5, max: 10 })])
})

const lastName = ref('')
const lastNameStatus = computed(() => {
  return validate(lastName.value, [required, length({ min: 5, max: 10 })])
})

const email = ref('')
const emailStatus = computed(() => {
  return validate(email.value, [required, length({ min: 5, max: 50 })])
})

const contactDetails = ref('')
const contactDetailsStatus = computed(() => {
  return validate(contactDetails.value, [required, length({ min: 5, max: 100 })])
})

const password = ref('')
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 5, max: 10 })])
})

const confirmPassword = ref('')
const confirmPasswordStatus = computed(() => {
  return validate(confirmPassword.value, [required, length({ min: 5, max: 10 })])
})
const isPasswordSame = ref('')
const isPasswordSameStatus = computed(()=>{
  return validatePassword(password.value,confirmPassword.value),[required, length({ min: 5, max: 10 })];
})

const isInvalid = computed(() => {
  return (!firstNameStatus.value.valid || !lastNameStatus.value.valid || !emailStatus.value.valid || !contactDetailsStatus.value.valid || !passwordStatus.value.valid || !contactDetailsStatus.value.valid )
})

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit () {
  if (isInvalid.value) {
    return
  }

  const newUser: NewUser = {
    firstName : firstName.value,
    lastName : lastName.value,
    email : email.value,
    contactDetails : contactDetails.value,
    password : password.value,
    confirmPassword : confirmPassword.value,

  }

  try {
    emit('submit', newUser)
  } catch (e) {}
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="First Name" v-model="firstName" :status="firstNameStatus" type="text"/>
    <FormInput name="Last Name" v-model="lastName" :status="lastNameStatus" type="text"/>
    <FormInput name="Email" v-model="email" :status="emailStatus" type="text"/>
    <FormInput name="Contact Details" v-model="contactDetails" :status="contactDetailsStatus" type="text" aria-placeholder="+91"/>
    <FormInput name="Password" v-model="password" :status="passwordStatus" type="text"/>
    <FormInput name="Confirm Password" v-model="confirmPassword" :status="confirmPasswordStatus" type="text"/>
    <div v-if="error" class="is-danger help">
      {{ error }}
    </div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
