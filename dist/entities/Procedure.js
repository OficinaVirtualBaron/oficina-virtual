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
let Procedure = class Procedure extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Procedure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: "Procedure title" }),
    __metadata("design:type", String)
], Procedure.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Question_1.Question, (question) => question.procedures),
    (0, typeorm_1.JoinTable)({
        name: "procedure_has_question",
        joinColumn: {
            name: "procedure_idquestion",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "question_idprocedure",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Procedure.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Category_1.Category, (category) => category.procedure),
    (0, typeorm_1.JoinTable)({
        name: "procedure_has_category",
        joinColumn: {
            name: "procedure_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "category_id",
            referencedColumnName: "id"
        }
    }),
    __metadata("design:type", Array)
], Procedure.prototype, "categories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProcedureHistory_1.ProcedureHistory, (procedure_history) => procedure_history.procedure),
    __metadata("design:type", ProcedureHistory_1.ProcedureHistory)
], Procedure.prototype, "procedure_history", void 0);
Procedure = __decorate([
    (0, typeorm_1.Entity)({ name: "procedure" })
], Procedure);
exports.Procedure = Procedure;
