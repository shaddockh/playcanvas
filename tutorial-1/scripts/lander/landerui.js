/* global: pc */

/**
 * @module components
 */
pc.script.create('LanderUI', function (context) {

    /**
     * Description
     *
     * @class LanderUI
     * @param entity
     * @constructor
     */
    var LanderUIComponent = function (entity) {
        this.entity = entity;
    };

    LanderUIComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {

// Create a div centred inside the main canvas
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.width = '500px';
            div.style.top = '50%';
            div.style.left = '50%';
            div.style.marginLeft = '-250px';
            div.style.textAlign = 'center';
            div.style.color = 'white';
            div.style.fontSize = 'xx-large';
            div.style.visibility = 'hidden';

            // Grab the div that encloses PlayCanvas' canvas element
            var container = document.getElementById('application-container');
            container.appendChild(div);

            this.div = div;

            // Set some default state on the UI element
            this.setText('GAME OVER');
            this.setVisibility(false);
        },

        // Some utility functions that can be called from other game scripts
        setVisibility: function (visible) {
            this.div.style.visibility = visible ? 'visible' : 'hidden';
        },

        setText: function (message) {
            this.div.innerHTML = message;
        },

        showGameOver: function() {
            this.setText('GAME OVER');
            this.setVisibility(true);
        },



        /**
         * Called every frame
         * @method update
         * @param {number} delta The amount of time in seconds since last update
         */
        update: function (delta) {

        }
    };

    return LanderUIComponent;
});
