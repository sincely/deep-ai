export const createModalWindow = (options) => {
  const defaultOptions = {
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  }
  const winOptions = Object.assign(defaultOptions, options)
  const win = new BrowserWindow(winOptions)
  win.loadURL(options.url)
  win.show()
  return win
}
