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
exports.ProcedureHistory = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Document_1 = require("./Document");
const QuestionHistory_1 = require("./QuestionHistory");
const Status_1 = require("./Status");
const User_1 = require("./User");
let ProcedureHistory = class ProcedureHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProcedureHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProcedureHistory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProcedureHistory.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.procedures),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], ProcedureHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document_1.Document, (documents) => documents.procedure),
    __metadata("design:type", Array)
], ProcedureHistory.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Status_1.Status, (status) => status.procedure, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "status_id" }),
    __metadata("design:type", Status_1.Status)
], ProcedureHistory.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.procedure),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Category_1.Category)
], ProcedureHistory.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuestionHistory_1.QuestionHistory, (questions) => questions.procedure),
    __metadata("design:type", Array)
], ProcedureHistory.prototype, "questions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProcedureHistory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProcedureHistory.prototype, "updated_at", void 0);
ProcedureHistory = __decorate([
    (0, typeorm_1.Entity)({ name: "procedure_history" })
], ProcedureHistory);
exports.ProcedureHistory = ProcedureHistory;
