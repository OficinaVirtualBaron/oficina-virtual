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
exports.QuestionHistory = void 0;
const typeorm_1 = require("typeorm");
const ProcedureHistory_1 = require("./ProcedureHistory");
const QuestionOptionsHistory_1 = require("./QuestionOptionsHistory");
let QuestionHistory = class QuestionHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], QuestionHistory.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => QuestionOptionsHistory_1.QuestionOptionsHistory, (question_option_history) => question_option_history.question_history),
    __metadata("design:type", QuestionOptionsHistory_1.QuestionOptionsHistory)
], QuestionHistory.prototype, "question_option_history", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProcedureHistory_1.ProcedureHistory, (procedure_history) => procedure_history.question_history),
    (0, typeorm_1.JoinColumn)({ name: "procedure_history_id" }),
    __metadata("design:type", ProcedureHistory_1.ProcedureHistory)
], QuestionHistory.prototype, "procedure_history", void 0);
QuestionHistory = __decorate([
    (0, typeorm_1.Entity)({ name: "question_history" })
], QuestionHistory);
exports.QuestionHistory = QuestionHistory;
