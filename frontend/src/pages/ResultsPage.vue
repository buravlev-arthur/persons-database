<template>
  <q-page>
    <div class="row">
      <q-card flat class="q-mt-md col-12 col-md-4 offset-md-4">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-h6 text-weight-bold">
              {{ t('resultsPage.title') }}
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

        <q-card-section class="text-grey-9">
          <p>
            <span class="text-weight-bold q-mr-sm"
              >{{ t('resultsPage.name') }}:</span
            >
            <span>
              {{
                `${personData.lastname} ${personData.firstname} ${personData.surname}`
              }}
            </span>
          </p>
          <p>
            <span class="text-weight-bold q-mr-sm"
              >{{ t('resultsPage.phone') }}:</span
            >
            <span>{{ isEmptyNameFields() ? noData : personData.phone }}</span>
          </p>
          <p>
            <span class="text-weight-bold q-mr-sm"
              >{{ t('resultsPage.vk') }}:</span
            >
            <span>{{ personData.vk.length ? personData.vk : noData }}</span>
          </p>
          <p>
            <span class="text-weight-bold q-mr-sm"
              >{{ t('resultsPage.address') }}:</span
            >
            <span>{{
              personData.address.length ? personData.address : noData
            }}</span>
          </p>
          <p>
            <span class="text-weight-bold q-mr-sm"
              >{{ t('resultsPage.createdAt') }}:</span
            >
            <span>{{
              new Date(Number(personData.createdAt)).toLocaleDateString()
            }}</span>
          </p>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <div v-if="!comments.length" class="loader-block relative-position">
            <q-inner-loading :showing="!comments.length" color="secondary" />
          </div>

          <q-card v-for="comment in comments" :key="comment.id" flat bordered>
            <q-card-section class="row justify-end text-grey-8 text-caption">
              {{ new Date(Number(comment.createdAt)).toLocaleDateString() }}
            </q-card-section>
            <q-card-section class="text-body2">
              {{ comment.text }}
            </q-card-section>
          </q-card>
        </q-card-section>

        <q-card-section>
          <q-form @submit="addCommentToPerson" class="q-gutter-md q-mb-md">
            <q-input
              outlined
              v-model="commentText"
              type="textarea"
              lazy-rules
              :label="t('shared.commentLabel')"
              :disable="isRequestProcessing"
              :rules="[
                (val) => (val && val.length > 0) || t('shared.commentHint'),
              ]"
            />
            <div class="row">
              <q-btn
                type="submit"
                :label="t('resultsPage.addCommentBtn')"
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
import { useQuasar } from 'quasar';
import { ref, onUnmounted, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/stores/store';
import { useI18n } from 'vue-i18n';
import type { FoundPersonData, FoundComment } from '../types/entities';
import { getCommentsByPersonId, addComment } from 'src/api';

const $q = useQuasar();
const store = useStore();
const router = useRouter();
const { t } = useI18n();
const noData = t('shared.noData');

defineProps<{ isDesktop: boolean }>();

const personData = ref<FoundPersonData>({
  id: 0,
  phone: '',
  firstname: '',
  lastname: '',
  surname: '',
  address: '',
  photo: '',
  email: '',
  vk: '',
  createdAt: 0,
});

const commentText = ref<string>('');
const comments = ref<FoundComment[]>([]);
const isRequestProcessing = ref<boolean>();

const isEmptyNameFields = (): boolean => {
  const { firstname, lastname } = personData.value;
  return !firstname.length && !lastname.length;
};

const addCommentToPerson = async (): Promise<void> => {
  try {
    isRequestProcessing.value = true;
    const newComment = await addComment({
      personId: personData.value.id,
      text: commentText.value,
      createdAt: new Date().getTime(),
    });
    comments.value.push(newComment as FoundComment);
    commentText.value = '';
    $q.notify({
      type: 'positive',
      message: t('resultsPage.success'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: t('resultsPage.failedAddComment'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } finally {
    isRequestProcessing.value = false;
  }
};

const getComments = async () => {
  try {
    comments.value = (await getCommentsByPersonId(
      personData.value.id
    )) as FoundComment[];
  } catch {
    $q.notify({
      type: 'negative',
      message: t('resultsPage.failedGetComments'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  }
};

onMounted(async () => {
  if (!(store.foundPersonData as FoundPersonData).id) {
    return router.push('/');
  }

  personData.value = store.foundPersonData as FoundPersonData;
  await getComments();
});

onUnmounted(() => {
  store.foundPersonData = {};
});
</script>

<style lang="scss">
.loader-block {
  height: 50px;
}

.q-card {
  &__section {
    word-break: break-all;
  }
}
</style>
