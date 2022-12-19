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
exports.MiTramite = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let MiTramite = class MiTramite extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MiTramite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: "Título trámite" }),
    __metadata("design:type", String)
], MiTramite.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, default: "Descripción trámite" }),
    __metadata("design:type", String)
], MiTramite.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MiTramite.prototype, "questionone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MiTramite.prototype, "questiontwo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MiTramite.prototype, "questionthree", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MiTramite.prototype, "questionfour", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MiTramite.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MiTramite.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MiTramite.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.mitramite),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], MiTramite.prototype, "user", void 0);
MiTramite = __decorate([
    (0, typeorm_1.Entity)({ name: "mi_tramite" })
], MiTramite);
exports.MiTramite = MiTramite;
