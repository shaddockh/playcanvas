/* global: pc */
pc.script.create('mouseLight', function (context) {

    //Component will move the entity to follow the mouse
    var MouseHandler = function (entity) {
        this.entity = entity;
        this.pos = pc.math.vec3.create();
        this._customVar = 0;
        
        this.entity.addLabel('watchme');

        // Disabling the context menu stops the browser displaying a menu when
        // you right-click the page
        context.mouse.disableContextMenu();

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
    };

    MouseHandler.prototype = {
        getCustomVar: function() {
            return this._customVar;
        },
        setCustomVar: function(value) {
            this._customVar = value;
        },
        getPosition: function() {
            return this.pos;
        },
        onMouseMove: function (event) {
            // Get the current camera Entity
            var cameraEntity = context.systems.camera.current

            // Use the camera component's screenToWorld function to convert the
            // position of the mouse into a position in 3D space
            var depth = 10;
            cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.pos);

            // Finally update the cube's world-space position
            //console.log(this.pos);

            this.entity.setPosition(this.pos);
        }
    };

    return MouseHandler;
});
