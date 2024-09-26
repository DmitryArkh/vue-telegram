<script lang="ts" setup>
import {
  useWebApp,
  useWebAppHapticFeedback,
  useWebAppMainButton,
  useWebAppSecondaryButton,
  useWebAppNavigation,
  useWebAppPopup,
  useWebAppQrScanner,
  useWebAppTheme,
  useWebAppViewport,
  useWebAppBiometricManager,
} from '../src'

const { version, platform, initData, initDataUnsafe, sendData } = useWebApp()
const { expand, isExpanded, viewportHeight, viewportStableHeight, isVerticalSwipesEnabled } = useWebAppViewport()
const { openLink, openTelegramLink, switchInlineQuery } = useWebAppNavigation()
const { showConfirm, showAlert, showPopup } = useWebAppPopup()
const {
  showMainButton,
  hideMainButton,
  showMainButtonProgress,
  hideMainButtonProgress,
  mainButtonText,
  mainButtonColor,
  mainButtonTextColor,
  isMainButtonActive,
  isMainButtonVisible,
  isMainButtonProgressVisible,
  hasMainButtonShineEffect,
  setMainButtonParams,
} = useWebAppMainButton()
const {
  showSecondaryButton,
  hideSecondaryButton,
  showSecondaryButtonProgress,
  hideSecondaryButtonProgress,
  secondaryButtonText,
  secondaryButtonColor,
  secondaryButtonTextColor,
  secondaryButtonPosition,
  isSecondaryButtonActive,
  isSecondaryButtonVisible,
  isSecondaryButtonProgressVisible,
  hasSecondaryButtonShineEffect,
  setSecondaryButtonParams,
} = useWebAppSecondaryButton()
const { colorScheme, themeParams, headerColor, backgroundColor, bottomBarColor } = useWebAppTheme()
const { impactOccurred, notificationOccurred, selectionChanged } = useWebAppHapticFeedback()
const { showScanQrPopup } = useWebAppQrScanner()
const {
  isBiometricInited,
  isBiometricAccessRequested,
  isBiometricAccessGranted,
  isBiometricTokenSaved,
  isBiometricAvailable,
  biometricDeviceId,
  initBiometric,
  requestBiometricAccess,
  authenticateBiometric,
  openBiometricSettings,
} = useWebAppBiometricManager()

function toggleMainButton() {
  isMainButtonVisible.value
    ? hideMainButton()
    : showMainButton()
}

function toggleMainButtonProgress() {
  isMainButtonProgressVisible.value
    ? hideMainButtonProgress()
    : showMainButtonProgress(true)
}

function toggleMainButtonShining() {
  hasMainButtonShineEffect.value = !hasMainButtonShineEffect.value
}

function toggleSecondaryButton() {
  isSecondaryButtonVisible.value
    ? hideSecondaryButton()
    : showSecondaryButton()
}

function toggleSecondaryButtonProgress() {
  isSecondaryButtonProgressVisible.value
    ? hideSecondaryButtonProgress()
    : showSecondaryButtonProgress(true)
}

function toggleSecondaryButtonShining() {
  hasSecondaryButtonShineEffect.value = !hasSecondaryButtonShineEffect.value
}

function changeSecondaryButtonPosition() {
  const positions = {
    left: 'right',
    right: 'top',
    top: 'bottom',
    bottom: 'left'
  };
  setSecondaryButtonParams({ position: positions[secondaryButtonPosition.value] });
}

function initBiometricManager() {
  initBiometric(() => console.log('init: isAccessGranted'))
}

function requestAccessBiometricManager() {
  requestBiometricAccess({})
}

function authenticateBiometricManager() {
  authenticateBiometric({}, (isAuthenticated) => {
    showAlert(`isAuthenticated: ${isAuthenticated}`)
  })
}

function openSettingsBiometricManager() {
  openBiometricSettings()
}
</script>

<template>
  <section>
    <tg-main-button disabled />
    <tg-secondary-button disabled />
    <button @click.prevent="sendData('Hello, World!')">
      Send «Hello, World!»
    </button>
  </section>

  <section>
    <div>
      <h4>Main Button:</h4>
      <p>
        isMainButtonActive: {{ isMainButtonActive }}
      </p>
      <p>
        isMainButtonVisible: {{ isMainButtonVisible }}
      </p>
      <p>
        isMainButtonProgressVisible: {{ isMainButtonProgressVisible }}
      </p>
      <p>
        mainButtonText: {{ mainButtonText }}
      </p>
      <p>
        mainButtonColor: {{ mainButtonColor }}
      </p>
      <p>
        mainButtonTextColor: {{ mainButtonTextColor }}
      </p>
      <p>
        hasMainButtonShineEffect: {{ hasMainButtonShineEffect }}
      </p>

      <button @click.prevent="toggleMainButton">
        Toggle Main Button
      </button>
      <button @click.prevent="toggleMainButtonProgress">
        Toggle Main Button Progress
      </button>
      <button @click.prevent="toggleMainButtonShining">
        Toggle Main Button Shining
      </button>
      <button
        @click.prevent="setMainButtonParams({
          text: 'DONE',
          color: '#000',
          text_color: '#e6e6e6',
        })"
      >
        Update Main Button
      </button>
    </div>
    <div>
      <h4>Secondary Button:</h4>
      <p>
        isSecondaryButtonActive: {{ isSecondaryButtonActive }}
      </p>
      <p>
        isSecondaryButtonVisible: {{ isSecondaryButtonVisible }}
      </p>
      <p>
        isSecondaryButtonProgressVisible: {{ isSecondaryButtonProgressVisible }}
      </p>
      <p>
        secondaryButtonText: {{ secondaryButtonText }}
      </p>
      <p>
        secondaryButtonColor: {{ secondaryButtonColor }}
      </p>
      <p>
        secondaryButtonTextColor: {{ secondaryButtonTextColor }}
      </p>
      <p>
        secondaryButtonPosition: {{ secondaryButtonPosition }}
      </p>
      <p>
        hasSecondaryButtonShineEffect: {{ hasSecondaryButtonShineEffect }}
      </p>

      <button @click.prevent="toggleSecondaryButton">
        Toggle Secondary Button
      </button>
      <button @click.prevent="toggleSecondaryButtonProgress">
        Toggle Secondary Button Progress
      </button>
      <button @click.prevent="toggleSecondaryButtonShining">
        Toggle Secondary Button Shining
      </button>
      <button @click.prevent="changeSecondaryButtonPosition">
        Change Secondary Button Position
      </button>
      <button
        @click.prevent="setSecondaryButtonParams({
          text: 'DONE',
          color: '#e6e6e6',
          text_color: '#000',
        })"
      >
        Update Secondary Button
      </button>
    </div>

    <div>
      <h4>Viewport:</h4>
      <p>
        Viewport height: {{ viewportHeight }}
      </p>
      <p>
        Viewport stable height: {{ viewportStableHeight }}
      </p>
      <p>
        Expanded: {{ isExpanded }}
      </p>
      <p>
        Vertical Swipes: {{ isVerticalSwipesEnabled }}
      </p>

      <button @click.prevent="expand()">
        Expand Viewport
      </button>
      <button @click.prevent="isVerticalSwipesEnabled = !isVerticalSwipesEnabled">
        Toggle Vertical Swipes
      </button>
    </div>

    <div>
      <h4>Navigation:</h4>
      <ul>
        <li>
          <a href="?nextpage=1">Regular link</a> (opens inside webview)
        </li>
        <li>
          <a
            href="https://telegram.org/" target="_blank"
          >target="_blank" link</a> (opens outside webview)
        </li>
        <li>
          <a
            href="javascript:window.open('https://telegram.org/');"
          >window.open() link</a> (opens outside webview)
        </li>
        <li>
          <a
            href="https://t.me/like"
          >LikeBot t.me link</a> (opens inside Telegram app)
        </li>
        <li>
          <a
            href="#"
            @click.prevent="openTelegramLink('https://t.me/vote');"
          >openTelegramLink()</a> (opens
          inside Telegram app)
        </li>
        <li>
          <a
            href="#" @click.prevent=" openLink('https://google.com/'); "
          >openLink()</a> (opens outside
          webview)
        </li>
        <li>
          <a
            href="#"
            @click.prevent=" openLink('https://telegra.ph/api', { try_instant_view: true }); "
          >openLink({try_instant_view:true})</a>
          (opens IV inside Telegram app)
        </li>
        <li>
          <a
            href="#"
            @click.prevent=" switchInlineQuery('query'); "
          >switchInlineQuery('query')</a>
          (opens inline query inside Telegram app)
        </li>
      </ul>
    </div>

    <div>
      <h4>Popups:</h4>
      <ul>
        <li>
          <a
            href="#" @click.prevent="showAlert('Hello!');"
          >showAlert</a>
        </li>
        <li>
          <a
            href="#" @click.prevent="showConfirm('Are you sure?');"
          >showConfirm</a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="showPopup({
              message: 'Hello!',
            });"
          >showPopup</a>
        </li>
        <li>
          <a
            href="#"
            @click.prevent="showScanQrPopup({
              text: 'Test',
            })"
          >showScanQrPopup</a>
        </li>
      </ul>
    </div>

    <div>
      <h4>Haptics:</h4>
      <ul>
        <li>
          Impact: <a
            href="#"
            @click.prevent="impactOccurred('heavy');"
          >heavy</a>, &nbsp; <a
            href="#"
            @click.prevent="impactOccurred('light');"
          >light</a>, &nbsp; <a
            href="#"
            @click.prevent="impactOccurred('medium');"
          >medium</a>, &nbsp; <a
            href="#"
            @click.prevent="impactOccurred('rigid');"
          >rigid</a>, &nbsp; <a
            href="#"
            @click.prevent="impactOccurred('soft');"
          >soft</a><br><br>
        </li>
        <li>
          Notification: <a
            href="#" @click.prevent="notificationOccurred('error');"
          >error</a>,
          &nbsp; <a
            href="#" @click.prevent="notificationOccurred('success');"
          >success</a>, &nbsp; <a
            href="#"
            @click.prevent="notificationOccurred('warning');"
          >warning</a><br><br>
        </li>
        <li>
          Selection: <a
            href="#" @click.prevent="selectionChanged();"
          >changed</a><br><br>
        </li>
      </ul>
    </div>

    <div>
      <h4>Data passed</h4>
      <h5>initData</h5>
      <pre><code>{{ initData }}</code></pre>
      <h5>initDataUnsafe</h5>
      <pre><code>{{ initDataUnsafe }}</code></pre>
    </div>

    <div>
      <h4>Theme params</h4>
      <div class="sect_row">
        Color scheme: {{ colorScheme }}
      </div>
      <div class="sect_row">
        Header:
        <select disabled>
          <option :selected="headerColor === themeParams.bg_color ">
            bg_color ({{ headerColor }})
          </option>
          <option :selected="headerColor === themeParams.secondary_bg_color ">
            secondary_bg_color ({{ headerColor }})
          </option>
        </select>
      </div>
      <div class="sect_row">
        Background:
        <select disabled>
          <option :selected="backgroundColor === themeParams.bg_color ">
            bg_color ({{ backgroundColor }})
          </option>
          <option :selected="backgroundColor === themeParams.secondary_bg_color ">
            secondary_bg_color ({{ backgroundColor }})
          </option>
        </select>
      </div>
      <div class="sect_row">
        Bottom bar:
        <select disabled>
          <option :selected="bottomBarColor === themeParams.bg_color ">
            bg_color ({{ bottomBarColor }})
          </option>
          <option :selected="bottomBarColor === themeParams.secondary_bg_color ">
            secondary_bg_color ({{ bottomBarColor }})
          </option>
        </select>
      </div>

      <pre><code>{{ themeParams }}</code></pre>
    </div>

    <div>
      <h4>Biometric Manager</h4>
      <p>isBiometricInited: {{ isBiometricInited }}</p>
      <p>isBiometricAccessRequested: {{ isBiometricAccessRequested }}</p>
      <p>isBiometricAccessGranted: {{ isBiometricAccessGranted }}</p>
      <p>isBiometricTokenSaved: {{ isBiometricTokenSaved }}</p>
      <p>isBiometricAvailable: {{ isBiometricAvailable }}</p>
      <p>biometricDeviceId: {{ biometricDeviceId }}</p>

      <button @click.prevent="initBiometricManager">Init</button>
      <button @click.prevent="requestAccessBiometricManager">
        request access
      </button>
      <button @click.prevent="authenticateBiometricManager">
        authenticate
      </button>
      <button @click.prevent="openSettingsBiometricManager">
        open settings
      </button>
    </div>

    <div>
      Version: {{ version }}
      <br>
      Platform: {{ platform }}
    </div>
  </section>
</template>

<style>
body {
  background-color: white;
}
</style>
