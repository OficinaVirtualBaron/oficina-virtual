"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakerTramite = void 0;
const typeorm_1 = require("typeorm");
const Tramite_1 = require("./Tramite");
const Maker_1 = require("./Maker");
let MakerTramite = class MakerTramite extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], MakerTramite.prototype, "quantityTramite", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MakerTramite.prototype, "totalPrice", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Maker_1.Maker, (maker) => maker.makerTramite),
    (0, typeorm_1.JoinColumn)({ name: "maker_id" }),
    __metadata("design:type", Maker_1.Maker)
], MakerTramite.prototype, "maker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Tramite_1.Tramite, (tramite) => tramite.makerTramite),
    (0, typeorm_1.JoinColumn)({ name: "tramite_id" }),
    __metadata("design:type", Tramite_1.Tramite)
], MakerTramite.prototype, "tramite", void 0);
MakerTramite = __decorate([
    (0, typeorm_1.Entity)({ name: "maker_tramite" })
], MakerTramite);
exports.MakerTramite = MakerTramite;
