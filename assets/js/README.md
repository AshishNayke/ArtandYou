
# JavaScript Directory

This directory contains all JavaScript files for the Art&You platform.

## Core Files

- `main.js` - Initializes the application and coordinates between components
- `config.js` - Contains configuration settings 
- `utils.js` - Utility functions used across the application

## Component Files

- `navigation.js` - Handles navigation menu and mobile menu functionality
- `hero.js` - Controls hero section animations and behavior
- `gallery.js` - Manages gallery filtering, loading, and interactions
- `auctions.js` - Controls auction listings, timers, and bidding processes
- `artists.js` - Handles artist profiles and related functionality
- `forum.js` - Powers the forum system with topics and comments
- `auth.js` - Manages authentication processes
- `footer.js` - Controls footer functionality

## Architecture

The JavaScript is organized in a component-based architecture where each major section of the site has its own JS file. Each component initializes itself and communicates with other components through events or direct function calls.

### Usage Pattern

Most components follow this pattern:
1. Check if their elements exist on the page
2. If they exist, initialize the component
3. Set up event listeners
4. Load data if required

## Data Handling

Data is currently loaded from mock data within the JS files. In a production environment, this would be replaced with API calls to a backend.
