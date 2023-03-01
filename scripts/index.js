const menu = document.getElementById('menu_items')
const menubar = document.getElementById('menubar')
const toggleMenu = () => {
    if (menu.className == 'visible') {
        menu.className = ''
    } else {
        menu.className = 'visible'
    }
}
const closeMenu = () => {
    let menu = document.getElementById('menu_items')
    menu.classList.remove('visible')
}
const getClickTarget = e => {
    let menu = document.getElementById('menu')
    if ((e.target.isSameNode(menu)) || (menu.children[0].isSameNode(e.target) || menu.children[1].isSameNode(e.target))) {
        return false;
    } else {
        closeMenu()
    }
}
document.body.addEventListener('click', getClickTarget)
menubar.addEventListener('click', toggleMenu)
