# <canvas>
- used to draw graphics, animations, and render game scenes directly on a webpage using JS.
- essentially a container for graphics that you can draw using scripting

## How to use <canvas>
- Get the context via JS
    ```Javascript
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d'); // 2d param for 2d graphics rendering
    ```