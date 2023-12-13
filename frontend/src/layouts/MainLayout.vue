<template>
  <q-layout view="hHh lpr fff">
    <q-header>
      <div class="row q-pa-sm justify-between">
        <div
          class="row col-10 col-md-6 items-center cursor-pointer"
          @click="() => router.push('/')"
        >
          <q-img src="../assets/logo.svg" width="50px" class="col-6 q-mr-md" />
          <div class="q-header__text">{{ t('mainLayout.title') }}</div>
        </div>
        <div class="row col-2 col-md-6 items-center justify-end q-gutter-md">
          <q-btn
            v-if="isDesktop"
            no-caps
            :label="t('mainLayout.addBtn')"
            color="secondary"
            @click="() => router.push('/add-person')"
          />
          <q-btn
            v-else
            flat
            icon="add_circle"
            color="white"
            size="lg"
            round
            @click="() => router.push('/add-person')"
          />
          <div
            v-if="isDesktop"
            class="col-md-hidden row items-center q-gutter-xs"
          >
            <div>{{ t('mainLayout.totalCount.start') }}:</div>
            <div
              v-if="!!store.countOfPersons"
              class="q-pa-xs bg-secondary rounded-borders"
            >
              {{ store.countOfPersons }}
            </div>
            <div
              v-else
              class="q-mx-xs q-px-lg q-py-sm rounded-borders relative-position"
            >
              <q-inner-loading
                :showing="!store.countOfPersons"
                class="rounded-borders bg-primary"
              ></q-inner-loading>
            </div>
            <div>{{ t('mainLayout.totalCount.end') }}</div>
          </div>
        </div>
      </div>
    </q-header>

    <q-footer>
      <div
        class="row q-ma-sm"
        :class="isDesktop ? 'justify-end' : 'justify-center'"
      >
        <div class="row">
          <q-btn
            type="a"
            unelevated
            no-caps
            href="/#/rules"
            :label="t('mainLayout.footer.about')"
            :ripple="false"
            text-color="grey-8"
          />
          <q-btn
            type="a"
            unelevated
            no-caps
            href="/#/contacts"
            :label="t('mainLayout.footer.contacts')"
            :ripple="false"
            text-color="grey-8"
          />
        </div>
      </div>
    </q-footer>

    <q-page-container>
      <router-view :is-desktop="isDesktop" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useStore } from 'src/stores/store';
import { useI18n } from 'vue-i18n';

const $q = useQuasar();
const router = useRouter();
const store = useStore();
const { t } = useI18n();
const isDesktop = $q.screen.gt.sm;

onMounted(async (): Promise<void> => {
  try {
    await store.getCurrentCountOfPersons();
  } catch {
    $q.notify({
      type: 'negative',
      message: t('mainLayout.countError'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  }
});
</script>

<style lang="scss">
.q-header {
  &__text {
    @media (max-width: $breakpoint-sm) {
      font-size: 12px;
      flex-basis: 140px;
    }
  }

  .q-img {
    margin-top: -6px;
  }
}

.q-footer {
  background: #fff;
}
</style>
