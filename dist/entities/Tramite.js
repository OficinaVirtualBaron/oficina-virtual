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
exports.Tramite = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Tramite = class Tramite extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tramite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: "Título trámite" }),
    __metadata("design:type", String)
], Tramite.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250, default: "Descripción trámite" }),
    __metadata("design:type", String)
], Tramite.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Primer pregunta aquí" }),
    __metadata("design:type", String)
], Tramite.prototype, "firstQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Segunda pregunta aquí" }),
    __metadata("design:type", String)
], Tramite.prototype, "secondQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Tercera pregunta aquí" }),
    __metadata("design:type", String)
], Tramite.prototype, "thirdQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Cuarta pregunta aquí" }),
    __metadata("design:type", String)
], Tramite.prototype, "quarterQuestion", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Quinta pregunta aquí" }),
    __metadata("design:type", String)
], Tramite.prototype, "fifthQuestion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Tramite.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Tramite.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.tramites),
    __metadata("design:type", User_1.User)
], Tramite.prototype, "user", void 0);
Tramite = __decorate([
    (0, typeorm_1.Entity)()
], Tramite);
exports.Tramite = Tramite;
