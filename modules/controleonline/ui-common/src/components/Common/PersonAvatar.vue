<template>
    <div class="row">
      <div class="col-12">
        <q-avatar size="100px">
          <q-img
            :src ="url"
            style="height: 100px; max-width: 100px"
          >
            <template v-slot:error>
              <div class="absolute-full flex flex-center text-subtitle2">
                Sem imagem
              </div>
            </template>
          </q-img>
        </q-avatar>
      </div>
  
      <div class="col-12 q-mt-sm">
        <q-btn flat dense
          label ="Mudar logo"
          size  ="md"
          color ="primary"
          class ="q-ml-sm"
          @click="dialog = !dialog"
        />
      </div>
  
      <q-dialog v-model="dialog">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="row items-center">
            <div class="text-h6">Faça upload da sua imagem</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <UploadForm
                  class        ="q-mb-md"
                  :endpoint    ="upload"
                  @fileUploaded="onUploadedFile"
                  @uploadFailed="onUploadFailed"
                  @filesRemoved="onFilesRemoved"
                  :multiple    ="false"
                  accepted     =".png, .jpg, .jpeg, .gif"
                  :showError   ="false"
                />
              </div>
              <div class="col-12" v-if="errors.length > 0">
                <q-banner
                  v-for="(error, index) in errors"
                  :key ="index"
                  class="text-white bg-red q-mb-xs"
                >
                  <q-icon left size="md" name="error" color="white" />
                  {{ error }}
                </q-banner>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </template>
  
  <script>
import UploadForm from "@controleonline/ui-default/src/components/Default/Inputs/Components/UploadInput.vue";
  
  export default {
    props: {
      url   : {
        required: true
      },
      upload: {
        required: true
      }
    },
  
    components: {
      UploadForm,
    },
  
    data() {
      return {
        loading: false,
        dialog : false,
        errors : [],
      };
    },
  
    methods: {
      onFilesRemoved() {
        this.errors = [];
      },
  
      onUploadedFile(result) {
        if (!result)
          return;
  
        if (result.response.success) {
          this.$q.notify({
            message : 'Upload feito com sucesso',
            position: 'bottom',
            type    : 'positive',
          });
  
          this.$emit('uploaded', result.response.data);
        }
      },
  
      onUploadFailed(error) {
        if (!error)
          return;
      },
    },
  };
  </script>