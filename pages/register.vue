<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <b-card header="Inscription">
      <b-form @submit="onSubmit" @reset="onReset">
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
        <b-form-group id="input-group-1" label="Email*:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            placeholder="Email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>
        
        <b-form-group id="input-group-1" label="Numéro de téléphone:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.phone_number"
            placeholder="Numéro de téléphone"
            type="text"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Mot de passe*:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            required
          ></b-form-input>
          <b-form-text>
            Votre mot de passe doit faire au moins 8 caractères
          </b-form-text>
        </b-form-group>

        <b-button type="submit" variant="primary">S'inscrire</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LoginPage",
  data() {
      return {
          form: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone_number: ""
          },
      };
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      //user registration
      this.$axios
      .$post("/auth/users/", {...this.form, username: this.form.email})
      .then((result) => {
            if(!!result){
              //login with user account information
              this.$auth.loginWith('local', { data: {email: this.form.email, password: this.form.password}})
                .then(() => {
                  //@ts-ignore
                  this.$bvToast.toast("inscription réussie \n Vous allez être redirigé vers votre espace client", {
                      title: "Succès",
                      variant: "success",
                  });
                  //redirect to profile page
                  window.location.replace('/profile/');
                });
            }
      });
    },
    onReset(event: any) {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.password = "";
    },
    async logInUser(form: {email: string, password: string}) {
      try {
        let response = await this.$auth.loginWith("local", {
          data: form,
        });
        console.log("success: " + JSON.stringify(response));
      } catch (error) {
        console.log("notification unsuccessful because " + JSON.stringify(error));
      }
    },
  },
});
</script>