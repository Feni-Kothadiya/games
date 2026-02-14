//import Phaser from 'phaser'
import GamePlay from './scene/game_play.js'
import Preload from './scene/preload.js'
import GameMenu from './scene/game_menu.js'
import GameNext from './scene/game_next_lv.js'
import Tutorial from './scene/tutorial.js'
// import AnchorPlugin from '../rexanchorplugin.min.js';

    
let game
window.onload = function() {
let config = {
    type: Phaser.AUTO,
    // loader: {
    //     baseURL: 'thumb.png'
    // },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: "game",
        width:720,
        height:1280,
    },
    
    // backgroundColor: '#000000', 

    scene: [Preload,GamePlay, GameMenu,GameNext,Tutorial]
}
game = new Phaser.Game(config);

}
