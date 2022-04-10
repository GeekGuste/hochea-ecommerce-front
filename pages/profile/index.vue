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
<script lang="ts">
import Vue from "vue";
import {User} from "../../models/user";

export default Vue.extend({
  name: "ProfileIndexPage",
  layout: "profile",
  middleware: ["auth"],
  data(){
      return {
          user: null
      }
  },
  created: function () {
      console.log(this.$auth.user);
      this.$axios
        .$get("/auth/users/me/")
        .then((user: User) => {
            this.user = user;
        });
  }
});
</script>