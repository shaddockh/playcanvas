/* global: pc */

/**
 * @module components-lander
 */
pc.script.create('LanderPlayer', function (context) {


    var UI = null;


    /**
     * Lunar Lander player controller
     *
     * binds the movement keys:
     *   - thrust:  space, up, or K
     *   - left:  left, A, or H
     *   - right: right, D, or L
     *   - reset: R
     *
     * @class LanderPlayer
     * @param entity
     * @constructor
     */
    var LanderPlayerComponent = function (entity) {
        this.entity = entity;

        this.thrust = pc.math.vec3.create(); //for temporary use
        this.resetting = false;
        this.gameOver = false;


        this.isThrusting = false;
    };

    /**
     * Thruster power
     * @property {number} THRUST_IMPULSE
     * @default 350
     */
    var THRUST_IMPULSE = 350;

    /**
     * Turning speed
     * @property {number} TORQUE_IMPULSE
     * @default 40
     */
    var TORQUE_IMPULSE = 40;

    /**
     * Max velocity allowed for successful landing
     * @property {number} MAX_VELOCITY
     * @default 3
     */
    var MAX_VELOCITY = 0.5;

    LanderPlayerComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         *
         *
         * @method initialize
         */
        initialize: function () {
            context.controller = new pc.input.Controller(document);
            context.controller.registerKeys('thrust', [pc.input.KEY_SPACE, pc.input.KEY_UP, pc.input.KEY_K]);
            context.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A, pc.input.KEY_Q, pc.input.KEY_H]);
            context.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D, pc.input.KEY_L]);
            context.controller.registerKeys('reset', [pc.input.KEY_R]);

            context.controller.registerKeys('UI', [pc.input.KEY_0]);


            context.systems.rigidbody.on('contact', this.onContact, this);  //bind the rigidbody oncontact to the onContact event

            this.flame = this.entity.findByName('flame');
            this.light = this.entity.findByName('light');
            this.light.light.enable = false;

            this.ui = context.root.findByName('Camera');
        },


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {
            if (!this.gameOver) {
                if (context.controller.isPressed('thrust')) {
                    this.startThrusting();
                } else {
                    this.stopThrusting();
                }

                if (context.controller.isPressed('left')) {
                    this.entity.rigidbody.activate();
                    this.entity.rigidbody.applyTorqueImpulse(0,0,TORQUE_IMPULSE);
                }

                if (context.controller.isPressed('right')) {
                    this.entity.rigidbody.activate();
                    this.entity.rigidbody.applyTorqueImpulse(0,0,-TORQUE_IMPULSE);
                }

            }
            if (context.controller.wasPressed('reset')) {
                this.reset(true);
            }
        },

        /**
         * Resets the ship back to the center of the screen
         * @method reset
         * @param {bool} [immediate] set to true to restart immediately
         */
        reset: function(immediate) {

            if (!this.resetting) {
                this.resetting = true;
                this.stopThrusting();
                setTimeout(function() {
                    this.entity.setPosition(0,30,0);
                    this.entity.setEulerAngles(0,0,0);
                    this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
                    this.entity.rigidbody.linearVelocity = pc.math.vec3.zero;
                    this.entity.rigidbody.angularVelocity = pc.math.vec3.zero;
                    this.resetting = false;
                    this.gameOver = false;
                    this.ui.script.send('LanderUI','setVisibility', false);
                }.bind(this), immediate ? 0 : 2000);
            }

        },

        playerDied: function() {
            if (!this.gameOver) {
                this.stopThrusting();
                this.gameOver = true;
                this.ui.script.send('LanderUI','showGameOver');
                //this.reset();
            }
        },



        /**
         * @method startThrusting
         */
        startThrusting: function() {
            pc.math.vec3.scale(this.entity.up, THRUST_IMPULSE, this.thrust);
            this.entity.rigidbody.activate(); //may become inactive if not used for a while
            this.entity.rigidbody.applyImpulse(this.thrust);

            if (!this.isThrusting) {
                this.flame.model.setVisible(true);
                this.entity.audiosource.play('thruster');
                this.light.light.enable = true;
                this.isThrusting = true;
            }
        },

        /**
         * @method stopThrusting
         */
        stopThrusting: function() {
            if (this.isThrusting) {
                this.flame.model.setVisible(false);
                this.entity.audiosource.pause();
                this.light.light.enable = false;
                this.isThrusting = false;
            }

        },

        /**
         * Called when this entity hits a rigid body
         * @param {ContactResult} result
         * @method onContact
         */
        onContact: function(result) {
            var speed;
            var entity,
                object;

            if (result.a === this.entity) {
                entity = result.a;
                object = result.b;
            } else if (result.b === this.entity) {
                entity = result.b;
                object = result.a;
            }


            if (entity) {
                if (object.getName() === 'platform') {
                    //we landed on the platform
                    speed = pc.math.vec3.length(this.entity.rigidbody.linearVelocity);

                    if (speed > MAX_VELOCITY) {
                        this.explode();
                    }
                } else {
                    this.explode();
                }
            }
        },


        /**
         * Blow up the entity
         * @method explode
         */
        explode: function() {
            if (!this.gameOver) {
                this.stopThrusting();
                this.entity.audiosource.play('explode');
                this.playerDied();
            }
        }
    };

    return LanderPlayerComponent;
});
