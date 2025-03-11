<template>
  <q-list>
    <q-item :to="{ name: 'MenuIndex' }" v-if="$auth.user.isSuperAdmin" exact>
      <q-item-section avatar>
        <q-icon name="settings" />
      </q-item-section>
      <q-item-section side>
        <q-item-label>{{ $tt("configs", "configs", "menus") }} </q-item-label>
      </q-item-section>
    </q-item>
    <q-expansion-item
      :content-inset-level="0.3"
      :icon="mItem.icon"
      :label="$tt('menu', 'menu', mItem.label)"
      v-for="mItem in menu"
      :key="mItem.id"
    >
      <q-item
        v-ripple
        clickable
        v-for="item in mItem.menus"
        :key="item.id"
        @click="click(item)"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon" />
        </q-item-section>
        <q-item-section no-wrap>
          {{ $tt("menu", "menu", item.label) }}
        </q-item-section>
      </q-item>
    </q-expansion-item>
  </q-list>
</template>

<script>
import { api } from "app/modules/controleonline/ui-common/src/api";
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    context: {
      required: true,
    },
    people: {
      required: true,
    },
  },

  data() {
    return {
      isSuperAdmin: false,
      menu: [],
    };
  },

  created() {
    this.getMenu();
  },

  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
      myCompany: "people/currentCompany",
    }),
  },

  watch: {
    myCompany() {
      this.getMenu();
    },
  },

  methods: {
    ...mapActions({
      setTheme: "theme/setMenus",
    }),

    routeExists(routeName) {
      return this.$router.options.routes.some((route) => {
        if (route.children)
          return route.children.some((child) => {
            return routeName === child.name;
          });
      });
    },
    getMenu() {
      if (this.myCompany)
        api
          .fetch(`menus-people`, {
            params: { myCompany: this.myCompany.id },
          })
          .then((result) => {
            let menus = result.response?.data;
            if (!menus.modules) return;
            let modules = [];
            Object.values(menus.modules).forEach((module, i) => {
              module.menus.forEach((menu, ii) => {
                if (this.routeExists(menu.route)) {
                  let find = modules.findIndex((obj) => obj.id == module.id);
                  if (find === -1) {
                    let itemCopy = { ...module };
                    itemCopy.menus = [menu];
                    modules.push(itemCopy);
                  } else {
                    modules[find].menus.push(menu);
                  }
                }
              });
            });

            this.menu = modules;
            this.setTheme(this.menu);
          });
    },

    click(route) {
      this.$emit("clickmenu", route);
      this.$router.push({ name: route.route });
    },
  },
};
</script>
<style></style>
