import type { App } from 'vue'
import Badge from './src/badge'

Badge.install = function (app: App) {
  app.component(Badge.name, Badge)
}

export { Badge }

export default {
  title: 'Badge 徽标',
  category: '数据展示',
  install(app: App): void {
    app.use(Badge as any)
  }
}
