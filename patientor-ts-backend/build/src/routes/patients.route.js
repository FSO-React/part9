"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_service_1 = __importDefault(require("../services/patients.service"));
const utils_1 = require("../utils");
const zod_1 = require("zod");
const router = express_1.default.Router();
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
router.get('/', (_req, res) => {
    res.send(patients_service_1.default.getNonSensitivePatients());
});
router.get('/:id', (req, res) => {
    const patient = patients_service_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
router.post('/', newPatientParser, (req, res) => {
    const addedPatient = patients_service_1.default.addPatient(req.body);
    res.json(addedPatient);
});
router.use(errorMiddleware);
exports.default = router;
