import App from './main.js'
import callback from './callbacks.js'

const removeTrailingHash = () => {
    if (location.hash) location.hash = ''
}
App.getNote()
addEventListener('load', removeTrailingHash)
addEventListener('hashchange', App.toggleViews)