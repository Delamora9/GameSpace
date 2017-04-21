exports.config = {
    specs: ['test/e2e/*Spec.js'],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'https://localhost:8081',
    framework: 'jasmine'
};