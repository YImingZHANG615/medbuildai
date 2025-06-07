const { app, BrowserWindow } = require('electron')
const path = require('path')

// 获取正确的资源文件路径
function getAssetPath(assetPath) {
  if (process.pkg) {
    // 如果是打包后的环境
    return path.join(process.cwd(), assetPath)
  }
  return path.join(__dirname, assetPath)
}

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: getAssetPath('logo.svg')
  })

  win.loadFile(getAssetPath('index.html'))
  
  // 取消菜单栏
  win.setMenu(null)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 