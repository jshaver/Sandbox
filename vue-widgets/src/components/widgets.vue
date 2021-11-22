<template>
  <div class="content-container">
    <div class="section content-title-group">
      <h2 class="title">Widget Sample</h2>
      <div class="columns">
        <div class="column is-8" v-if="widgets">
          <ul v-if="!selectedWidget">
            <li v-for="widget in widgets" :key="widget.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="widget.id" class="name">
                      {{ widget.name }} - {{ widget.id }}
                    </div>
                    <div class="description">{{ widget.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="selectWidget(widget)"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <WidgetDetail
            :widget="selectedWidget"
            @save="saveWidget"
            @cancel="cancelWidget"
            v-if="selectedWidget"
          />
          <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { widgetWatchers, lifecycleHooks, data } from '../shared';
import WidgetDetail from '@/components/widget-detail';

export default {
  name: 'Widgets',
  data() {
    return {
      widgets: [],
      selectedWidget: undefined,
      message: '',
    };
  },
  components: {
    WidgetDetail,
  },
  mixins: [lifecycleHooks, widgetWatchers],
  async created() {
    await this.loadWidgets();
  },
  methods: {
    async loadWidgets() {
      this.widgets = [];
      this.message = 'fetching widgets';

      this.widgets = await data.getWidgets();

      this.message = '';
    },
    cancelWidget() {
      this.selectedWidget = undefined;
    },
    saveWidget(widget) {
      const index = this.widgets.findIndex(w => w.id === widget.id);
      this.widgets.splice(index, 1, widget);
      this.widgets = [...this.widgets];
      this.selectedWidget = undefined;
    },
    selectWidget(widget) {
      this.selectedWidget = widget;
    },
  },
};
</script>
