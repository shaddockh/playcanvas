/* global: pc */

/**
 * @module components
 */
pc.script.create('LanderUI', function (context) {


    //custom styles to be used by the ui elements
    var style = {

        '#application-container div': {
        },
        '.gameover,.subtext': {
            position: 'absolute',
            width: '100%',
            'margin-left': '-50%',
            left: '50%',
            'text-align': 'center',
            color: 'white',
            visibility: 'hidden'
        },
        '.gameover': {
            top: '50%',
            'font-size': 'xx-large'
        },
        '.subtext': {
            top: '60%',
            'font-size': 'x-large'
        }



    };


    //generate our css and attach it to the page (only once!!)
    (function addStyleBlock(styles) {
        var styleBlock = document.createElement('style');
        styleBlock.setAttribute('type', 'text/css');

        var block = [];
        for (var style in styles) {
            var curStyle = styles[style]
            block.push(style + ' {');
            for (var attribute in curStyle) {
                block.push('\t' + attribute + ': ' + curStyle[attribute]  + ';');
            }
            block.push('}');
            block.push();
        }

        styleBlock.innerHTML = block.join('\n');
        document.getElementsByTagName('head')[0].appendChild(styleBlock);
    })(style);


    /**
     * utility function to build a div with specific attributes
     * @param attributes
     * @returns {HTMLElement}
     */
    function buildDiv(attributes) {
        attributes = attributes || {};
        var div = document.createElement('div');
        for (var attr in attributes) {
           div[attr] = attributes[attr];
        }
        return div;
    }

    /**
     * Handles the UI for the game
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


            // Grab the div that encloses PlayCanvas' canvas element
            var container = document.getElementById('application-container');

            var div = buildDiv({className: 'gameover'});
            container.appendChild(div);
            this.div = div;

            var subDiv = buildDiv({className: 'subtext'});
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
