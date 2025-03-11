<template>
  <div
    class="full-width bg"
    :style="{
      position: 'sticky',
      left: '0px',
      top: '65px',
      'z-index': '999',
    }"
  >
    <q-btn-dropdown
      split
      outline
      :label="currentCompany !== null ? currentCompany.alias : 'Loading...'"
      class="ellipsis"
    >
      <q-list>
        <q-item
          clickable
          v-close-popup
          dense
          v-for="(company, index) in companies"
          :disable="
            company.enabled && company.user.employee_enabled ? false : true
          "
          :key="index"
          @click="onCompanySelection(company)"
        >
          <q-item-section>
            <q-item-label lines="1"> {{ company.alias }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <UploadForm
      :item="selectedChangedFile"
      :context="configs.context"
      :open="open"
      :multiple="multiple"
      :accept="getAccept()"
      @fileUploaded="fileUploaded"
    />
  </div>
  <q-table
    grid
    :rows="files"
    :rows-per-page-options="[50, 100, 150]"
    class="row q-col-gutter-xs full-height full-width default-table full file-explorer-table q-pt-xl"
    dense
    :loading="isLoading"
    :row-key="columns[0].name"
    v-model:pagination="pagination"
    @request="getFiles"
    binary-state-sort
  >
    <template v-slot:item="props">
      <div
        :class="[
          'col-12 col-sm-4 col-md-2 image-wrapper q-pa-xs',
          {
            selected: selectedFile && selectedFile['@id'] === props.row['@id'],
          },
        ]"
        @click="selectFile(props.row)"
      >
        <q-icon
          name="description"
          v-if="props.row.fileType == 'text'"
          size="280px"
        />
        <img
          v-if="props.row.fileType == 'image'"
          :src="$image(props.row)"
          :alt="getLabel(props.row)"
          class="responsive-image"
        />
        <div class="file-name">
          {{ getLabel(props.row) }}
        </div>
        <div class="button-bar text-center">
          <DefaultButtonDialog
            v-if="props.row.fileType == 'text'"
            :configs="configsHtml"
            :row="props.row"
            @saved="
              selectFile(props.row);
              chooseFile();
            "
          />
          <q-btn
            v-if="props.row.fileType == 'image'"
            icon="attachment"
            color="white"
            @click.stop="uploadFile(props.row)"
            flat
            size="sm"
          />
          <DefaultDelete
            @deleted="deleted"
            :configs="{
              store: 'file',
              size: 'sm',
              flat: 'flat',
              color: 'white',
            }"
            :item="props.row"
          />
          <q-btn
            icon="check"
            color="white"
            @click.stop="
              selectFile(props.row);
              chooseFile();
            "
            flat
            size="sm"
          />
        </div>
      </div>
    </template>
  </q-table>

  <div class="action-bar row justify-end q-pa-sm bg sticky-bottom full-width">
    <q-btn label="Salvar" color="primary" @click="chooseFile" />
  </div>
</template>

<script>
import MyCompanies from "@controleonline/ui-common/src/components/Common/MyCompanies";
import UploadForm from "@controleonline/ui-default/src/components/Default/Inputs/Components/UploadInput.vue";
import { mapGetters, mapActions } from "vuex";
import DefaultDelete from "@controleonline/ui-default/src/components/Default/DefaultDelete";
import Html from "@controleonline/ui-default/src/components/Default/Common/DefaultHtml.vue";

export default {
  components: {
    UploadForm,
    MyCompanies,
    DefaultDelete,
    Html,
  },
  props: {
    data: {
      required: true,
    },
    configs: {
      required: true,
    },
  },
  data() {
    return {
      selectedChangedFile: {},
      open: false,
      currentCompany: {},
      files: [],
      selectedFile: {},
      pagination: { page: 1, rowsPerPage: 50 },
      columns: [
        { name: "image", label: "Imagem", field: "image", align: "center" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
      companies: "people/companies",
      totalItems: "file/totalItems",
      isLoading: "file/isLoading",
    }),
    configsHtml() {
      return {
        component: Html,
        "full-height": true,
        "full-width": true,
        store: "file",
        size: "sm",
        flat: "flat",
        color: "white",
        icon: "edit",
      };
    },
  },
  created() {
    this.currentCompany = this.myCompany;
    this.selectFile(this.$copyObject(this.data));
  },
  watch: {
    currentCompany() {
      this.getFiles();
    },
  },
  methods: {
    ...mapActions({
      getItems: "file/getItems",
    }),
    uploadFile(file) {
      this.selectedChangedFile = file;
      setTimeout(() => {
        this.open = true;
        setTimeout(() => {
          this.open = false;
        }, 300);
      }, 300);
    },
    getAccept() {
      let accept = [];

      (this.configs?.extension || []).forEach((extension) => {
        accept.push("." + extension);
      });

      this.configs.fileType.forEach((fileType) => {
        switch (fileType) {
          case "image":
            accept.push("image/*");
            break;
          case "application":
            accept.push(".pdf");
            accept.push(".doc");
            accept.push(".html");
            break;
          case "text":
            accept.push(".html");
            break;
          case "html":
            accept.push(".html");
            break;
          case "pdf":
            accept.push(".pdf");
            break;
          default:
            accept.push("image/*");
            break;
        }
      });
      return accept.join(", ");
    },

    onCompanySelection(company) {
      this.currentCompany = company;
    },
    selectFile(file) {
      this.selectedFile = file;
    },
    deleted() {
      this.getFiles();
    },
    fileUploaded(file) {
      this.selectedChangedFile = {};
      this.files = [...this.files];
      let indx = -1;
      if (this.selectedFile)
        indx = this.files.findIndex(
          (file) => file["@id"] === this.selectedFile["@id"]
        );

      if (
        this.selectedFile &&
        indx > -1 &&
        this.selectedFile["@id"] == file["@id"]
      ) {
        this.files[indx] = file;
      } else {
        this.files.push(file);
      }
    },
    chooseFile() {
      setTimeout(() => {
        this.selectedChangedFile = {};
        this.$emit("save", this.selectedFile);
      }, 300);
    },
    getFiles() {
      let params = { people: "/people/" + this.currentCompany?.id };
      if (this.configs.fileType) params.fileType = this.configs.fileType;
      if (this.configs.extension) params.extension = this.configs.extension;
      if (this.configs.context) params.context = this.configs.context;

      this.getItems(params).then((data) => {
        this.pagination.rowsNumber = this.totalItems;
        this.files = data;
      });
    },
    getLabel(file) {
      return file.fileName;
    },
  },
};
</script>

<style>
.file-explorer-table {
  padding-bottom: 200px;
}

.image-wrapper.selected {
  border: 4px solid var(--primary);
  padding: 2px;
  padding-bottom: 52px;
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  padding-bottom: 50px;
  border: 1px solid #ccc;
  position: relative;
  margin-bottom: 20px;
}

.responsive-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.action-bar {
  display: none;
}
.file-name {
  text-align: center;
  position: absolute;
  bottom: 25px;
  width: 100%;
  z-index: 100;
  height: 25px;
  overflow: hidden;
}

.button-bar {
  background-color: var(--secondary);
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 25px;
}
.button-bar button {
  width: 33.333%;
}
</style>
