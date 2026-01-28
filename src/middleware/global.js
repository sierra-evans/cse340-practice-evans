/**
 * Helper function to get the current greeting based on the time of day.
 */
const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();
    const month = new Date().getMonth();

    let greeting;

    /**
     * Create logic to set different greetings based on the current hour and season.
     */
    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 17) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }

    // Season-based greeting
    if ([11, 0, 1].includes(month)) {
        greeting += ' and Happy Winter!';
    } else if ([2, 3, 4].includes(month)) {
        greeting += ' and Happy Spring!';
    } else if ([5, 6, 7].includes(month)) {
        greeting += ' and Happy Summer!';
    } else if ([8, 9, 10].includes(month)) {
        greeting += ' and Happy Fall!';
    }

    return greeting;

};

/**
 * Middleware to add local variables to res.locals for use in all templates.
 * Templates can access these values but are not required to use them.
 */
const addLocalVariables = (req, res, next) => {
    // Set current year for use in templates
    res.locals.currentYear = new Date().getFullYear();

    // Make NODE_ENV available to all templates
    res.locals.NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

    // Make req.query available to all templates
    res.locals.queryParams = { ...req.query };

    // Set greeting based on time of day
    res.locals.greeting = `<p>${getCurrentGreeting()}</p>`;

    // Randomly assign a theme class to the body
    const themes = ['blue-theme', 'green-theme', 'red-theme', 'purple-theme', 'pink-theme', 'yellow-theme'];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    res.locals.bodyClass = randomTheme;

    // Continue to the next middleware or route handler
    next();
};

export { addLocalVariables };