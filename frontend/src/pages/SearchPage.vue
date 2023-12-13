<template>
  <q-page class="row items-center justify-center">
    <div id="search_block">
      <div>
        <q-form ref="formEl" class="q-gutter-md">
          <q-input
            outlined
            v-model="searchStr"
            :mask="searchInputParams[selectedField].mask"
            :placeholder="searchInputParams[selectedField].placeholder"
            :rules="searchInputParams[selectedField].rules"
            :disable="isRequestProccessing"
            lazy-rules
          >
            <template v-slot:append>
              <q-btn
                flat
                round
                icon="search"
                type="submit"
                :loading="isRequestProccessing"
                @click="toSearch"
              />
            </template>
          </q-input>
        </q-form>
      </div>
      <div class="row justify-center q-mt-sm">
        <q-btn-group flat>
          <q-btn
            no-caps
            :ripple="false"
            :label="t('searchPage.phone')"
            :color="selectedField === 'phone' ? 'primary' : 'white'"
            :text-color="selectedField === 'phone' ? 'white' : 'secondary'"
            @click="setField(FieldNames.Phone)"
          />
          <q-btn
            no-caps
            :ripple="false"
            :label="t('searchPage.vk')"
            :color="selectedField === 'vk' ? 'primary' : 'white'"
            :text-color="selectedField === 'vk' ? 'white' : 'secondary'"
            @click="setField(FieldNames.VK)"
          />
          <q-btn
            no-caps
            :ripple="false"
            :label="t('searchPage.name')"
            :color="selectedField === 'name' ? 'primary' : 'white'"
            :text-color="selectedField === 'name' ? 'white' : 'secondary'"
            @click="setField(FieldNames.Name)"
          />
        </q-btn-group>
      </div>
    </div>

    <q-dialog v-model="addPersonConfirmWindowShow" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">{{ t('searchPage.dialog.text') }}</span>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            unelevated
            no-caps
            :label="t('searchPage.dialog.cancelBtn')"
            color="secondary"
            v-close-popup
          />
          <q-btn
            unelevated
            no-caps
            :label="t('searchPage.dialog.confirmBtn')"
            color="primary"
            v-close-popup
            @click="toAddPersonPage"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { QForm, QInputProps } from 'quasar';
import { isValidPhone, isValidURL, isValidName } from '../helpers/index';
import { getPersonByPhone, getPersonByVK, getPersonByName } from '../api/index';
import type { AxiosError } from 'axios';
import type { FoundPersonData } from 'src/types/entities';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useStore } from 'src/stores/store';
import { FieldNames } from 'src/types/shared';

const { t } = useI18n();

interface SearchInputParam {
  mask: string | undefined;
  placeholder: string;
  rules: QInputProps['rules'];
  action: (str: string) => Promise<FoundPersonData | AxiosError>;
}

interface SearchInputParams {
  [FieldNames.Phone]: SearchInputParam;
  [FieldNames.VK]: SearchInputParam;
  [FieldNames.Name]: SearchInputParam;
}

const searchInputParams: SearchInputParams = {
  [FieldNames.Phone]: {
    mask: '+7 (###) ###-##-##',
    placeholder: '+7 (___) ___-__-__',
    rules: [(val) => (val && isValidPhone(val)) || t('searchPage.phoneHint')],
    action: getPersonByPhone,
  },
  [FieldNames.VK]: {
    mask: undefined,
    placeholder: t('searchPage.vkPlaceholder'),
    rules: [(val) => (val && isValidURL(val)) || t('searchPage.vkHint')],
    action: getPersonByVK,
  },
  [FieldNames.Name]: {
    mask: undefined,
    placeholder: t('searchPage.namePlaceholder'),
    rules: [(val) => (val && isValidName(val)) || t('searchPage.nameHint')],
    action: getPersonByName,
  },
};

const $q = useQuasar();
const router = useRouter();
const store = useStore();

const addPersonConfirmWindowShow = ref<boolean>(false);
const formEl = ref<QForm | null>(null);
const searchStr = ref<string | null>(null);
const selectedField = ref<FieldNames>(FieldNames.Phone);
const isRequestProccessing = ref<boolean>(false);

const setField = (fieldName: FieldNames): void => {
  selectedField.value = fieldName;
  formEl.value?.reset();
  formEl.value?.focus();
  setTimeout(() => {
    searchStr.value = null;
  }, 0);
};

const toSearch = async (): Promise<void> => {
  if (formEl.value) {
    const isValid = await formEl.value?.validate();
    if (isValid) {
      try {
        isRequestProccessing.value = true;
        const personData = await searchInputParams[selectedField.value].action(
          searchStr.value as string
        );
        store.foundPersonData = personData;
        router.push('/results');
      } catch (error) {
        const status = (error as AxiosError).response?.status ?? 0;
        if (status === 404) {
          addPersonConfirmWindowShow.value = true;
          return;
        }

        $q.notify({
          type: 'negative',
          message: t('searchPage.searchError'),
          actions: [{ icon: 'close', color: 'white', round: true }],
        });
      } finally {
        isRequestProccessing.value = false;
      }
    }
  }
};

const toAddPersonPage = (): void => {
  router.push({
    path: '/add-person',
    query: {
      field: selectedField.value,
      value: searchStr.value,
    },
  });
};

onMounted((): void => {
  setField(FieldNames.Phone);
});
</script>

<style lang="scss">
#search_block {
  width: 320px;
}

.q-dialog {
  &__inner {
    .q-card {
      width: 300px;

      &__actions {
        .q-btn {
          padding-left: 16px;
          padding-right: 16px;
        }
      }
    }
  }
}
</style>
