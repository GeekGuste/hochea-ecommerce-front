<template>
  <div>
    <center>
      <h3><u>Mes informations</u></h3>
    </center>
    <div>
      <table v-if="!!this.user" class="table table-user-information">
        <tbody>
          <tr>
            <td>
              <strong>
                <span class="glyphicon glyphicon-asterisk text-primary"></span>
                Email
              </strong>
            </td>
            <td class="text-primary">{{ user.email }}</td>
          </tr>
          <tr>
            <td>
              <strong>
                <span class="glyphicon glyphicon-asterisk text-primary"></span>
                Nom
              </strong>
            </td>
            <td class="text-primary">{{ user.last_name }}</td>
          </tr>
          <tr>
            <td>
              <strong>
                <span class="glyphicon glyphicon-asterisk text-primary"></span>
                Prénom
              </strong>
            </td>
            <td class="text-primary">{{ user.first_name }}</td>
          </tr>
          <tr>
            <td>
              <strong>
                <span class="glyphicon glyphicon-asterisk text-primary"></span>
                Numéro de téléphone
              </strong>
            </td>
            <td class="text-primary">
               <span v-if="!!user.phone_number"> {{ user.phone_number }}</span>
               <span v-else>Non renseigné</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../../models/user'

definePageMeta({ layout: 'profile', middleware: ['auth'] })

const user = ref<User | null>(null)
const { data } = await useFetch<User>('/auth/users/me/')
if (data.value) user.value = data.value
</script>