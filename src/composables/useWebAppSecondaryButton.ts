import { computed, ref } from "vue"
import { useWebApp } from "./useWebApp"
import type { OnEventOptions } from "~/types"

const secondaryButtonText = ref(Telegram.WebApp.SecondaryButton.text)
const secondaryButtonColor = ref(Telegram.WebApp.SecondaryButton.color)
const secondaryButtonTextColor = ref(Telegram.WebApp.SecondaryButton.textColor)
const secondaryButtonPosition = ref(Telegram.WebApp.SecondaryButton.position)
const isSecondaryButtonVisible = ref(Telegram.WebApp.SecondaryButton.isVisible)
const isSecondaryButtonActive = ref(Telegram.WebApp.SecondaryButton.isActive)
const isSecondaryButtonProgressVisible = ref(
  Telegram.WebApp.SecondaryButton.isProgressVisible,
)
const hasSecondaryButtonShineEffect = ref(
  Telegram.WebApp.SecondaryButton.hasShineEffect,
)

function updateState() {
  secondaryButtonText.value = Telegram.WebApp.SecondaryButton.text
  secondaryButtonColor.value = Telegram.WebApp.SecondaryButton.color
  secondaryButtonTextColor.value = Telegram.WebApp.SecondaryButton.textColor
  secondaryButtonPosition.value = Telegram.WebApp.SecondaryButton.position
  isSecondaryButtonVisible.value = Telegram.WebApp.SecondaryButton.isVisible
  isSecondaryButtonActive.value = Telegram.WebApp.SecondaryButton.isActive
  isSecondaryButtonProgressVisible.value =
    Telegram.WebApp.SecondaryButton.isProgressVisible
  hasSecondaryButtonShineEffect.value =
    Telegram.WebApp.SecondaryButton.hasShineEffect
}

function setSecondaryButtonText(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.setText>
) {
  Telegram.WebApp.SecondaryButton.setText(...params)
  updateState()
}

function showSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.show>
) {
  Telegram.WebApp.SecondaryButton.show(...params)
  updateState()
}

function hideSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.hide>
) {
  Telegram.WebApp.SecondaryButton.hide(...params)
  updateState()
}

function enableSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.enable>
) {
  Telegram.WebApp.SecondaryButton.enable(...params)
  updateState()
}

function disableSecondaryButton(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.disable>
) {
  Telegram.WebApp.SecondaryButton.disable(...params)
  updateState()
}

function showSecondaryButtonProgress(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.showProgress>
) {
  Telegram.WebApp.SecondaryButton.showProgress(...params)
  updateState()
}

function hideSecondaryButtonProgress(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.hideProgress>
) {
  Telegram.WebApp.SecondaryButton.hideProgress(...params)
  updateState()
}

function setSecondaryButtonParams(
  ...params: Parameters<typeof Telegram.WebApp.SecondaryButton.setParams>
) {
  Telegram.WebApp.SecondaryButton.setParams(...params)
  updateState()
}

export function useWebAppSecondaryButton() {
  const { onEvent } = useWebApp()

  const onSecondaryButtonClicked = (
    eventHandler: SecondaryButtonClickedCallback,
    options?: OnEventOptions,
  ) => onEvent("secondaryButtonClicked", eventHandler, options)

  return {
    secondaryButtonText: computed({
      get() {
        return secondaryButtonText.value
      },
      set(text) {
        setSecondaryButtonText(text)
      },
    }),
    secondaryButtonColor: computed({
      get() {
        return secondaryButtonColor.value
      },
      set(color) {
        setSecondaryButtonParams({
          color,
        })
      },
    }),
    secondaryButtonTextColor: computed({
      get() {
        return secondaryButtonTextColor.value
      },
      set(color) {
        setSecondaryButtonParams({
          text_color: color,
        })
      },
    }),
    secondaryButtonPosition: computed({
      get() {
        return secondaryButtonPosition.value
      },
      set(position) {
        setSecondaryButtonParams({
          position,
        })
      },
    }),
    isSecondaryButtonVisible: computed({
      get() {
        return isSecondaryButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showSecondaryButton() : hideSecondaryButton()
      },
    }),
    isSecondaryButtonActive: computed({
      get() {
        return isSecondaryButtonActive.value
      },
      set(isActive) {
        isActive ? enableSecondaryButton() : disableSecondaryButton()
      },
    }),
    isSecondaryButtonProgressVisible: computed({
      get() {
        return isSecondaryButtonProgressVisible.value
      },
      set(isProgressVisible) {
        isProgressVisible
          ? showSecondaryButtonProgress()
          : hideSecondaryButtonProgress()
      },
    }),
    hasSecondaryButtonShineEffect: computed({
      get() {
        return hasSecondaryButtonShineEffect.value
      },
      set(hasShineEffect) {
        setSecondaryButtonParams({
          has_shine_effect: hasShineEffect,
        })
      },
    }),
    setSecondaryButtonText,
    onSecondaryButtonClicked,
    showSecondaryButton,
    hideSecondaryButton,
    enableSecondaryButton,
    disableSecondaryButton,
    showSecondaryButtonProgress,
    hideSecondaryButtonProgress,
    setSecondaryButtonParams,
  }
}
