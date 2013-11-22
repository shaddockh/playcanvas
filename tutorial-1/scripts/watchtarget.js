/**
 * @module components
 */
pc.script.create('WatchTarget', function (context) {

     /**
     * The ''WatchTarget'' component will cause the entity it is attached to
     * continually point towards a specified target.  The target used must have
     * the label specified.
     *
     * @class WatchTarget
     * @constructor
     * @extends script
     */
    var WatchTargetComponent = function (entity) {
        /**
         * the entity this is attached to
         * @property entity
         * @type object
         */
        this.entity = entity;

        /**
         * Look in the scene for an object with this name and use that
         * as the target to look at
         * @property {string} watchTarget
         * @default watchme
         */
        this._watchTarget = 'watchme';


        /**
         * Max random # of milliseconds to wait before turning towards the target.
         * @property {integer} randomDelay
         * @default 0
         */
        this._randomDelay = 0;

        this._watched = null;
        this._isWaiting = false;
    };

    WatchTargetComponent.prototype = {

        /**
         * searches the scene and grabs a reference to the target that is being watched.
         * @method getWatched
         * @return {entity} The first entity found with the label or null
         */
        getWatched: function() {
            if (!(this._watched)) {
                var target = context.root.findByName(this._watchTarget);
               this._watched = target;
                //?? Can I get an array of the same name??
                //if (target && target.length > 0) {
                 //   this._watched = target[0];
                //}
            }
            return this._watched;
        },

        /**
         * updates the entity
         * @method update
         * @param {integer} delta The amount of time since the last update was called
         */
        update: function(delta) {
            //find the target and then point at it.
            if (!this._isWaiting) {            
                var component = this;
                var target = component.getWatched();
                if (target) {
                    component._isWaiting = true;
                    setTimeout(function() {
                        component.entity.lookAt(target.localPosition);
                        component._isWaiting = false;
                    }, Math.random() * component._randomDelay);
                }
            }
        }
        
    };

    return WatchTargetComponent;
});
