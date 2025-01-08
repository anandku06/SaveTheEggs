## Some JS concepts learned here

- JS classes are hoisted, but they are not initialised until that particular line is read
- Objects in JS are so called reference datatypes i.e. refers to the space where the main class is stored.
- sometimes the reference of 'this' keyword in regular functions may lost due to nested callbacks, to overcome this use Arrow functions
- ES6 arrow functions is that they automatically inherit the reference to 'this' keyword from the parent scope.

# canvas HTMLElement

- used to draw graphics, animations, and render game scenes directly on a webpage using JS.
- essentially a container for graphics that you can draw using scripting

  ## How to use it

  - Get the context via JS
    ```Javascript
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d'); // 2d param for 2d graphics rendering
    ```
    ### getContext() method in JS
    - used with <canvas> element to obtain a drawing context, which is an object that provides methods and properties for rendering graphics on the canvas.
    - Syntax:
      ```Javascript
      canvas.getContext(contextType, [contextAttribute]);
      ```
      - contextType : A string specifying the type of context.
        - '2d' : for 2D graphics
        - 'webgl' : for 3D graphics
        - 'webgl2' : for WebGL2.0
    - .fill() method -> used to fill color in the drawn shape ; default value is black ; can be changed by setting the fillStyle property value to the favoured color
    - .stroke method -> used to make a outline of the drawn shape ; default is 1px black outline ; can be changed by setting the .lineWidth property and .strokeStyle property values to the user accordance
  - globalAlpha property to set the opacity of the shapes drawn

- to limit certain canvas settings only to specific draw calls, we can wrap that drawing code between save() and restore() built-in canvas methods.

### requestAnimationFrame() method -> which sits on the window object of the browser but can be called directly. Pass the animation you want to create an endless animation

### Using Circle Packing Algorithm -> maximum number of circles that can fit inside an area without two of them overlapping : to avoid the overlapping of the obstacles
  - first calculate the distance between two circles' center point
  - then compare the distance with the sum of the two circle's radii ; if the distance is less than the sum, then they overlap, else not overlapping