/* global: pc */

/**
 * @module lander_ex
 * @namespace lander_ex
 */
pc.script.create('LanderCamera', function (context) {

  /**
   * Description
   *
   * @class LanderCamera
   * @param entity
   * @constructor
   */
  var LanderCameraComponent = function (entity) {
    this.entity = entity;
  };

  LanderCameraComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      this.player = context.root.findByName('player');
    },

    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {
      this.entity.lookAt(this.player.getPosition());

    }

  };

  return LanderCameraComponent;
});
