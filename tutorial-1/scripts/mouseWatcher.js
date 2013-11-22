/* global: pc */
pc.script.create('mouseWatcher', function (context) {


    var MouseHandler = function (entity) {
        this.entity = entity;
        this.pos = pc.math.vec3.create();

        this.targetPosition = pc.math.vec3.create();


        //this.entity.primitive.material = new pc.scene.BasicMaterial();
        //this.entity.primitive.material.color.set(43,43,43,100);

        // Disabling the context menu stops the browser displaying a menu when
        // you right-click the page
        context.mouse.disableContextMenu();

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
        context.mouse.on(pc.input.EVENT_MOUSEDOWN, this.onMouseDown, this);
    };

    MouseHandler.prototype = {
        onMouseMove: function (event) {
            // Get the current camera Entity
            var cameraEntity = context.systems.camera.current

            // Use the camera component's screenToWorld function to convert the
            // position of the mouse into a position in 3D space
            var depth = 10;
            cameraEntity.camera.screenToWorld(event.x, event.y, depth, this.targetPosition);

            // Finally update the cube's world-space position
            //console.log(this.pos);

            this.entity.lookAt(this.targetPosition,  pc.math.vec3.create(0, -1, 0));
        },

        xxonMouseDown: function (event) {
            // If the left mouse button is pressed, change the cube color to red
            if (event.button === pc.input.MOUSEBUTTON_LEFT) {
                this.entity.primitive.color = new pc.Color(1,0,0);
            }

            // If the left mouse button is pressed, change the cube color to green
            if (event.button === pc.input.MOUSEBUTTON_MIDDLE) {
                this.entity.primitive.color = new pc.Color(0,1,0);
            }

            // If the left mouse button is pressed, change the cube color to blue
            if (event.button === pc.input.MOUSEBUTTON_RIGHT) {
                this.entity.primitive.color  = new pc.Color(0,0,1);
            }
        }
    };


    return MouseHandler;


});
