<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue"
import { useWebAppMainButton } from ".."

const props = defineProps({
  text: { type: String },
  color: { type: String },
  textColor: { type: String },
  visible: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  progress: { type: Boolean, default: false },
  shining: { type: Boolean, default: false },
})
const emit = defineEmits<{
  (eventName: "click"): void
}>()

const {
  setMainButtonParams,
  onMainButtonClicked,
  hideMainButton,
  showMainButtonProgress,
  hideMainButtonProgress,
} = useWebAppMainButton()

watch(
  () => props.text,
  text => {
    setMainButtonParams({
      text,
    })
  },
)

watch(
  () => props.color,
  color => {
    setMainButtonParams({
      color,
    })
  },
)

watch(
  () => props.textColor,
  textColor => {
    setMainButtonParams({
      text_color: textColor,
    })
  },
)

watch(
  () => props.visible,
  isVisible => {
    setMainButtonParams({
      is_visible: isVisible,
    })
  },
)

watch(
  () => props.disabled,
  isDisabled => {
    setMainButtonParams({
      is_active: !isDisabled,
    })
  },
)

watch(
  () => props.progress,
  inProgress => {
    inProgress ? showMainButtonProgress() : hideMainButtonProgress()
  },
)

watch(
  () => props.shining,
  isShining => {
    setMainButtonParams({
      is_shining: isShining,
    })
  },
)

onMainButtonClicked(() => emit("click"))

onMounted(() => {
  props.progress ? showMainButtonProgress() : hideMainButtonProgress()

  setMainButtonParams({
    text: props.text,
    text_color: props.textColor,
    color: props.color,
    is_active: !props.disabled,
    is_visible: props.visible,
    has_shine_effect: props.shining,
  })
})

onUnmounted(() => {
  hideMainButtonProgress()
  hideMainButton()
})
</script>

<template></template>
