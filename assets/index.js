import angular from 'angular'
import './style.scss'

const app = angular.module("animation", [])

app.component('animation', {
    template: `
        <div class="animation-container">
            <div class="buttons-container">
                <button ng-click="vm.restart()">Restart</button>
                <button ng-click="vm.condition === 'paused' ? vm.play() : vm.pause()">
                    {{ vm.condition === 'paused' ? 'Play' : 'Pause' }}
                </button>
            </div>
        </div>
    `,
    controllerAs: 'vm',
    controller: function ($interval) {
        const vm = this
        let images = [
            'dist' + require(`./images/back_2_0.jpg`),
            'dist' + require(`./images/back_2_1.jpg`),
            'dist' + require(`./images/back_2_2.jpg`),
            'dist' + require(`./images/back_2_3.jpg`),
            'dist' + require(`./images/back_2_4.jpg`),
            'dist' + require(`./images/back_2_5.jpg`),
        ],
        textures = [],
        slide = 0,
        speed = 150,
        animation = null,
        app = new PIXI.Application({width: 864, height: 730, transparent: true}), 
        currentSprite = null

        PIXI.loader.add(images).load(setup)
        
        function setup() {
            images.map(i => textures.push(new PIXI.Sprite(PIXI.loader.resources[i].texture)))
            vm.play()
        }

        vm.restart = () => {
            slide = 0
            if (vm.condition === 'paused') vm.play()
        }

        vm.pause = () => {
            vm.condition = 'paused'
            $interval.cancel(animation)
        }

        vm.play = () => {
            vm.condition = 'playing'
            animation = $interval(() => {
                currentSprite = textures[slide]
                app.stage.addChild(currentSprite)
                slide++
                if (slide > 5) slide = 0
            }, speed)
        }

        document.querySelector('.animation-container').appendChild(app.view)
    }
})