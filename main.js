// AI Documentation: This was generated entirely by the AI agent using the AGENTS.md as a style guide 
// and the code from the blockchain assignment

// npm install --save-dev electron
import { app, BrowserWindow } from 'electron'
import path from 'path'
// This lets the app know the current file and directory
import { fileURLToPath } from 'url'
import './server/server.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function createWindow() {

    // This is the window size that the app will open with.
    let objWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        }
    })

    // Loading the local Express app
    objWindow.loadURL('http://localhost:8000')
}

app.whenReady()
    .then(() => {
        createWindow()

        // Creating and showing a new window if the user closes and reopens the app
        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow()
            }
        })
    })
    .catch(err => {
        console.error("Error starting Electron:", err)
    })

// Quitting the app when the user closes the window
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
