<template>
  <IonCard class="k-card m-1" :class="status">
    <template v-if="skeleton">
      <IonSkeletonText class="mx-auto" animated :style="{ width: '95%', aspectRatio: ASPECT_RATIO }" />
      <IonCardContent class="flex flex-col justify-center p-1 h-14">
        <IonSkeletonText animated :style="{ width: '40%' }" />
        <IonSkeletonText animated :style="{ width: '75%' }" />
      </IonCardContent>
    </template>
    <template v-else>
      <KImg :aspect-ratio="ASPECT_RATIO" :src="src" />
      <IonCardContent class="flex flex-col justify-center p-1 h-14">
        <IonCardTitle class="text-sm text-ellipsis overflow-hidden whitespace-nowrap">{{ title }}</IonCardTitle>
        <IonCardSubtitle v-if="subtitle" class="text-xs text-ellipsis overflow-hidden whitespace-nowrap">{{ subtitle }}</IonCardSubtitle>
      </IonCardContent>
      <IonIcon v-if="status === 'want'" class="icon-want text-xl absolute top-2 right-2" color="love" :icon="heartCircle" />
      <IonIcon v-if="status === 'in-transit'" class="icon-have text-xl absolute top-2 right-2" color="pending" :icon="paperPlane" />
      <IonIcon v-if="status === 'have'" class="icon-have text-xl absolute top-2 right-2" color="owned" :icon="checkmarkCircle" />
    </template>
  </IonCard>
</template>

<script setup lang="ts">
import { IonCard, IonIcon, IonCardContent, IonCardTitle, IonCardSubtitle, IonSkeletonText } from '@ionic/vue';
import { checkmarkCircle, heartCircle, paperPlane } from 'ionicons/icons';
import KImg from './KImg.vue';
import { OwnershipType } from '@/types';

const ASPECT_RATIO = 0.7;

interface KCardProps {
  src?: string;
  title?: string;
  subtitle?: string;
  status?: OwnershipType;
  skeleton?: boolean;
}

withDefaults(defineProps<KCardProps>(), { status: 'none' });
</script>

<style scoped>
.k-card {
  border-top-width: 5px;
  border-bottom-width: 5px;
}

.want {
  border-color: var(--ion-color-love);
}

.in-transit {
  border-color: var(--ion-color-pending);
}

.have {
  border-color: var(--ion-color-owned);
}
</style>
