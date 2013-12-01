/* global: pc */

/**
 * @module components
 */
pc.script.create('PanningCamera', function (context) {



    // Y - 1 -> 9
    // X - -6 -> 6

    var SPEED = 2;
    /**
     * Will pan the camera
     *
     * @class PanningCamera
     * @param entity
     * @constructor
     */
    var PanningCameraComponent = function (entity) {
        this.entity = entity;
    };

    PanningCameraComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {
            this.player = context.root.findByName('player');
            this.bindKeys();
        },

        bindKeys: function() {

            context.controller = new pc.input.Controller(document);
            context.controller.registerKeys('up', [pc.input.KEY_A, pc.input.KEY_UP, pc.input.KEY_K]);
            context.controller.registerKeys('down', [pc.input.KEY_Z, pc.input.KEY_DOWN, pc.input.KEY_J]);
            context.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A, pc.input.KEY_Q, pc.input.KEY_H]);
            context.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D, pc.input.KEY_L]);
            context.controller.registerKeys('reset', [pc.input.KEY_R]);

            context.controller.registerKeys('startGame', [pc.input.KEY_SPACE]);
        },

        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

            var playerPos = this.player.getPosition();
            var pos = this.entity.getPosition();
            pos[0] = playerPos[0];
            this.entity.setPosition(pos);

            //var localPos = this.entity.getLocalPosition();
            //localPos[0] += delta * SPEED;
            //this.entity.setLocalPosition(localPos);


            if (context.controller.isPressed('up')) {
                this.player.script.send('playership','moveUp',delta);
            }
            if (context.controller.isPressed('down')) {
                this.player.script.send('playership', 'moveDown',delta);
            }
            if (context.controller.isPressed('left')) {
                this.player.script.send('playership', 'moveLeft',delta);
            }
            if (context.controller.isPressed('right')) {
                this.player.script.send('playership', 'moveRight',delta);
            }

            /*
            if (context.controller.isPressed('left')) {
                this.entity.rigidbody.activate();
                this.entity.rigidbody.applyTorqueImpulse(0,0,TORQUE_IMPULSE);
            }

            if (context.controller.isPressed('right')) {
                this.entity.rigidbody.activate();
                this.entity.rigidbody.applyTorqueImpulse(0,0,-TORQUE_IMPULSE);
            }
            */
        }
    };

    return PanningCameraComponent;
});
