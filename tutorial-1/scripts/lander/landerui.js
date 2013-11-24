/* global: pc */

/**
 * @module components
 */
pc.script.create('LanderUI', function (context) {


    function buildDiv(styles) {

        var div = document.createElement('div');
        for (var style in styles) {
            div.style[style] = styles[style];
        }
        return div;
    }
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

            var container = document.getElementById('application-container');

            // Create a div centered inside the main canvas
            var div = buildDiv({
               position: 'absolute',
               width: '500px',
               top: '50%',
               left: '50%',
               marginLeft: '-250px',
               textAlign: 'center',
               color: 'white',
               fontSize: 'xx-large',
               visibility: 'hidden'
            });

            // Grab the div that encloses PlayCanvas' canvas element
            container.appendChild(div);
            this.div = div;

            var subDiv = buildDiv({
                position: 'absolute',
                width: '500px',
                top: '60%',
                left: '50%',
                marginLeft: '-250px',
                textAlign: 'center',
                color: 'white',
                fontSize: 'x-large',
                visibility: 'hidden'
                }
            );

            container.appendChild(subDiv);
            this.subtextDiv = subDiv;


            // Set some default state on the UI element
            this.setText('GAME OVER');
            this.setSubText('');
            this.setVisibility(false);
        },

        // Some utility functions that can be called from other game scripts
        setVisibility: function (visible) {
            this.div.style.visibility = visible ? 'visible' : 'hidden';
            this.subtextDiv.style.visibility = visible ? 'visible' : 'hidden';

            if (!visible) {
                this.setText('');
                this.setSubText('');
            }

        },

        setText: function (message) {
            this.div.innerHTML = message;
        },

        setSubText: function(message) {
            this.subtextDiv.innerHTML = message;
        },

        showGameOver: function() {
            this.setText('GAME OVER');
            this.setVisibility(true);

            setTimeout(function(){
                this.setSubText('Press "R" to play again.');
            }.bind(this), 2000);
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
