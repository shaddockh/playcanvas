/* global: pc */

/**
 * @module components-pong
 */
pc.script.create('player', function (context) {

  /**
   * Description
   *
   * @class Player
   * @param entity
   * @constructor
   */
  var PlayerComponent = function (entity) {
    this.entity = entity;
  };

  PlayerComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {

    },

    // Called every frame, dt is time in seconds since last update
    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (dt) {
      var isPlayer1 = this.entity.getName() === 'player1';
      var upKey = isPlayer1 ? pc.input.KEY_A : pc.input.KEY_UP;
      var downKey = isPlayer1 ? pc.input.KEY_Z : pc.input.KEY_DOWN;

      if (context.keyboard.isPressed(upKey)) {
        this.entity.translate(0, 0.1, 0);
      }
      if (context.keyboard.isPressed(downKey)) {
        this.entity.translate(0, -0.1, 0);
      }

    }
  };

  return PlayerComponent;
});
