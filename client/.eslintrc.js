module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-ally",
        "import"
    ],
    "rules": {
        // windows linebreaks when not in production environment
        "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
        "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
        "function-paren-newline": ["error", "consistent"],
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
};