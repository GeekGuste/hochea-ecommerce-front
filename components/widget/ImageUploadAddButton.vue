<template>
  <div>
    <b-form-group>
      <label :for="uploadId">
        <b-button @click="chooseFiles(uploadId)" variant="primary">+</b-button>
        <b-form-file
          :id="uploadId"
          v-model="file"
          :state="Boolean(file)"
          accept="image/*"
          @change="onSelect"
          plain
          style="display: none"
          required
        ></b-form-file>
      </label>
    </b-form-group>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: () => ''
  }
})
const emit = defineEmits(['onSelect'])
const file = ref([])
const uploadId = computed(() => `file-upload-${props.id}`)
const chooseFiles = (uploadIdSent: string) => {
  document.getElementById(uploadIdSent).click()
}
const onSelect = (event: any) => {
  file.value = event.target.files[0]
  if (file.value) {
    emit('onSelect', { image: file.value, id: props.id })
  }
}
</script>
