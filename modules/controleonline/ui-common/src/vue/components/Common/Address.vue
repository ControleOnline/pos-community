<template>
  <div v-if="address == 'gmaps'" class="row q-col-gutter-xs q-pb-xs">
    <div class="col-xs-12 text-subtitle1 text-left">
      Procure o endereço na caixa de busca
    </div>
    <div class="col-xs-12 q-mb-sm">
      <label class="q-input-label">Busca de endereço</label>
      <ListAutocomplete
        :label="'Address'"
        :source="getGeoPlaces"
        :isLoading="isSearching"
        @selected="onSelect"
        placeholder="Digite o endereço completo (rua, número, bairro, CEP)"
      />
    </div>
    <div class="col-xs-12 text-subtitle1 text-left">
      Ou digite os dados diretamente
    </div>
  </div>

  <div class="row q-col-gutter-sm q-pb-xs">
    <div class="col-xs-12 col-sm-grow q-mb-sm" v-if="address == 'bycep'">
      <label class="q-input-label">{{ $t("CEP") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        unmasked-value
        hide-bottom-space
        v-model="item.address.postal_code"
        type="text"
        mask="#####-###"
        :rules="[isInvalid('postal_code')]"
        :loading="loading"
        @update:model-value="searchByCEP"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm" v-else>
      <label class="q-input-label">{{ $t("CEP") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        unmasked-value
        hide-bottom-space
        v-model="item.address.postal_code"
        type="text"
        mask="#####-###"
        :rules="[isInvalid('postal_code')]"
      />
    </div>

    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("Rua") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.street"
        type="text"
        :rules="[isInvalid('street')]"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("Número") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.number"
        type="text"
        :rules="[isInvalid('number')]"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("Complemento") }}</label>
      <q-input
        dense
        outlined
        stack-label
        hide-bottom-space
        v-model="item.address.complement"
        type="text"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("Bairro") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.district"
        type="text"
        :rules="[isInvalid('district')]"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("Cidade") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.city"
        type="text"
        :rules="[isInvalid('city')]"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("UF") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.state"
        type="text"
        mask="AA"
        :rules="[isInvalid('state')]"
      />
    </div>
    <div class="col-xs-12 col-sm-grow q-mb-sm">
      <label class="q-input-label">{{ $t("País") }}</label>
      <q-input
        dense
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        v-model="item.address.country"
        type="text"
        :rules="[isInvalid('country')]"
      />
    </div>
  </div>
</template>
