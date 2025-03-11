<template>
  <q-btn round dense flat color="grey-8" icon="notifications">
    <q-badge
      v-if="notifications.length > 0"
      color="red"
      text-color="white"
      floating
    >
      {{ notificationsUnread }}
    </q-badge>
    <q-tooltip>Notificações</q-tooltip>
    <q-menu>
      <template v-for="notfication in notifications">
        <q-list style="min-width: 100px">
          <q-separator></q-separator>
          <q-item
            clickable
            v-close-popup
            @click="redirecionaTasks(notfication)"
          >
            <q-item-section>{{ notfication.notification }}</q-item-section>
          </q-item>
        </q-list>
      </template>
      <div>
        <h6>Mensagens do WebSocket</h6>
        <ul>
          <li v-for="(message, index) in messages" :key="index">
            {{ message }}
          </li>
        </ul>
      </div>
    </q-menu>
  </q-btn>
</template>

<script>
import { api } from "app/modules/controleonline/ui-common/src/api";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      company: null,
      notifications: [],
      notificationsUnread: 0,
      reconnectInterval: 5000, // Intervalo de reconexão em milissegundos
      taskId: "",
      socket: null,
      messages: [],
    };
  },

  created() {
    //this.getNotifications();
    //this.socketInit();
  },

  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
    }),
  },

  watch: {
    myCompany(company) {
      this.company = company;
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
  methods: {
    ...mapActions({}),
    socketInit() {
      // Conectar ao servidor WebSocket
      this.socket = new WebSocket("wss://ws.controleonline.com");

      // Evento de conexão aberta
      this.socket.onopen = () => {
        console.log("Conectado ao servidor WebSocket");
      };

      // Evento de mensagem recebida
      this.socket.onmessage = (event) => {
        this.messages.push(event.data);
      };

      // Evento de erro
      this.socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      //this.socket.send('Hello World!');

      // Evento de conexão fechada
      this.socket.onclose = () => {
        console.log(
          "Conexão com WebSocket fechada. Tentando reconectar em " +
            this.reconnectInterval / 1000 +
            " segundos..."
        );
        setTimeout(this.socketInit, this.reconnectInterval);
      };
    },
    getNotifications() {
      let params = {};
      params["people.id"] = this.$auth.user.people;
      params["read"] = 0;
      params.itemsPerPage = 10;

      return api
        .fetch(`/notifications`, {
          params,
        })

        .then((result) => {
          this.notifications = result["hydra:member"];
          this.notificationsUnread = result["hydra:totalItems"];
        });
    },
    redirecionaTasks(notfication) {
      this.$router.push({
        name: notfication.route,
        params: { id: notfication.routeId },
      });
    },

    click(route) {
      this.$emit("clickmenu", route);
    },
  },
};
</script>
