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
exports.Procedure = void 0;
const typeorm_1 = require("typeorm");
const Question_1 = require("./Question");
const Category_1 = require("./Category");
const ProcedureHistory_1 = require("./ProcedureHistory");
let Procedure = class Procedure {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Procedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, unique: true }),
    __metadata("design:type", String)
], Procedure.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Procedure.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Question_1.Question, (question) => question.procedure),
    __metadata("design:type", Array)
], Procedure.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.procedureTemplate),
    (0, typeorm_1.JoinColumn)({ name: "categoryId" }),
    __metadata("design:type", Array)
], Procedure.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProcedureHistory_1.ProcedureHistory, (procedureHistory) => procedureHistory.procedure),
    __metadata("design:type", Array)
], Procedure.prototype, "procedureHistory", void 0);
Procedure = __decorate([
    (0, typeorm_1.Entity)({ name: "procedure" })
], Procedure);
exports.Procedure = Procedure;
