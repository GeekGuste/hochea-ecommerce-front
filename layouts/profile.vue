<template>
  <div>
    <Navbar />
    <div class="m-5">
      <b-row>
        <b-col class="mb-5" md="4" lg="3" sm="5">
            <b-list-group>
                <b-list-group-item to="/profile/">Compte</b-list-group-item>
                <b-list-group-item to="/profile/edit-account">Modification du compte</b-list-group-item>
                <b-list-group-item to="/profile/update-password">Modification de mot de passe</b-list-group-item>
                <b-list-group-item>Commandes</b-list-group-item>
                <b-list-group-item></b-list-group-item>
            </b-list-group>
        </b-col>
        <b-col md="8" lg="9" sm="7">
            <div class="container">
                <b-card>
                    <Nuxt />
                </b-card>
            </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>