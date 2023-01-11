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
const User_1 = require("./User");
const Document_1 = require("./Document");
const Procedure_1 = require("./Procedure");
const QuestionHistory_1 = require("./QuestionHistory");
const Status_1 = require("./Status");
let ProcedureHistory = class ProcedureHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProcedureHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], ProcedureHistory.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.procedures_history),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", User_1.User)
], ProcedureHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Document_1.Document, (document) => document.procedure_history),
    (0, typeorm_1.JoinColumn)({ name: "document_id" }),
    __metadata("design:type", Array)
], ProcedureHistory.prototype, "documents", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Procedure_1.Procedure, (procedure) => procedure.procedure_history),
    (0, typeorm_1.JoinColumn)({ name: "procedure_id" }),
    __metadata("design:type", Procedure_1.Procedure)
], ProcedureHistory.prototype, "procedure", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuestionHistory_1.QuestionHistory, (question_history) => question_history.procedure_history),
    __metadata("design:type", QuestionHistory_1.QuestionHistory)
], ProcedureHistory.prototype, "question_history", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Status_1.Status, (status) => status.procedure_history),
    (0, typeorm_1.JoinColumn)({ name: "status_id" }),
    __metadata("design:type", Status_1.Status)
], ProcedureHistory.prototype, "status", void 0);
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
