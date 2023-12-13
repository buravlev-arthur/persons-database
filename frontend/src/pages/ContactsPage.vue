<template>
  <div class="row">
    <q-card flat class="q-mt-md col-12 col-md-4 offset-md-4 q-px-md">
      <q-card-section>
        <div class="row justify-between items-center q-my-lg">
          <div class="text-h6 text-weight-bold">
            {{ t('contactsPage.title') }}
          </div>
          <q-btn
            outline
            icon="chevron_left"
            no-caps
            :label="isDesktop ? 'К поиску' : ''"
            :round="!isDesktop"
            color="secondary"
            @click="() => router.push('/')"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <p>{{ t('contactsPage.text') }}:</p>
      </q-card-section>
      <q-card-section>
        <q-form class="column q-gutter-md" @submit="sendForm">
          <q-input
            outlined
            v-model="messageText"
            type="textarea"
            lazy-rules
            :label="t('contactsPage.messageLabel')"
            :disable="isRequestProcessing"
            :rules="[
              (val) => (val && val.length > 0) || t('contactsPage.messageHint'),
            ]"
          />
          <div class="row">
            <q-btn
              type="submit"
              :label="t('contactsPage.sendBtn')"
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { sendMessage } from 'src/api/index';

const $q = useQuasar();
const router = useRouter();
const { t } = useI18n();

const messageText = ref<string>('');
const isRequestProcessing = ref<boolean>(false);

const sendForm = async () => {
  try {
    isRequestProcessing.value = true;
    const result = (await sendMessage(messageText.value)) as { ok: boolean };
    messageText.value = '';

    if (!result.ok) {
      throw new Error();
    }

    $q.notify({
      type: 'positive',
      message: t('contactsPage.success'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } catch {
    $q.notify({
      type: 'negative',
      message: t('contactsPage.error'),
      actions: [{ icon: 'close', color: 'white', round: true }],
    });
  } finally {
    isRequestProcessing.value = false;
  }
};

defineProps<{ isDesktop: boolean }>();
</script>
