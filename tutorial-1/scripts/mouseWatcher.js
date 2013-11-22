pc.script.create('mouseWatcher', function (context) {

    
    //Component will watch the mouse and turn the entity to look at the mouse
    var WatchTarget = function (entity) {
        this.entity = entity;
        this._watchTarget = 'watchme';
        this._watched = null;
        this._randomDelay = 400;
        this._isWaiting = false;
    };

    WatchTarget.prototype = {
        
        getWatched: function() {
            if (!(this._watched)) {
                var target = context.root.findByLabel(this._watchTarget);
                if (target && target.length > 0) {
                    this._watched = target[0];
                }
            }
            return this._watched;
        },
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

    return WatchTarget;
});
