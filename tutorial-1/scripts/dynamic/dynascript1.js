/* global: pc */

/**
 * @module components-dynamic
 */
pc.script.create('Dynascript1', function (context) {


    function getScriptConfig(entity,name) {
    }
    /**
     * simple script that will be dynamically added in
     *
     * @class Dynascript1
     * @param entity
     * @constructor
     */
    var Dynascript1Component = function (entity) {
        this.entity = entity;
        this.name = 'Dynascript1';
    };

    Dynascript1Component.prototype = {

        getConfig: function() {
            var scripts = this.entity.script.data.scripts;
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].name == this.name) {
                    return scripts[i].config;
                }
            }
        },

        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {
            console.log(this.getConfig());
        },

        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

        }
    };

    return Dynascript1Component;
});
