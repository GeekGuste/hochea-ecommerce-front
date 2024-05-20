<template>
  <div>
    <h2>
      <center>
        Liste des types de variants &nbsp;
        <b-button to="/admin/variants/new" variant="success"
          >Ajouter +</b-button
        >
      </center>
    </h2>
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
            <td>{{ variantType.id }}</td>
            <td>{{ variantType.label }}</td>
            <td>
              <NuxtLink
                :to="'/admin/variants/' + variantType.id + '/edit'"
                class="btn btn-success"
                >Modifier</NuxtLink
              >
              <button
                @click="deleteVariant(variantType.id)"
                class="btn btn-danger"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { VariantType } from '~/models/product'
import { PaginatedList } from '../../../models/pagination'

definePageMeta({
  layout: 'admin',
  transition: {
    name: 'variantTypeList'
  }
})
onMounted(() => {
  loadVariants()
})

const variantTypes = ref([])
const loadVariants = () => {
  useFetch('/api/varianttype/').then(
    (variantTypeList: PaginatedList<VariantType>) => {
      variantTypes.value = variantTypeList.results
    }
  )
}
const deleteVariant = (id: number) => {
  if (confirm('Êtes vous sûr de vouloir supprimer ce type de variant ?')) {
    $fetch(`/api/varianttype/${id}/`, {
      method: 'DELETE'
    }).then(() => {
      //@ts-ignore
      this.$bvToast.toast('Type de variant supprimé avec succès', {
        title: 'Succès',
        variant: 'success'
      })
    })
    loadVariants()
  }
}
</script>
