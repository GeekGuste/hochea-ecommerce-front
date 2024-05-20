<template>
  <div class="col-md-4 offset-md-4 mt-5">
    <b-card header="Connexion">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            placeholder="Email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Mot de passe:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.password"
            type="password"
            placeholder="Mot de passe"
            required
          ></b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit" variant="primary">Se connecter</b-button>
          <b-button type="reset" variant="danger">Annuler</b-button>
          <hr/>
          Ou
          <br/>
          <NuxtLink to="/register" class="btn btn-info">S'inscrire</NuxtLink>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  transition: {
    name: "LoginPage",
  },
});

const form = ref({
            email: "",
            password: "",
          })

const onSubmit = (event: any) => {
  event.preventDefault();
  logInUser(form.valeur);
}

const onReset = (event: any) => {
  event.preventDefault();
  // Reset our form values
  form.value.email = "";
  form.value.password = "";
}

const logInUser = async (form: {email: string, password: string}) => {
  try {
    let response = await $auth.loginWith("local", {
      data: form,
    });
  } catch (error) {
    //@ts-ignore
     this.$bvToast.toast("Email ou mot de passe incorrect, veuillez réessayer", {
        title: "Erreur",
        variant: "danger",
      });
  }
}
</script>