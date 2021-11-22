<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">{{ fullName }}</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <label class="label" for="id">id</label>
            <label class="input" name="id" readonly>{{ clonedWidget.id }}</label>
          </div>
          <div class="field">
            <label class="label" for="name">name</label>
            <input
              class="input"
              name="name"
              v-model="clonedWidget.name"
            />
          </div>
          <div class="field">
            <label class="label" for="description">description</label>
            <input
              class="input"
              name="description"
              v-model="clonedWidget.description"
            />
          </div>
          <div class="field">
            <label class="label" for="date">date</label>
            <input
              type="date"
              class="input"
              id="date"
              v-model="clonedWidget.date"
            />
            <p class="comment">
              {{ clonedWidget.date | shortDate }}
            </p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <button
          class="link card-footer-item cancel-button"
          @click="cancelWidget()"
        >
          <i class="fas fa-undo"></i>
          <span>Cancel</span>
        </button>
        <button class="link card-footer-item" @click="saveWidget()">
          <i class="fas fa-save"></i>
          <span>Save</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';

import { displayDateFormat, lifecycleHooks } from '../shared';

export default {
  name: 'WidgetDetail',
  props: {
    widget: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      clonedWidget: { ...this.widget },
    };
  },
  mixins: [lifecycleHooks],
  computed: {
    fullName() {
      return this.clonedWidget
        ? `${this.clonedWidget.name} - ${this.clonedWidget.id}`
        : '';
    },
  },
  methods: {
    cancelWidget() {
      this.$emit('cancel');
    },
    saveWidget() {
      this.$emit('save', this.clonedWidget);
    },
  },
  filters: {
    shortDate: function(value) {
      return format(value, displayDateFormat);
    },
  },
};
</script>
