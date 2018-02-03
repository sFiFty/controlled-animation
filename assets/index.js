import angular from 'angular'
import './style.scss'

const app = angular.module("animation", [])

app.component('animation', {
    template: `
        <div class="animation-container">
            <img src="dist{{ vm.img }}">
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
        let slide = 0,
            speed = 150,
            animation = null

        vm.$onInit = () => vm.play()

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
                vm.img = require(`./images/back_2_${slide}.jpg`)
                slide++
                if (slide > 5) slide = 0
            }, speed)
        }

    }
})