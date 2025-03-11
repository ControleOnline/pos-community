import { boot } from "quasar/wrappers";
import DefaultTable from "@controleonline/ui-default/src/vue/components/Default/DefaultTable";
import DefaultForm from "@controleonline/ui-default/src/vue/components/Default/Common/DefaultForm";
import DefaultFile from "@controleonline/ui-default/src/vue/components/Default/Common/DefaultFile.vue";
import FileExplorer from "@controleonline/ui-common/src/vue/components/Common/FileExplorer";
import DefaultButtonDialog from "@controleonline/ui-default/src/vue/components/Default/DefaultButtonDialog";
import DefaultComponent from "@controleonline/ui-default/src/vue/components/Default/DefaultComponent.vue";
import DefaultInput from "@controleonline/ui-default/src/vue/components/Default/Inputs/DefaultInput.vue";
import DefaultCarousel from "@controleonline/ui-default/src/vue/components/Default/Common/DefaultCarousel.vue";
import EditCarousel from "@controleonline/ui-default/src/vue/components/Default/Common/EditCarousel.vue";



export default boot(({ app }) => {
  app.component("DefaultTable", DefaultTable);
  app.component("DefaultButtonDialog", DefaultButtonDialog);
  app.component("FileExplorer", FileExplorer);
  app.component("DefaultForm", DefaultForm);
  app.component("DefaultFile", DefaultFile);
  app.component("DefaultComponent", DefaultComponent);
  app.component("DefaultInput", DefaultInput);
  app.component("DefaultCarousel", DefaultCarousel);
  app.component("EditCarousel", EditCarousel);


  app.config.globalProperties.$components = {
    DefaultTable,
    DefaultComponent,
    DefaultButtonDialog,
    EditCarousel,
    DefaultCarousel,
    DefaultInput,
    FileExplorer,
    DefaultForm,
    File,
  };
});
