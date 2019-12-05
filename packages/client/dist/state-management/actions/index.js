"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conectActions_1 = require("./conectActions");
var simpleActions_1 = require("./simpleActions");
var secureActions_1 = require("./secureActions");
var actions = { connect: conectActions_1.connect, endSecureChat: secureActions_1.endSecureChat, saveFriendKey: secureActions_1.saveFriendKey, endSimpleChat: simpleActions_1.endSimpleChat, startSimpleChat: simpleActions_1.startSimpleChat, startSecureChat: secureActions_1.startSecureChat };
exports.default = actions;
