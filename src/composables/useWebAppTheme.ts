import { computed, readonly, ref } from "vue"
import { useWebApp } from "./useWebApp"
import { OnEventOptions } from "~/types"

const colorScheme = ref(Telegram.WebApp.colorScheme)
const themeParams = ref(Telegram.WebApp.themeParams)
const headerColor = ref(Telegram.WebApp.headerColor)
const backgroundColor = ref(Telegram.WebApp.backgroundColor)
const bottomBarColor = ref(Telegram.WebApp.bottomBarColor)

function updateState() {
  colorScheme.value = Telegram.WebApp.colorScheme
  themeParams.value = {
    ...Telegram.WebApp.themeParams,
  }
  headerColor.value = Telegram.WebApp.headerColor
  backgroundColor.value = Telegram.WebApp.backgroundColor
  bottomBarColor.value = Telegram.WebApp.bottomBarColor
}

function setHeaderColor(
  ...params: Parameters<typeof Telegram.WebApp.setHeaderColor>
) {
  Telegram.WebApp.setHeaderColor(...params)
  updateState()
}

function setBackgroundColor(
  ...params: Parameters<typeof Telegram.WebApp.setBackgroundColor>
) {
  Telegram.WebApp.setBackgroundColor(...params)
  updateState()
}

function setBottomBarColor(
  ...params: Parameters<typeof Telegram.WebApp.setBottomBarColor>
) {
  Telegram.WebApp.setBottomBarColor(...params)
  updateState()
}

export function useWebAppTheme() {
  const { onEvent } = useWebApp()

  const onThemeChanged = (eventHandler: () => void, options?: OnEventOptions) =>
    onEvent("themeChanged", eventHandler, options)

  onThemeChanged(updateState)

  return {
    colorScheme: readonly(colorScheme),
    themeParams: readonly(themeParams),
    headerColor: computed({
      get() {
        return headerColor.value
      },
      set(newValue) {
        setHeaderColor(newValue)
      },
    }),
    backgroundColor: computed({
      get() {
        return backgroundColor.value
      },
      set(newValue) {
        setBackgroundColor(newValue)
      },
    }),
    bottomBarColor: computed({
      get() {
        return bottomBarColor.value
      },
      set(newValue) {
        setBottomBarColor(newValue)
      },
    }),
    setHeaderColor,
    setBackgroundColor,
    setBottomBarColor,
    onThemeChanged,
  }
}
