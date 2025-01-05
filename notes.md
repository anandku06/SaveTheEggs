## Some JS concepts learned here
- JS classes are hoisted, but they are not initialised until that particular line is read
- Objects in JS are so called reference datatypes i.e. refers to the space where the main class is stored.



# <canvas>
- used to draw graphics, animations, and render game scenes directly on a webpage using JS.
- essentially a container for graphics that you can draw using scripting

## How to use <canvas>
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