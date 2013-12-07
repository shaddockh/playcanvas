/* global: pc */

/**
 * @module components
 */
pc.script.create('MouseCursor', function (context) {

  /**
   * Attaches an entity to the mouse position
   *
   * @class MouseCursor
   * @param entity
   * @constructor
   */
  var MouseHandler = function (entity) {
    this.entity = entity;
    this.pos = pc.math.vec3.create();

    /**
     * the distance from the camera to place this entity
     * @property offsetDepth {number}
     */
    this.offsetDepth = 10;

    // Disabling the context menu stops the browser displaying a menu when
    // you right-click the page
    context.mouse.disableContextMenu();

    // Use the on() method to attach event handlers.
    // The mouse object supports events on move, button down and
    // up, and scroll wheel.
    context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
  };

  MouseHandler.prototype = {
    onMouseMove: function (event) {
      // Get the current camera Entity
      var cameraEntity = context.systems.camera.current;

      // Use the camera component's screenToWorld function to convert the
      // position of the mouse into a position in 3D space
      cameraEntity.camera.screenToWorld(event.x, event.y, this.offsetDepth, this.pos);

      // Finally update the cube's world-space position
      this.entity.setPosition(this.pos);
    }
  };

  return MouseHandler;
});
