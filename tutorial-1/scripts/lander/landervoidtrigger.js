/* global: pc */

/**
 * @module components
 */
pc.script.create('LanderVoidTrigger', function (context) {

    /**
     * Description
     *
     * @class LanderVoidTrigger
     * @param entity
     * @constructor
     */
    var LanderVoidTriggerComponent = function (entity) {
        this.entity = entity;
    };

    LanderVoidTriggerComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {
            //why should we have to intercept collisionstart in order for the triggerenter event to fire?
            this.entity.collision.on('collisionstart', function() { }, this);
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },

        onTriggerEnter: function(other) {
            if (other.name === 'player') {
                other.script.send('LanderPlayer', 'reset');
            }
        } ,


        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

        }
    };

    return LanderVoidTriggerComponent;
});
