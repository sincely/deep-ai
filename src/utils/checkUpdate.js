import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

export default function checkUpdate(mainWindow) {
  autoUpdater.setFeedURL('http://localhost:9000') //设置要检测更新url

  const isDevelopment = process.env.NODE_ENV === 'development'
  console.log('isDevelopment:', isDevelopment)
  if (isDevelopment) {
    // 强制在开发环境进行更新检查
    autoUpdater.forceDevUpdateConfig = true
  }

  //检测更新
  autoUpdater.checkForUpdates()

  //监听'error'事件
  autoUpdater.on('error', (err) => {
    console.log('出错:', err)
  })

  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    console.log('found new version')
  })

  //默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Download speed: ${progressObj.bytesPerSecond}`)
    console.log(`Downloaded ${progressObj.percent}%`)
    console.log(`Transferred ${progressObj.transferred}/${progressObj.total}`)
  })

  // 监听'update-downloaded'事件，新版本下载完成时触发
  autoUpdater.on('update-downloaded', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: '应用更新',
        message: '发现新版本，是否更新？',
        buttons: ['是', '否']
      })
      .then((buttonIndex) => {
        if (buttonIndex.response == 0) {
          //选择是，则退出程序，安装新版本
          autoUpdater.quitAndInstall()
          app.quit()
        }
      })
  })
}
