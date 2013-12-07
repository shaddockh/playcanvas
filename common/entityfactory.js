/* global: pc */

/**
 * @module common
 * @namespace common
 */
pc.script.create('entityfactory', function (context) {

  /**
   * will create entities
   *
   * @class entityfactory
   * @param entity
   * @constructor
   */
  var entityfactoryComponent = function (entity) {
    this.entity = entity;
  };

  //Attach this to the script system for now -- really need to create a different system to make this global
  //TODO: Add this to a global helper class
  context.systems.script.getScriptConfig = function (entity, scriptname) {
    var config;
    entity.script.data.scripts.forEach(function (el) {
      if (el.name === scriptname) {
        config = el.config;
      }
    });
    return config || {};
  };

  entityfactoryComponent.prototype = {

    /**
     * Called once after all resources are loaded and before the first update
     * @method initialize
     */
    initialize: function () {
      console.log('entity arge2', arguments);
      pc.extend(this, pc.events);

      console.log('initialize: entityFactoryComponent');
      this.componentList = {};

      var config = context.systems.script.getScriptConfig(this.entity, 'entityfactory');
      if (config) {
        if (config.onAfterScriptInitialized) {
          config.onAfterScriptInitialized();
        }
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

  var BlueprintComponentSystem = function BlueprintComponentSystem(context) {
    this.id = "blueprint";
    this.description = "Instantiates entities based upon a passed in blueprint and automatically adds components, updates properties, etc.";
    context.systems.add(this.id, this);

    this.componentList = {};
    //this.ComponentType = pc.fw.PrimitiveComponent;
    //this.DataType = pc.fw.PrimitiveComponentData;
    //this.schema = [{name:"type", displayName:"Type", description:"Type of primitive", type:"enumeration", options:{enumerations:[{name:"Box", value:pc.shape.Type.BOX}, {name:"Capsule", value:pc.shape.Type.CAPSULE}, {name:"Sphere", value:pc.shape.Type.SPHERE}, {name:"Cylinder", value:pc.shape.Type.CYLINDER}, {name:"Cone", value:pc.shape.Type.CONE}]}, defaultValue:"Box"}, {name:"color", displayName:"Color", description:"Material color", type:"rgb", defaultValue:[1, 1, 1]}, {name:"castShadows", displayName:"Cast shadows",
    //    description:"Occlude light from shadow casting lights", type:"boolean", defaultValue:false}, {name:"receiveShadows", displayName:"Receive shadows", description:"Receive shadows cast from occluders", type:"boolean", defaultValue:true}, {name:"material", exposed:false}, {name:"model", exposed:false}];
    //this.exposeProperties();
    //var gd = context.graphicsDevice;
    //this.box = pc.scene.procedural.createBox(gd, {halfExtents:[0.5, 0.5, 0.5]});
    //this.capsule = pc.scene.procedural.createCapsule(gd, {radius:0.5, height:2});
    //this.sphere = pc.scene.procedural.createSphere(gd, {radius:0.5});
    //this.cone = pc.scene.procedural.createCone(gd, {baseRadius:0.5, peakRadius:0, height:1});
    //this.cylinder = pc.scene.procedural.createCylinder(gd, {radius:0.5, height:1});
    //this.on("remove", this.onRemove, this)
  };
  BlueprintComponentSystem = pc.inherits(BlueprintComponentSystem, pc.fw.ComponentSystem);
  pc.extend(BlueprintComponentSystem.prototype, {
    initializeComponentData: function (component, data, properties) {
      data.material = new pc.scene.PhongMaterial();
      if (data.color) {
        data.color = new pc.Color(data.color);
      }
      properties = ["material", "castShadows", "color", "receiveShadows", "type"];
      BlueprintComponentSystem._super.initializeComponentData.call(this, component, data, properties);
    },
    onRemove: function (entity, data) {
      if (data.model) {
        this.context.scene.removeModel(data.model);
        entity.removeChild(data.model.getGraph());
        data.model = null;
      }
    },

    /**
     * Attaches a component to the entity and then calls __configure__ on the component.
     *
     *
     * @method attachComponent
     * @param entity
     * @param componentName
     * @param componentDef
     */
    attachComponent: function (entity, componentName, componentDef) {
      if (componentName in this.componentList) {
        var def = this.componentList[componentName];
        //todo: need to merge component def in with any congfig object that might already be defined (ie: a global config setting)
        def.config = componentDef;

        context.systems.script.addComponent(entity, {
          scripts: [def]
        });
      } else {
        throw new Error('Script component is not defined: ' + componentName);
      }
    },
    /**
     * load up component definitions so they can be used to build entities out of blueprints
     * @method registerComponentDefinitions
     * @param { component definition | array } defs
     */
    registerComponentDefinitions: function (defs) {
      defs = defs || [];
      if (!defs.length) {
        defs = [defs];
      }
      defs.forEach(function (def) {
        console.log('Loading component: ' + def.name);
        this.componentList[def.name] = def;
      }, this);
    },

    /**
     * add the components in the blueprint to the entity
     * @method hydrateEntity
     * @param entity
     * @param blueprint
     */
    hydrateEntity: function (entity, blueprint) {

      console.log('Hydrating entity: ' + blueprint);
      for (var componentName in blueprint) {
        this.attachComponent(entity, componentName, blueprint[componentName]);
      }
    }

  });

  //hook it in
  var blueprintSystem = new BlueprintComponentSystem(context);

  return entityfactoryComponent;
});
