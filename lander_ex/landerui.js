/* global: pc */

/**
 * @module lander_ex
 * @namespace lander_ex
 */
pc.script.create('LanderUI', function (context) {

  //custom styles to be used by the ui elements
  var style = {

    '#application-container div': {},
    '.fullscreen-overlay': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0
    },
    '.center': {
      width: '100%',
      position: 'relative',
      'text-align': 'center'
    },
    '.title': {
      top: '5%',
      color: 'white',
      'font-size': 'xx-large'
    },
    '.instructions': {
      color: 'lime',
      'font-size': 'large',
      top: '20%'
    },
    '.instructions ul': {
      'list-style-type': 'none',
      'padding-left': 0
    },
    '.subtitle': {
      top: '35%',
      'color': 'gray',
      'font-size': 'x-large'
    },
    '.speed': {
      position: 'absolute',
      'margin-right': '10%',
      color: 'white',
      bottom: 0,
      'text-align': 'left',
      width: '100%'
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
      var curStyle = styles[style];
      block.push(style + ' {');
      for (var attribute in curStyle) {
        block.push('\t' + attribute + ': ' + curStyle[attribute] + ';');
      }
      block.push('}');
    }

    styleBlock.innerHTML = block.join('\n');
    document.getElementsByTagName('head')[0].appendChild(styleBlock);
  })(style);

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

      this.container = document.getElementById('application-container');
      // Grab the div that encloses PlayCanvas' canvas element

      var div = buildDiv({
        className: 'gameover'
      });
      this.container.appendChild(div);
      this.div = div;

      var subDiv = buildDiv({
        className: 'subtext'
      });
      this.container.appendChild(subDiv);
      this.subtextDiv = subDiv;

      // Set some default state on the UI element
      this.setText('GAME OVER');
      this.setSubText('');
      this.setVisibility(false);
    },

    // Some utility functions that can be called from other game scripts
    /**
     * set whether this is visible
     * TODO: need to refactor to different ui
     * @method setVisibility
     * @param {boolean} visible
     */
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

    setSubText: function (message) {
      this.subtextDiv.innerHTML = message;
    },

    /**
     * Show the game over screen
     * @method showGameOver
     */
    showGameOver: function () {
      this.setText('GAME OVER');
      this.setVisibility(true);
      this.subtextDiv.style.visibility = 'hidden';

      setTimeout(function () {
        this.subtextDiv.style.visibility = 'visible';
        this.setSubText('Press "R" to play again.');
      }.bind(this), 2000);
    },

    /**
     * Show the player win screen
     * @method showPlayerWin
     */
    showPlayerWin: function () {
      this.setText('YOU LANDED SAFELY!!');
      this.setVisibility(true);
      this.subtextDiv.style.visibility = 'hidden';

      setTimeout(function () {
        this.subtextDiv.style.visibility = 'visible';
        this.setSubText('Press "R" to play again.');
      }.bind(this), 2000);
    },

    /**
     * Hide the main menu
     * @method hideMainMenu
     */
    hideMainMenu: function () {
      document.getElementById('main-menu').remove();
    },

    /**
     * Show the main menu
     * @method showMainMenu
     */
    showMainMenu: function () {
      var template = [
        '<div class="title center">Lander Game</div>',
        '<div class="instructions center">',
        '   <ul>',
        '       <li>Thrust - [Space]</li>',
        '       <li>Turn Left - Left, H, or A</li>',
        '       <li>Turn Right - Right, L, or D</li>',
        '   </ul>',
        '</div>',
        '<div class="subtitle center">Press [space] key to begin.</div>'
      ].join('\n');

      var screen = buildDiv({
        className: 'fullscreen-overlay',
        id: 'main-menu'
      });
      screen.innerHTML = template;

      var container = document.getElementById('application-container');
      container.appendChild(screen);
    },

    /**
     * Show and update the speed ui
     * @method showSpeed
     * @param {number} speed
     */
    showSpeed: function (speed) {

      if (!this.speedDiv) {
        var speedDiv = buildDiv({
          className: 'speed',
          id: 'divSpeed'
        });
        this.container.appendChild(speedDiv);
        this.speedDiv = speedDiv;
      }
      this.speedDiv.innerHTML = 'Speed: ' + Math.round(speed * 100);
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
