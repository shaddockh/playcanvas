/* global: pc */

/**
 * @module components
 */
pc.script.create('playership', function (context) {

    var X = 0, Y = 1, Z = 2;
    var SPEED = 2.0;

    var MAX_LEFT = -6.0, MAX_RIGHT = 6.0,
        MAX_TOP = 9.0, MAX_BOTTOM = 2.0;

    /**
     * Description
     *
     * @class PlayerShip
     * @param entity
     * @constructor
     */
    var PlayerShipComponent = function (entity) {
        this.entity = entity;
    };

    PlayerShipComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {

        },


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

        },

        moveUp: function (delta) {
            var localPos = this.entity.getLocalPosition();
            localPos[Y] += delta * SPEED;
            localPos[Y] = Math.min(MAX_TOP, localPos[Y]);
            this.entity.setLocalPosition(localPos);
        },
        moveDown: function(delta) {
            var localPos = this.entity.getLocalPosition();
            localPos[Y] -= delta * SPEED;
            localPos[Y] = Math.max(MAX_BOTTOM, localPos[Y]);
            this.entity.setLocalPosition(localPos);
        },
        moveLeft: function(delta) {
            var localPos = this.entity.getLocalPosition();
            localPos[Z] -= delta * SPEED;
            localPos[Z] = Math.max(MAX_LEFT, localPos[Z]);
            this.entity.setLocalPosition(localPos);
        },
        moveRight: function(delta) {
            var localPos = this.entity.getLocalPosition();
            localPos[Z] += delta * SPEED;
            localPos[Z] = Math.min(MAX_RIGHT, localPos[Z]);
            this.entity.setLocalPosition(localPos);
        }
    };

    return PlayerShipComponent;
});
