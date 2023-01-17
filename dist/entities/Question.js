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
exports.Question = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Procedure_1 = require("./Procedure");
const Question_Option_1 = require("./Question_Option");
let Question = class Question extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Question.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Question_Option_1.Question_Option, (question_option) => question_option.question),
    __metadata("design:type", Array)
], Question.prototype, "question_options", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Procedure_1.Procedure, (procedure) => procedure.question),
    (0, typeorm_1.JoinColumn)({ name: "procedure_id" }),
    __metadata("design:type", Procedure_1.Procedure)
], Question.prototype, "procedure", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.procedure),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", Category_1.Category)
], Question.prototype, "categories", void 0);
Question = __decorate([
    (0, typeorm_1.Entity)({ name: "question" })
], Question);
exports.Question = Question;
