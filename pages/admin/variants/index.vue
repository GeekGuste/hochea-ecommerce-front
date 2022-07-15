<template>
  <div>
    <h2><center>Liste des types de variants &nbsp; <b-button to="/admin/variants/new" variant="success">Ajouter +</b-button> </center></h2>
    <div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Types de variant</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="variantType in variantTypes">
            <td>{{variantType.id}}</td>
            <td>{{variantType.label}}</td>
            <td>
              <NuxtLink :to="'/admin/variants/' + variantType.id + '/edit'" class="btn btn-success">Modifier</NuxtLink>
              <button @click="deleteVariant(variantType.id)" class="btn btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { VariantType } from "~/models/product";
import { PaginatedList } from "../../../models/pagination";

export default Vue.extend({
  name: "variantTypeList",
  layout: "admin",
  data() {
    return {
      variantTypes: [],
    };
  },
  mounted: function () {
    this.loadVariants();
  },
  methods: {
    loadVariants(){
        this.$axios
            .$get("/api/varianttype/")
            .then((variantTypeList: PaginatedList<VariantType>) => {
                this.variantTypes = variantTypeList.results;
            });
    },
    deleteVariant(id: number){
        if(confirm('Êtes vous sûr de vouloir supprimer ce type de variant ?')){
            this.$axios
                .$delete(`/api/varianttype/${id}/`)
                .then(() => {
                    //@ts-ignore
                    this.$bvToast.toast("Type de variant supprimé avec succès", {
                        title: "Succès",
                        variant: "success",
                    });
                });
            this.loadVariants();
        }
    }
  }
});
</script>