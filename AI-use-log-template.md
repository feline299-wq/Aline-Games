# AI Use Log Template

## Prompt 1

Help me create a simple Year 1 JavaScript browser game called Monster Mayhem. It needs a 10x10 connected hexagon grid, hover highlighting, tile selection, deselection, and a simple monster movement mechanic.

## AI Output Summary

AI helped create the first version of the HTML, CSS and JavaScript files. The first version created the board, hexagon shapes, hover effect, selection, deselection and monster movement.

## Manual Changes

I tested the game in the browser and checked if the board appeared correctly. I reviewed the code comments and checked how the board was created using rows, columns and JavaScript loops.

## Prompt 2

Add a simple score system, three crystals to collect, a win condition when all crystals are collected, and a moves-left system that causes game over when the player runs out of moves.

## AI Output Summary

AI helped add a score counter, moves-left counter, crystal objects, collection logic, win condition and game over condition.

## Manual Changes

I changed and reviewed the text shown to the player. I tested the monster movement, checked if crystals disappeared when collected, and checked if the score updated correctly.

## Troubleshooting

One issue was making sure crystals disappeared after the monster collected them. This was solved by adding a collected value to each crystal and checking it before drawing the crystal on the board.

Another issue was making sure the game stopped after winning or losing. This was solved by using a gameOver variable. If gameOver is true, clicks no longer move the monster.

## Reflection

AI helped me create the first structure of the game and understand how JavaScript can dynamically create HTML elements. The main benefit was that it gave me a working starting point with separate HTML, CSS and JavaScript files. However, I still needed to test the project and understand how each part worked before submitting it. I learned that the hexagons are normal div elements styled with CSS clip-path. I also learned that the JavaScript uses loops to create the 10x10 board, event listeners to detect clicks, and variables to store the monster position, selected tile, score and moves left. One limitation of using AI is that the code can work without me understanding it, so I had to review the functions carefully. I also made sure to document the AI use clearly because the CA requires this. Overall, AI helped me build the code faster, but I am responsible for understanding and explaining the final project.
