/* global: pc */

/**
 * @module isoshooter
 * @namespace isoshooter
 */
pc.script.create('main', function (context) {

  var entityFactory = {
    name: 'entityfactory',
    url: 'common/entityfactory.js'
  };

  var scriptComponents = [{
    name: 'invisible',
    url: 'isoshooter/invisible.js'
  }, {
    name: 'laser',
    url: 'isoshooter/laser.js'
  }, {
    name: 'playership',
    url: 'isoshooter/playership.js'
  }, {
    name: 'statictarget',
    url: 'isoshooter/statictarget.js'
  }, {
    name: 'panning_camera',
    url: 'isoshooter/panning_camera.js'
  }];

  var blueprints = {
    wp_playerstart: {
      invisible: {}
    },

    player: {
      playership: {}
    },

    playerammo: {
      laser: {

      }
    },

    target: {
      statictarget: {}
    }
  };

  /**
   * Main game coordinator for the iso shooter
   *
   * @class main
   * @param entity
   * @constructor
   */
  var mainComponent = function (entity) {
    this.entity = entity;
  };

  mainComponent.prototype = {
    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      //Attach the component definitions to the entity factory config so
      //that it will load the components.
      entityFactory.config = {
        componentDefinitions: scriptComponents,
        onAfterScriptInitialized: function () {
          context.systems.blueprint.registerComponentDefinitions(scriptComponents);
          this.configureScene();
        }.bind(this)
      };

      context.systems.script.addComponent(this.entity, {
        scripts: [entityFactory]
      }, {
        test: 'test'
      });

    },

    hydrateChildren: function (children) {
      children.forEach(function (child) {
        var name = child.getName();
        if (name in blueprints) {
          console.log('found entity to hydrate: ' + name);

          context.systems.blueprint.hydrateEntity(child, blueprints[name]);
          //this.entity.scripts.send('entityfactory', 'hydrateEntity', child, blueprints[name]);
          //this.entity.script.instances['entityfactory'].instance.hydrateEntity( child, blueprints[name]);
        }
        this.hydrateChildren(child.getChildren());
      }, this);

    },

    configureScene: function () {
      this.hydrateChildren(context.root.getChildren());
    },

    /**
     * Called every frame
     * @method update
     * @param {number} delta The amount of time in seconds since last update
     */
    update: function (delta) {
      if (!this.hydrated) {
        this.hydrated = true;
        //console.log('component system registry', context.systems.list());
        //setTimeout(function() { this.configureScene(); }.bind(this));
      }

    }
  };

  return mainComponent;
});
