/* global: pc */

/**
 * @module lander_ex
 * @namespace lander_ex
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
            this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
        },

        /**
         * player has been lost in the void.  call the playerDied method
         * @param player
         */
        onTriggerEnter: function(player) {
            player.script.send('LanderPlayer', 'playerDied');
        }
    };

    return LanderVoidTriggerComponent;
});
