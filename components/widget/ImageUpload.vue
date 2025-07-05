<template>
  <div>
    <b-img v-if="!!url" :src="url" max-width="100%" fluid alt="Responsive image" />
    <b-form-group label="Image:">
      <b-form-file
        v-model="file"
        :state="Boolean(file)"
        accept="image/*"
        @change="onSelect"
        :required="!url"
        placeholder="selectionnez une image"
        drop-placeholder="Cliquer-glisser ici"
      />
    </b-form-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  imageUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['onSelect'])

const file = ref<File | null>(null)
const loadedUrl = ref('')
const url = computed(() => loadedUrl.value || props.imageUrl)

function onSelect(event: Event) {
  const target = event.target as HTMLInputElement
  const f = target.files ? target.files[0] : null
  file.value = f
  if (f) {
    const reader = new FileReader()
    reader.onload = e => {
      loadedUrl.value = (e.target?.result as string) || ''
    }
    reader.readAsDataURL(f)
    emit('onSelect', { image: f })
  }
}

function clear() {
  loadedUrl.value = ''
}
</script>
