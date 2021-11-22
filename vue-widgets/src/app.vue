<template>
  <div id="app">
    <HeaderBar />
    <div class="main-section columns">
      <main class="column">
        <Widgets />
      </main>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header-bar';
import Widgets from '@/components/widgets';

export default {
  name: 'App',
  components: { HeaderBar, Widgets },
};
</script>

<style lang="scss">
@import '@/design/index.scss';
</style>
