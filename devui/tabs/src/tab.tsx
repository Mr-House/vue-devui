import { defineComponent, inject } from 'vue'
import { Tabs } from './tabs';

export default defineComponent({
  name: 'DTab',
  props: {
    title: {
      default: null,
      type: [String, Number]
    },
    id: {
      default: null,
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {slots}) {
    const tabs = inject<Tabs>(
      'tabs'
    );
    tabs.state.data.push(props);
    return () => {
      const content = tabs.state.showContent &&  tabs.state.active === props.id  ? (
      <div class="devui-tab-content">
          <div role="tabpanel" class="devui-tab-pane in active">
            {slots.default()}
        </div>
      </div>): null;
      return content
    }
  }
})