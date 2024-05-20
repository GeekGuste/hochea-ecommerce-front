<template>
  <div class="container">
    <div class="text-center mt-5">
      <h2><u>Contactez nous</u></h2>
      <p>
        Vous avez des questions? Ou un problème sur le site? Contactez nous en remplisant
        le formulaire ci dessous
      </p>
      <br />
      <br />
    </div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Nom:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.name" required></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Message:" label-for="input-2">
          <b-form-textarea
            id="textarea"
            v-model="form.message"
            placeholder=""
            required
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary">Envoyer</b-button>
      </b-form>
    </div>
  </div>
</template>
<script setup lang="ts">
const form = ref({
  email: "",
  name: "",
  message: "",
});

const clearForm = () => {
  form.value.email = "";
  form.value.name = "";
  form.value.message = "";
};

const onSubmit = (event) => {
  event.preventDefault();
  $fetch("/sales/contact/", {
    method: "POST",
    body: { ...form.value },
  })
    .then((result) => {
      this.$bvToast.toast(
        "Message envoyé avec succès. Nous vous répondrons dans de brefs délais",
        {
          title: "Succès",
          variant: "success",
        }
      );
      clearForm();
    })
    .catch((error) => {
      this.$bvToast.toast("Erreur d'envoi de message, veuillez réessayer plus tard", {
        title: "Erreur",
        variant: "danger",
      });
    });
};
</script>
