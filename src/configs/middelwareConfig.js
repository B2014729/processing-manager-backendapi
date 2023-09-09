import express from 'express';

const middelewareConfig = (app) => {
    app.use(express.static('src/public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
};

export default middelewareConfig;