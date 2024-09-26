<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue"
import { useWebAppSecondaryButton } from ".."

const props = defineProps({
  text: { type: String },
  color: { type: String },
  textColor: { type: String },
  position: { type: String },
  visible: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  progress: { type: Boolean, default: false },
  shining: { type: Boolean, default: false },
})
const emit = defineEmits<{
  (eventName: "click"): void
}>()

const {
  setSecondaryButtonParams,
  onSecondaryButtonClicked,
  hideSecondaryButton,
  showSecondaryButtonProgress,
  hideSecondaryButtonProgress,
} = useWebAppSecondaryButton()

watch(
  () => props.text,
  text => {
    setSecondaryButtonParams({
      text,
    })
  },
)

watch(
  () => props.color,
  color => {
    setSecondaryButtonParams({
      color,
    })
  },
)

watch(
  () => props.textColor,
  textColor => {
    setSecondaryButtonParams({
      text_color: textColor,
    })
  },
)

watch(
  () => props.position,
  position => {
    setSecondaryButtonParams({
      position,
    })
  },
)

watch(
  () => props.visible,
  isVisible => {
    setSecondaryButtonParams({
      is_visible: isVisible,
    })
  },
)

watch(
  () => props.disabled,
  isDisabled => {
    setSecondaryButtonParams({
      is_active: !isDisabled,
    })
  },
)

watch(
  () => props.progress,
  inProgress => {
    inProgress ? showSecondaryButtonProgress() : hideSecondaryButtonProgress()
  },
)

watch(
  () => props.shining,
  isShining => {
    setSecondaryButtonParams({
      is_shining: isShining,
    })
  },
)

onSecondaryButtonClicked(() => emit("click"))

onMounted(() => {
  props.progress ? showSecondaryButtonProgress() : hideSecondaryButtonProgress()

  setSecondaryButtonParams({
    text: props.text,
    text_color: props.textColor,
    color: props.color,
    position: props.position,
    is_active: !props.disabled,
    is_visible: props.visible,
    has_shine_effect: props.shining,
  })
})

onUnmounted(() => {
  hideSecondaryButtonProgress()
  hideSecondaryButton()
})
</script>

<template></template>
