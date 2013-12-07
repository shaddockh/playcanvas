/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('PanningCamera', function (context) {

  /**
   * Will pan the camera following the player entity
   *
   * @class PanningCamera
   * @param entity
   * @constructor
   */
  var PanningCameraComponent = function (entity) {
    this.entity = entity;
  };

  PanningCameraComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      this.player = context.root.findByName('player');
      this.playerStartPos = this.player.getPosition();
      this.bindKeys();
    },

    bindKeys: function () {

      context.controller = new pc.input.Controller(document);
      context.controller.registerKeys('up', [pc.input.KEY_A, pc.input.KEY_UP, pc.input.KEY_K]);
      context.controller.registerKeys('down', [pc.input.KEY_Z, pc.input.KEY_DOWN, pc.input.KEY_J]);
      context.controller.registerKeys('left', [pc.input.KEY_LEFT, pc.input.KEY_A, pc.input.KEY_Q, pc.input.KEY_H]);
      context.controller.registerKeys('right', [pc.input.KEY_RIGHT, pc.input.KEY_D, pc.input.KEY_L]);
      context.controller.registerKeys('reset', [pc.input.KEY_R]);
      context.controller.registerKeys('fire', [pc.input.KEY_SPACE]);

      context.controller.registerKeys('startGame', [pc.input.KEY_SPACE]);
    },

    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {

      var playerPos = this.player.getPosition();
      var pos = this.entity.getPosition();
      pos[0] = playerPos[0];
      this.entity.setPosition(pos);

      if (context.controller.isPressed('up')) {
        this.player.script.send('playership', 'moveUp', delta);
      }
      if (context.controller.isPressed('down')) {
        this.player.script.send('playership', 'moveDown', delta);
      }
      if (context.controller.isPressed('left')) {
        this.player.script.send('playership', 'moveLeft', delta);
      }
      if (context.controller.isPressed('right')) {
        this.player.script.send('playership', 'moveRight', delta);
      }
      if (context.controller.wasPressed('fire')) {
        this.player.script.send('playership', 'fire', delta);
      }

      //if (context.controller.wasPressed('reset')) {
      //nothing yet
      //}
    }
  };

  return PanningCameraComponent;
});
