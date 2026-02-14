import { GAMEOPTIONS } from "./GameOption.js";

export default class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' })
    }

    create() {

        let bg = this.add.image(360,640,'bg1').setScale(0.4,0.6)
        let rule_image = this.add.image(360,640,'rule')
        let btnPlay = this.add.image(360,1020,'btnCenter').setScale(0.7).setInteractive()
        let txtLevel = this.add.bitmapText(360, 1020, 'rafale', 'PLay').setOrigin(0.5);
            txtLevel.tint = '0xffffff'
            txtLevel.fontSize = 35

            btnPlay.on('pointerdown', function (pointer) {
                if (localStorage.getItem('data_game')==null) {
                    this.data_game = this.scene.cache.json.get('data_game');
                    localStorage.setItem('data_game',JSON.stringify(this.data_game))
                } else {
                    this.data_game=JSON.parse(localStorage.getItem('data_game'))
                }
                GAMEOPTIONS.level = this.data_game.level
                this.scene.scene.start('game_play')
            })
    }


}