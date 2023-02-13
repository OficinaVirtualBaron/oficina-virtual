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
exports.UserMuni = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const ProcedureHistory_1 = require("./ProcedureHistory");
let UserMuni = class UserMuni {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserMuni.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserMuni.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserMuni.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserMuni.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], UserMuni.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 20 }),
    __metadata("design:type", String)
], UserMuni.prototype, "cuil", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "MUNI_ROLE" }),
    __metadata("design:type", String)
], UserMuni.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserMuni.prototype, "required", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserMuni.prototype, "inprocess", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], UserMuni.prototype, "finalized", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserMuni.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserMuni.prototype, "update_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.muni),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", Category_1.Category)
], UserMuni.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProcedureHistory_1.ProcedureHistory, (procedureHistory) => procedureHistory.userMuni),
    __metadata("design:type", Array)
], UserMuni.prototype, "procedureHistory", void 0);
UserMuni = __decorate([
    (0, typeorm_1.Entity)()
], UserMuni);
exports.UserMuni = UserMuni;
