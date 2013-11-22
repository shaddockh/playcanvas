pc.script.create('mouseWatcher', function (context) {

    
    //Component will watch the mouse and turn the entity to look at the mouse
    var WatchTarget = function (entity) {
        this.entity = entity;
        this._watchTarget = 'watchme';
        this._wathced = null;
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
            //find the mouseLight and then point at it.
            var target = this.getWatched();
            if (target) {
                this.entity.lookAt(target.localPosition);
            }
        }
    };

    return WatchTarget;
});
