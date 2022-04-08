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
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "ImageUploadAddButton",
  props: {
    id: {
      type: String,
      default: () => ""
    }
  },
  data: function() {
    return {
      file: [] as unknown,
    };
  },
  computed: {
    uploadId(){
      return `file-upload-${this.id}`;
    }
  },
  methods: {
    chooseFiles(uploadId: string) {
        document.getElementById(uploadId).click();
    },
    onSelect(event: any) {
      this.file = event.target.files[0];
      if(!!this.file){
        let id = this.id;
        this.$emit("onSelect", { image: this.file, id: id });
      }
    },
  },
});
</script>