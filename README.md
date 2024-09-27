## `vue-tg` - Telegram integration for Vue 

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.deptyped.com/)
[![version](https://img.shields.io/badge/Bot%20API-7.10-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#july-31-2024)
[![size](https://img.shields.io/bundlephobia/minzip/vue-tg?label=Size&style=flat&color=478be6)](https://bundlephobia.com/result?p=vue-tg@latest)

A lightweight package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

### Usage Example

```vue
<script lang="ts" setup>
import { MainButton, useWebAppPopup } from 'vue-tg'

const { showAlert } = useWebAppPopup()
</script>

<template>
  <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
</template>
```

### Installation

Install package:

```bash
npm i @dmitryarkh/vue-tg
```

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```
