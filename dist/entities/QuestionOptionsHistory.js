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
exports.QuestionOptionHistory = void 0;
const typeorm_1 = require("typeorm");
const QuestionHistory_1 = require("./QuestionHistory");
const QuestionOption_1 = require("./QuestionOption");
let QuestionOptionHistory = class QuestionOptionHistory extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], QuestionOptionHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], QuestionOptionHistory.prototype, "answer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuestionHistory_1.QuestionHistory, (question) => question.question_option_history),
    (0, typeorm_1.JoinColumn)({ name: "question_history_id" }),
    __metadata("design:type", QuestionHistory_1.QuestionHistory)
], QuestionOptionHistory.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => QuestionOption_1.QuestionOption, (questionOption) => questionOption.questionOptionHistory),
    (0, typeorm_1.JoinColumn)({ name: "question_option_id" }),
    __metadata("design:type", Array)
], QuestionOptionHistory.prototype, "questionOption", void 0);
QuestionOptionHistory = __decorate([
    (0, typeorm_1.Entity)({ name: "question_option_history" })
], QuestionOptionHistory);
exports.QuestionOptionHistory = QuestionOptionHistory;
