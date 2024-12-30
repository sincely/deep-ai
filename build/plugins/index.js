import vue from '@vitejs/plugin-vue'
import unplugin from './unplugin' // unplugin自动导入
import inspect from './inspect' // vue插件检查页面
import legacy from './legacy' // 浏览器兼容
import htmlPlugin from './html' // html插件
import svgIconPlugin from './svgIcon' // svg图标集成
/**
 * @description  创建vite插件
 * @param viteEnv - 环境变量配置
 * @param isBuild - 是否编译
 */
export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), ...unplugin(), svgIconPlugin()]
  if (isBuild) {
    vitePlugins.push(legacy(), htmlPlugin())
  } else {
    vitePlugins.push(inspect())
  }
  return vitePlugins
}
