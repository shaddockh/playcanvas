pc.script.create('mouseWatcher', function (context) {

    
    //Component will watch the mouse and turn the entity to look at the mouse
    var WatchTarget = function (entity) {
        this.entity = entity;
        this._watchTarget = 'watchme';
        this._watched = null;
        this._randomDelay = 300;
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
            var target = this.getWatched();
            var entity = this.entity;
            if (target) {
                setTimeout(function() {
                    entity.lookAt(target.localPosition);
                }, Math.random(this._randomDelay));
            }
        }
        
    };

    return WatchTarget;
});
