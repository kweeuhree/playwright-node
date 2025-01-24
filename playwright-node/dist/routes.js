"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const router = express.Router();
const scraper = require("./scraper");
// Get articles
router.post("/articles", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const url = (_a = req.body) === null || _a === void 0 ? void 0 : _a.url;
    if (!url) {
        res.status(400).json({ error: "failed to get url from request body" });
        next();
    }
    try {
        const articles = yield scraper(url);
        res.json(articles);
    }
    catch (error) {
        next(error);
    }
}));
module.exports = router;
