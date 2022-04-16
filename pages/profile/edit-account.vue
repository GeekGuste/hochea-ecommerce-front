<template>
  <div>
    <center>
      <h3><u>Modifier mes informations</u></h3>
    </center>
    <b-form @submit="onSubmit" @reset="onReset" v-if="!!id">
      <b-form-group id="input-group-1" label="Nom*:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.last_name"
          placeholder="Nom"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-1" label="Prénom*:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.first_name"
          placeholder="Prénom"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-1"
        label="Numéro de téléphone:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.phone_number"
          placeholder="Numéro de téléphone"
          type="text"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="success">Enregister</b-button>
      <b-button type="reset" variant="danger">Annuler</b-button>
    </b-form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { User } from "../../models/user";
export default Vue.extend({
  name: "ProfileEditAccountPage",
  layout: "profile",
  middleware: ["auth"],
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        phone_number: "",
      },
      id: null,
    };
  },
  created: function () {
    console.log(this.$auth.user);
    this.$axios.$get("/auth/users/me/").then((user: User) => {
      this.id = user.id;
      this.form.first_name = user.first_name;
      this.form.last_name = user.last_name;
      this.form.phone_number = user.phone_number;
    });
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      //user registration
      this.$axios
        .$patch(`/api/profile/${this.id}/`, { ...this.form })
        .then((result) => {
          //@ts-ignore
          this.$bvToast.toast("Compte mis à jour avec succès", {
            title: "Succès",
            variant: "success", 
          });
        });
    },
    onReset(event: any) {},
  },
});
</script>