import { defineComponent, PropType } from 'vue';
import './switch.scss';

const switchProps = {
  size: {
    type: String as PropType<'sm' | '' | 'lg'>,
    default: ''
  },
  color: {
    type: String,
    default: undefined
  },
  checked: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  beforeChange: {
    type: Function as PropType<(v: boolean) => boolean | Promise<boolean>>,
    default: undefined
  },
  change: {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  },
  'onUpdate:checked': {
    type: Function as PropType<(v: boolean) => void>,
    default: undefined
  }
} as const;

export default defineComponent({
  name: 'DSwitch',
  props: switchProps,
  emits: ['change', 'update:checked'],
  setup(props, ctx) {
    const canChange = () => {
      if (props.disabled) {
        return Promise.resolve(false);
      }
      if (props.beforeChange) {
        const res = props.beforeChange(!props.checked);
        return typeof res === 'boolean' ? Promise.resolve(res) : res;
      }

      return Promise.resolve(true);
    };
    const toggle = () => {
      canChange().then(res => {
        if (!res) {
          return;
        }
        ctx.emit('update:checked', !props.checked);
        ctx.emit('change', !props.checked);
      });
    };

    return {
      toggle
    };
  },

  render () {
    const {
      size,
      checked,
      disabled,
      color,
      toggle
    } = this;

    const outerCls = {
      'devui-switch': true,
      [`devui-switch-${size}`]: size !== '',
      'devui-checked': checked,
      'devui-disabled': disabled
    };
    const outerStyle = [
      `background: ${checked && !disabled ? color : ''}`,
      `border-color: ${checked && !disabled ? color : ''}`
    ];

    return (
      <span class={outerCls} style={outerStyle} onClick={toggle}>
        <span class="devui-switch-inner-wrapper">
            <div class="devui-switch-inner">
              { checked ? this.$slots.checkedContent?.() : this.$slots.uncheckedContent?.() }
            </div>
        </span>
        <small></small>
      </span>
    );
  }
});