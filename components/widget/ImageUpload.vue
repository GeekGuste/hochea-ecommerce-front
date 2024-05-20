<template>
  <div>
    <b-img
      v-if="!!url"
      :src="url"
      max-width="100%"
      fluid
      alt="Responsive image"
    ></b-img>
    <b-form-group label="Image:">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        accept="image/*"
        @change="onSelect"
        :required="!url"
        placeholder="selectionnez une image"
        drop-placeholder="Cliquer-glisser ici"
      ></b-form-file>
    </b-form-group>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  imageUrl: {
    type: String,
    default: () => ''
  }
})
const emit = defineEmits(['onSelect'])
const file = ref([])
const loadedUrl = ref('')

const url = computed(() =>
  loadedUrl.value ? loadedUrl.value : props.imageUrl.value
)

const onSelect = (event: any) => {
  file.value = event.target.files[0]
  if (file.value) {
    let reader = new FileReader()
    reader.onload = (e) => {
      loadedUrl.value = e?.target?.result as string
    }
    reader.readAsDataURL(file.value as Blob)
    emit('onSelect', { image: file.value })
  }
}

const clear = () => {
  loadedUrl.value = ''
}
</script>
