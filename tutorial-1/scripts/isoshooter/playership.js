/* global: pc */

/**
 * @module components
 */
pc.script.create('playership', function (context) {

    var X = 0, Y = 1, Z = 2;
    var SPEED = 3.0;

    var MAX_LEFT = -6.0, MAX_RIGHT = 6.0,
        MAX_TOP = 9.0, MAX_BOTTOM = 2.0;

    var FORWARD_VELOCITY = 3;

    /**
     * Description
     *
     * @class PlayerShip
     * @param entity
     * @constructor
     */
    var PlayerShipComponent = function (entity) {
        this.entity = entity;
        this.thrust = pc.math.vec3.create(); //for temporary use
    };

    PlayerShipComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {

            pc.math.vec3.scale(this.entity.up, FORWARD_VELOCITY, this.thrust);
            this.entity.rigidbody.activate(); //may become inactive if not used for a while
            this.entity.rigidbody.linearVelocity = this.thrust;
        },


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {
        },

        moveUp: function (delta) {
            var pos = this.entity.getPosition();
            pos[Y] += delta * SPEED;
            pos[Y] = Math.min(MAX_TOP, pos[Y]);
            this.entity.setPosition(pos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        moveDown: function(delta) {
            this.entity.rigidbody.activate(); //may become inactive if not used for a while
            var localPos = this.entity.getPosition();
            localPos[Y] -= delta * SPEED;
            localPos[Y] = Math.max(MAX_BOTTOM, localPos[Y]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        moveLeft: function(delta) {
            var localPos = this.entity.getPosition();
            localPos[Z] -= delta * SPEED;
            localPos[Z] = Math.max(MAX_LEFT, localPos[Z]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        moveRight: function(delta) {
            var localPos = this.entity.getPosition();
            localPos[Z] += delta * SPEED;
            localPos[Z] = Math.min(MAX_RIGHT, localPos[Z]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        }
    };

    return PlayerShipComponent;
});
