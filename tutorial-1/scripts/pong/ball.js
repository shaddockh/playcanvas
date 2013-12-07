/* global: pc */

/**
 * @module components-pong
 */
pc.script.create('Ball', function (context) {

  /**
   * Description
   *
   * @class Ball
   * @param entity
   * @constructor
   */
  var BallComponent = function (entity) {
    this.entity = entity;
  };

  BallComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      this.entity.rigidbody.setLinearFactor(1, 1, 0); //limit to only move along x or y
      this.entity.rigidbody.setAngularFactor(0, 0, 1); //only rotate along z

      this.velocity = pc.math.vec3.create(); //temporary vector to use later

      /**
       * Speed of the ball in units per second
       * @property {number} speed
       */
      this.speed = 7.0;

      this.reset();

    },

    /**
     * reset the ball to the center of the screen
     * @method reset
     */
    reset: function () {
      this.entity.setPosition(0, 0, 0);

      var r = Math.random();
      pc.math.vec3.set(this.velocity, r < 0.5 ? -1 : 1, r - 0.5, 0);
      pc.math.vec3.normalize(this.velocity, this.velocity);
      pc.math.vec3.scale(this.velocity, this.speed, this.velocity);

      this.entity.rigidbody.setLinearVelocity(this.velocity[0], this.velocity[1], this.velocity[2]);

    },

    // Called every frame, dt is time in seconds since last update
    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {
      var currentVelocity = this.entity.rigidbody.getLinearVelocity();

      pc.math.vec3.normalize(currentVelocity, currentVelocity);
      pc.math.vec3.scale(currentVelocity, this.speed, currentVelocity);

      pc.math.vec3.lerp(currentVelocity, this.velocity, 0.1, this.velocity);
      this.entity.rigidbody.setLinearVelocity(this.velocity[0], this.velocity[1], this.velocity[2]);

    }
  };

  return BallComponent;
});
