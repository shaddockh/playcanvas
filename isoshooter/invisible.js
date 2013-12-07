/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('invisible', function (context) {

  /**
   * Makes the entity invisible at runtime.  useful for waypoints, etc.
   *
   * basically scales it down to 0,0,0
   *
   * @class invisible
   * @param entity
   * @constructor
   */
  var invisibleComponent = function (entity) {
    this.entity = entity;
  };

  invisibleComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      this.origSize = this.entity.getLocalScale();
      //            var shaderDefinition = {
      //                attributes: {
      //                    aPosition: pc.gfx.SEMANTIC_POSITION
      //                },
      //                vshader: [
      //                    "attribute vec3 aPosition;",
      //                    "",
      //                    "void main(void)",
      //                    "{",
      //                    "    gl_Position = vec4(aPosition, 1.0);",
      //                    "}"
      //                ].join("\n"),
      //                fshader: [
      //                    "precision mediump float;",
      //                    "",
      //                    "void main(void)",
      //                    "{",
      //                    "    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
      //                    "}"
      //                ].join("\n")
      //            };
      //
      //            shader = new pc.gfx.Shader(context.graphicsDevice, shaderDefinition);
      //            this.entity.primitive.material.setShader(shader);
      //            this.entity.primitive.color = new pc.Color(0,0,0.0,0);
      this.setVisible(false);
    },

    setVisible: function (visible) {
      if (visible) {
        this.entity.setLocalScale(this.origSize);
      } else {
        this.entity.setLocalScale(0, 0, 0);
      }
    },

    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {

    }
  };

  return invisibleComponent;
});
