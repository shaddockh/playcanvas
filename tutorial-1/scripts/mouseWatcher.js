pc.script.create('mouseWatcher', function (context) {

    //Component will watch the mouse and turn the entity to look at the mouse
    var MouseHandler = function (entity) {
        this.entity = entity;
        this._watchTarget = 'watchme';
        this.targetPosition = pc.math.vec3.create();


        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
    };

    MouseHandler.prototype = {
        onMouseMove: function (event) {
            
            //find the mouseLight and then point at it.
            var target = null;
            var target = context.root.findByLabel(this._watchTarget);
            //console.log(target);
            if (target && target.length > 0) {
                this.entity.lookAt(target[0].localPosition);
            }
            
            // Get the current camera Entity
            //var cameraEntity = context.systems.camera.current

            // Use the camera component's screenToWorld function to convert the
            // position of the mouse into a position in 3D space
            //var depth = 10;
            //cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.targetPosition);

            //TODO: move the tracking of the mouse in world space to a single entity at the root
            //this.entity.lookAt(this.targetPosition,  pc.math.vec3.create(0, -1, 0));
        }
    };

    return MouseHandler;
});
