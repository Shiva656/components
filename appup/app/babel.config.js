// This babel plugin will remove all console.log
const removeConsolePlugin = []
if(process.env.NODE_ENV === 'production') {
  removeConsolePlugin.push("transform-remove-console")
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  // plugins: removeConsolePlugin
}