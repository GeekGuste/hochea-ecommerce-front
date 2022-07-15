<template>
  <div>
    <div>
      <NuxtLink class="btn btn-warning text-white" to="/admin/variants/">Liste</NuxtLink>
      <hr>
    </div>
    <b-card header="Modifier un type de variant">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="libellé:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="variantType.label"
            placeholder="Entrer le libellé"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success">Modifier</b-button>
        <b-button type="reset" variant="danger">Annuler</b-button>
      </b-form>
    </b-card>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { VariantType } from "~/models/product";

export default Vue.extend({
  name: "AdminEditVariantTypePage",
  layout: "admin",
  middleware: ["auth"],
  data() {
    return {
      variantType: {
        id: 0,
        label: "",
      },
    };
  },
  mounted: function () {
    this.$axios
      .$get(`/api/varianttype/${this.$route.params.id}/`)
      .then((variantType: VariantType) => {
        this.variantType = { ...variantType };
      });
  },
  methods: {
    onSubmit(event: any) {
      event.preventDefault();
      this.$axios
        .$put(`/api/varianttype/${this.$route.params.id}/`, { ...this.variantType })
        .then((res: any) => {
          //@ts-ignore
         this.$bvToast.toast("Type de variant modifié avec succès", {
            title: "Succès",
            variant: "success",
          });
        });
    }
  },
});
</script>