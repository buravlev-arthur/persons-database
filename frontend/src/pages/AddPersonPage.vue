<template>
  <q-page>
    <div class="row">
      <q-card flat class="q-mt-md col-12 col-md-4 offset-md-4">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-h6 text-weight-bold">
              {{ t('addPersonPage.title') }}
            </div>
            <q-btn
              outline
              icon="chevron_left"
              no-caps
              :label="isDesktop ? t('shared.toSearchBtn') : ''"
              :round="!isDesktop"
              color="secondary"
              @click="() => router.push('/')"
            />
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md q-mb-md" @submit="addNewPerson">
            <q-input
              outlined
              :label="t('addPersonPage.form.phoneLabel')"
              mask="+7 (###) ###-##-##"
              placeholder="+7 (___) ___-__-__"
              v-model="formData.phone"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) =>
                  (!!val?.length && isValidPhone(val)) ||
                  (isValidURL(formData.vk) && !val?.length) ||
                  t('addPersonPage.form.phoneHint'),
              ]"
            />
            <q-input
              outlined
              :label="t('addPersonPage.form.lastnameLabel')"
              v-model="formData.lastname"
              :maxlength="50"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) =>
                  nameRegExp.test(val) ||
                  !val?.length ||
                  t('addPersonPage.form.nameHint'),
              ]"
            />
            <q-input
              outlined
              :label="t('addPersonPage.form.firstnameLabel')"
              v-model="formData.firstname"
              :maxlength="50"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) =>
                  nameRegExp.test(val) ||
                  !val?.length ||
                  t('addPersonPage.form.nameHint'),
              ]"
            />
            <q-input
              outlined
              :label="t('addPersonPage.form.surnameLabel')"
              v-model="formData.surname"
              :maxlength="50"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) =>
                  surnameRegExp.test(val) ||
                  !val?.length ||
                  t('addPersonPage.form.nameHint'),
              ]"
            />
            <q-input
              outlined
              :label="t('addPersonPage.form.vkLabel')"
              placeholder="https://vk.com/..."
              v-model="formData.vk"
              :maxlength="47"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) =>
                  (!!val?.length && isValidURL(val)) ||
                  (isValidPhone(formData.phone) && !val?.length) ||
                  t('addPersonPage.form.vkHint'),
              ]"
            />
            <q-input
              outlined
              :label="t('addPersonPage.form.addressLabel')"
              v-model="formData.address"
              :maxlength="150"
              :disable="isRequestProcessing"
              lazy-rules
              :rules="[
                (val) =>
                  addressRegExp.test(val) ||
                  !val?.length ||
                  t('addPersonPage.form.addressHint'),
              ]"
            />
            <q-input
              outlined
              v-model="formData.comment"
              :maxlength="1024"
              type="textarea"
              :label="t('shared.commentLabel')"
              lazy-rules
              :disable="isRequestProcessing"
              :rules="[
                (val) => (val && val.length > 0) || t('shared.commentHint'),
              ]"
            />
            <div class="row">
              <q-btn
                type="submit"
                :label="t('addPersonPage.form.submitBtn')"
                no-caps
                unelevated
                color="primary"
                :loading="isRequestProcessing"
                class="col-12 col-md-4 offset-md-8"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useStore } from 'src/stores/store';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { isValidPhone, isValidURL } from 'src/helpers/index';
import {
  addPerson,
  addComment,
  getPersonByPhone,
  getPersonByVK,
} from 'src/api/index';
import { FoundPersonData } from 'src/types/entities';
import { FieldNames } from 'src/types/shared';
import type { AxiosError } from 'axios';

const $q = useQuasar();
const router = useRouter();
const store = useStore();
const { t } = useI18n();

const nameRegExp = new RegExp(/^[А-Я][а-я]+(-[А-Я][а-я]+)*$/);
const surnameRegExp = new RegExp(/^[А-Я][а-я]+$/);
const addressRegExp = new RegExp(/^[А-Яа-я0-9.,:\- ]+$/);

defineProps<{ isDesktop: boolean }>();

const isRequestProcessing = ref<boolean>(false);

const formData = reactive<{
  phone: string;
  lastname: string;
  firstname: string;
  surname: string;
  vk: string;
  address: string;
  comment?: string;
  createdAt: number;
}>({
  phone: '',
  lastname: '',
  firstname: '',
  surname: '',
  vk: '',
  address: '',
  comment: '',
  createdAt: 0,
});

const addNewPerson = async (): Promise<void> => {
  if (
    isValidPhone(formData.phone) &&
    (await isAlreadyExistsPhone(formData.phone))
  ) {
    $q.notify({
      type: 'info',
      message: t('addPersonPage.form.alreadyExistsPhone'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
    return;
  }

  if (isValidURL(formData.vk) && (await isAlreadyExistsVK(formData.vk))) {
    $q.notify({
      type: 'info',
      message: t('addPersonPage.form.alreadyExistsVK'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
    return;
  }

  const personData = { ...formData };
  delete personData.comment;
  personData.createdAt = new Date().getTime();
  try {
    isRequestProcessing.value = true;
    const addPersonResult = (await addPerson(personData)) as FoundPersonData;
    store.foundPersonData = addPersonResult;

    await addComment({
      personId: addPersonResult.id,
      text: formData.comment as string,
      createdAt: new Date().getTime(),
    });

    await store.getCurrentCountOfPersons();

    $q.notify({
      type: 'positive',
      message: t('addPersonPage.form.success'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
    router.push('/results');
  } catch {
    $q.notify({
      type: 'negative',
      message: t('addPersonPage.form.failed'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } finally {
    isRequestProcessing.value = false;
  }
};

const isAlreadyExistsPhone = async (phone: string): Promise<boolean> => {
  try {
    await getPersonByPhone(phone);
    return true;
  } catch (error) {
    const status = (error as AxiosError).response?.status ?? 0;
    if (status === 404) {
      return false;
    }

    $q.notify({
      type: 'negative',
      message: t('addPersonPage.form.checkExistingError'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
    throw new Error();
  }
};

const isAlreadyExistsVK = async (vkLink: string): Promise<boolean> => {
  try {
    await getPersonByVK(vkLink);
    return true;
  } catch (error) {
    const status = (error as AxiosError).response?.status ?? 0;
    if (status === 404) {
      return false;
    }

    $q.notify({
      type: 'negative',
      message: t('addPersonPage.form.checkExistingError'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
    throw new Error();
  }
};

onMounted((): void => {
  const { field, value } = router.currentRoute.value.query;

  if (!!field?.length && !!value?.length) {
    switch (field) {
      case FieldNames.Phone:
        formData.phone = value as string;
        break;
      case FieldNames.VK:
        formData.vk = value as string;
        break;
      case FieldNames.Name:
        const [lastname, firstname] = (value as string).trim().split(' ');
        formData.lastname = lastname;
        formData.firstname = firstname;
        break;
      default:
        throw new Error(t('addPersonPage.error'));
    }
  }
});
</script>

<style lang="scss"></style>
