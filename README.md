# Cannonball Game

This project is a simple cannonball game that demonstrates the use of linear regression to predict the optimal angle for hitting a target. The game is built using HTML5 Canvas and JavaScript, with a Node.js server to serve the static files.

## Features

- **Cannon and Target**: A cannon that can shoot cannonballs at a target.
- **Linear Regression**: Uses linear regression to predict the optimal angle for hitting the target based on previous shots.
- **Interactive Controls**: Sliders to adjust the target height and angle weight.
- **Graph Visualization**: Displays a graph of the cannon angle vs. shot height with a regression line.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/cannonball_game.git
    cd cannonball_game
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    node server.js
    ```

4. Open your favorite browser and navigate to `http://localhost:3000`.

## Usage

- The **Target Height** slider shows the height of the target.
- The **Computed Angle** slider shows the angle calculated by the linear regression model.
- The **Angle Weight** slider adjusts the weight given to the angle in the regression model.
- Press the spacebar to shoot the cannonball.
