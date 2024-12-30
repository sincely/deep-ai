import { app, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

export default function checkUpdate(win) {
  const message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }

  function sendUpdateMessage(text) {
    win.webContents.send('message', text)
  }

  autoUpdater.setFeedURL('http://localhost:9000') //设置要检测更新url

  const isDevelopment = process.env.NODE_ENV === 'development'
  console.log('isDevelopment:', isDevelopment)
  if (isDevelopment) {
    // 强制在开发环境进行更新检查
    autoUpdater.forceDevUpdateConfig = true
  }

  console.log('process.platform:', process.platform)
  if (process.platform === 'darwin') {
    // 苹果平台【interl/M系列区分】
    const ARM = process.arch == 'arm64'
    console.log('ARM:', ARM)

    // const feedUUL = ARM ? 'https://xxxx.com/installer/mac/arm' : 'https://xxxx.com/installer/mac/intel'
    const feedUUL = ARM ? 'https://xxxx.com/installer/mac/arm' : 'http://localhost:9000/'
    autoUpdater.setFeedURL(feedUUL)
  } else {
    // windows平台
    autoUpdater.setFeedURL('http://localhost:9000')
  }

  // 检测新版本
  autoUpdater.checkForUpdatesAndNotify().catch()

  //监听'error'事件
  autoUpdater.on('error', (err) => {
    sendUpdateMessage(message.error)
  })

  //监听'update-available'事件，发现有新版本时触发
  autoUpdater.on('update-available', () => {
    sendUpdateMessage(message.updateAva)
  })

  autoUpdater.on('update-not-available', () => {
    sendUpdateMessage(message.updateNotAva)
  })
  //默认会自动下载新版本，如果不想自动下载，设置autoUpdater.autoDownload = false
  autoUpdater.on('download-progress', (progressObj) => {
    console.log(`Download speed: ${progressObj.bytesPerSecond}`)
    console.log(`Downloaded ${progressObj.percent}%`)
    console.log(`Transferred ${progressObj.transferred}/${progressObj.total}`)
    sendUpdateMessage(progressObj.percent / 100)
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
