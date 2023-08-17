const { Router } = require("express");

const SessionsController = require("../controllers/sessionsControler");
/* ai instanciar a gente aloca pra memoria e tranfere */
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create);

module.exports = sessionsRoutes;