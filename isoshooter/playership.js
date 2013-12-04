/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('playership', function (context) {

    var X = 0, Y = 1, Z = 2;
    var SPEED = 4.0;

    var MAX_LEFT = -6.0, MAX_RIGHT = 6.0,
        MAX_TOP = 9.0, MAX_BOTTOM = 2.0;

    var FORWARD_VELOCITY = 3;

    /**
     * Player ship component
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

            this.ammoCloneSrc = context.root.findByName('playerammo');
            this.turret = this.entity.findByName('turret');
        },


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {
        },

        /**
         * Move ship up
         * @method moveUp
         * @param delta
         */
        moveUp: function (delta) {
            var pos = this.entity.getPosition();
            pos[Y] += delta * SPEED;
            pos[Y] = Math.min(MAX_TOP, pos[Y]);
            this.entity.setPosition(pos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        /**
         * Move ship down
         * @method moveDown
         * @param delta
         */
        moveDown: function(delta) {
            this.entity.rigidbody.activate(); //may become inactive if not used for a while
            var localPos = this.entity.getPosition();
            localPos[Y] -= delta * SPEED;
            localPos[Y] = Math.max(MAX_BOTTOM, localPos[Y]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        /**
         * Move ship left
         * @method moveLeft
         * @param delta
         */
        moveLeft: function(delta) {
            var localPos = this.entity.getPosition();
            localPos[Z] -= delta * SPEED;
            localPos[Z] = Math.max(MAX_LEFT, localPos[Z]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },
        /**
         * Move ship right
         * @method moveRight
         * @param delta
         */
        moveRight: function(delta) {
            var localPos = this.entity.getPosition();
            localPos[Z] += delta * SPEED;
            localPos[Z] = Math.min(MAX_RIGHT, localPos[Z]);
            this.entity.setPosition(localPos);
            this.entity.rigidbody.syncEntityToBody(); //used when running dynamic.  Rigid body needs to sync up with any entity changes
        },

        /**
         * Clone the ammo and execute the callback when the ammo has been cloned
         * (for some reason, the scripts don't initialize until the end of the eventLoop)
         * @method cloneAmmo
         * @param callback
         * @async
         */
        cloneAmmo: function(callback) {
            var clone = this.ammoCloneSrc.clone();
            clone.setName('ammoclone');
            requestAnimationFrame(function() { callback(clone); });
        },

        /**
         * Fire laser
         * @method fire
         * @param delta
         */
        fire: function(delta) {
           var self = this;
           this.cloneAmmo(function(ammo) {
               var pos = self.turret.getPosition();
               context.root.addChild(ammo);
               ammo.setPosition(pos);
               ammo.setRotation(self.entity.getRotation());
               ammo.rigidbody.syncEntityToBody();
               ammo.script.send('laser','fire');
           })
        }

    };

    return PlayerShipComponent;
});
