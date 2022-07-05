<template>
  <div>
    <Navbar/>
    <div class="container-fluid max-1200">
      <Nuxt />
    </div>
    <br/>
    <br/>
    <footer class="bg-dark">
    <div class="container text-white">
      <b-row>
        <b-col>
            <div class="d-flex align-items-center">
              <b-icon icon="geo_alt"></b-icon>
              <p>15 rue de Soleure</p>
            </div>
            <div class="d-flex align-items-center">
              <b-icon icon="geo_alt"></b-icon>
              <p>67000 Strasbourg, France</p>
            </div>
            <div class="d-flex align-items-center">
              <b-icon icon="">telephone</b-icon>
              <p>Service client: +33 7 68 42 64 00</p>
            </div>
            <div class="d-flex align-items-center">
              <b-icon icon="enveloppe"></b-icon>
              <p>hocheacreation@gmail.com</p>
            </div>
        </b-col>
        <b-col>
          <div>
              <div>
                <p>
                  <NuxtLink to="/contact">
                    Contact
                  </NuxtLink>
                </p>
              </div>
              <div>
                <p>
                  <NuxtLink to="/search">
                    Boutique
                  </NuxtLink>
                </p>
              </div>
              <div>
                <p>
                  <NuxtLink to="/cgu">
                    CGU
                  </NuxtLink>
                </p>
              </div>
              <div>
                <p>
                   <NuxtLink to="/politic">
                    Politique de vente
                  </NuxtLink>
                </p>
              </div>
          </div>
        </b-col>
        <b-col>
          <div>
            <p>
              <NuxtLink to="/register">
                  Inscription
              </NuxtLink>
            </p>
          </div>
          <div>
            <p>
              <NuxtLink to="/login">
                  Connexion
              </NuxtLink>
            </p>
          </div>
          <div>
            <p>
              <NuxtLink to="/profile">
                  Mon profil
              </NuxtLink>
            </p>
          </div>
        </b-col>
      </b-row>
    </div>
    </footer>
  </div>
</template>
<style>
.max-1200{
  padding-left: 50px;
  padding-right: 50px;
  min-height: 100vh;
}
footer a{
  color: white;
  text-decoration: none;
}
footer{
  width: 100%; 
  padding-top: 10px;
}
</style>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "IndexLayout",
});
</script>