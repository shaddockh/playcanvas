/* global: pc */

/**
 * @module components
 */
pc.script.create('TestSpawner', function (context) {



    var entities = {

           box: {
               primitive: {
                    type: 'Box',
                    color: [1,0,0]
               },
               scripts: [
                   {
                       name: 'Dynascript1',
                       url: 'tutorial-1/scripts/dynamic/dynascript1.js',
                       config: {
                           message: 'hello world'
                       }

                   },
               ],

               position: {
                   localPosition: [1.0, 1.0, 1.0]
               },

           },
        box2: {
            primitive: {
                type: 'Box',
                color: [1,0,0]
            },
            scripts: [
                {
                    name: 'Dynascript1',
                    url: 'tutorial-1/scripts/dynamic/dynascript1.js',
                    config: {
                        message: 'hello world from #2'
                    }

                },
            ],

            position: {
                localPosition: [1.0, 1.0, 1.0]
            },

        }

        };


    function attachComponent(entity, componentName, attributes) {
       switch (componentName) {
           case 'scripts':
               context.systems.script.addComponent(entity,{

                 scripts: attributes
               });
               break;
           case 'primitive':
               context.systems.primitive.addComponent(entity, attributes);
               break;
           case 'position':
               entity.setLocalPosition(attributes.localPosition);
               break;

           default:
               console.log('sending create message to ' + componentName);
               entity.script.send(componentName, 'create', attributes);
               break;
       }
    }

    function buildEntity(name, entityDef) {
        console.log('building entity: ' + name);
       var entity = new pc.fw.Entity;
       for (var componentName in entityDef) {
           attachComponent(entity, componentName, entityDef[componentName]);
       }
    }

    /**
     * Will spawn entities based upon a JSON configuration
     *
     * @class TestSpawner
     * @param entity
     * @constructor
     */
    var TestSpawnerComponent = function (entity) {
        this.entity = entity;
    };

    TestSpawnerComponent.prototype = {
        /**
         * Called once after all resources are loaded and before the first update
         * @method initialize
         */
        initialize: function () {
            for (var ent in entities) {
                buildEntity(ent, entities[ent]);
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

    return TestSpawnerComponent;
});
