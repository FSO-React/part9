"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ping_route_1 = __importDefault(require("./routes/ping.route"));
const diagnoses_route_1 = __importDefault(require("./routes/diagnoses.route"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = 3001;
router.use((req, _res, next) => {
    console.log('Request URL:', req.url);
    next();
});
app.use('/api', router);
app.use('/api/ping', ping_route_1.default);
app.use('/api/diagnoses', diagnoses_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
