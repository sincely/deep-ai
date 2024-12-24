import path from 'path'
import { theme } from 'ant-design-vue'
import { kebabCase, camelCase } from 'lodash-es'
import fsExtra from 'fs-extra'

const { defaultAlgorithm, defaultSeed } = theme

const mapToken = defaultAlgorithm(defaultSeed)

const formatKey = (key, prefixCls) => {
  return `${prefixCls}${kebabCase(key)}`
}
const prefixCls = '--pro-ant-'

const variables = {
  colors: {}
}
let colorTheme = ''
for (const key in mapToken) {
  if (key.startsWith('color')) {
    const cssVar = formatKey(key, prefixCls)
    const { colors } = variables
    const themeKey = camelCase(key.slice(5))
    colors[themeKey] = `var(${cssVar})`
    colorTheme += `${themeKey}\n`
  }
}

fsExtra.outputFile(path.resolve(process.cwd(), './themes/antd-uno-theme.json'), JSON.stringify(variables, null, 2))

fsExtra.outputFile(path.resolve(process.cwd(), './themes/color-theme-var.md'), colorTheme)
