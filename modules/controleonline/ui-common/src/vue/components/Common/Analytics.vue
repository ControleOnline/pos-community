<script>
import { BrowserAgent } from '@newrelic/browser-agent/src/loaders/browser-agent';
import Analytics from "@controleonline/ui-common/src/utils/analytics";

import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      defaultCompany: "people/defaultCompany",
    }),
  },
  mounted() {
  },
  watch: {
    defaultCompany(defaultCompany) {
      if (defaultCompany.configs['google-tag-manager'])
        Analytics.init(defaultCompany.configs);
    },
  },
  created() {
    /* global configs */
    if (process.env.NEW_RELIC?.LICENSE_KEY)
      this.newrelic();
  },
  methods: {
    ...mapActions({
    }),
    newrelic() {
      const options = {
        init: {
          distributed_tracing: { enabled: true },
          privacy: { cookies_enabled: true },
          ajax: { deny_list: [process.env.NEW_RELIC.BEACON, process.env.NEW_RELIC.ERROR_BEACON] },
        }, // NREUM.init
        info: {
          beacon: process.env.NEW_RELIC.BEACON,
          errorBeacon: process.env.NEW_RELIC.ERROR_BEACON,
          licenseKey: process.env.NEW_RELIC.LICENSE_KEY,
          applicationID: process.env.NEW_RELIC.APPLICATION_ID,
          sa: 1,
        }, // NREUM.info
        loader_config: {
          accountID: process.env.NEW_RELIC.ACCOUNT_ID,
          trustKey: process.env.NEW_RELIC.TRUST_KEY,
          agentID: process.env.NEW_RELIC.APPLICATION_ID,
          licenseKey: process.env.NEW_RELIC.LICENSE_KEY,
          applicationID: process.env.NEW_RELIC.APPLICATION_ID,
        }, // NREUM.loader_config
      };
      new BrowserAgent(options);
    },
  },
};
</script>
