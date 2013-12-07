/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('statictarget', function (context) {

  /**
   * Description
   *
   * @class statictarget
   * @param entity
   * @constructor
   */
  var statictargetComponent = function (entity) {
    this.entity = entity;
  };

  statictargetComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      this.entity.collision.on('contact', this.onContact, this);
    },

    /**
     * @method onContact
     */
    onContact: function (result) {
      console.log('hit by', result);
      this.entity.destroy();
    },

    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {

    }
  };

  return statictargetComponent;
});
