/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('laser', function (context) {

    /**
     * Description
     *
     * @class laser
     * @param entity
     * @constructor
     */
    var laserComponent = function (entity) {
        this.entity = entity;
    };

    laserComponent.prototype = {

        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {
            this.ammoSpeed = 50;
            this.thrust = pc.math.vec3.create();

        },


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

        },


        onContact: function(result) {
            //TODO: need to determine what/who we hit. Maybe on the collision event of the object hit
            this.entity.destroy();
        },

        /**
         * Fire Laser
         * @method fire
         */
        fire: function() {
            this.entity.rigidbody.activate();
            pc.math.vec3.scale(this.entity.up, this.ammoSpeed, this.thrust);
            this.entity.rigidbody.linearVelocity = this.thrust;
            this.entity.collision.on('contact', this.onContact, this);
        }


    };

    return laserComponent;
});
