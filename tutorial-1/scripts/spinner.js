/* global: pc */
pc.script.create('spinner', function (context) {
    // Creates a new Spinner instance
    var Spinner = function (entity) {
        this.entity = entity;
    };

    Spinner.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            //rotate 90 degrees
            this.entity.rotate(0, 90*dt, 0);
        }
    };

   return Spinner;
});