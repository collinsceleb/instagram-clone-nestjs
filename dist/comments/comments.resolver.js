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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const comments_service_1 = require("./comments.service");
const create_comment_input_1 = require("./dto/create-comment.input");
const update_comment_input_1 = require("./dto/update-comment.input");
let CommentsResolver = class CommentsResolver {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    create(createCommentInput) {
        return this.commentsService.create(createCommentInput);
    }
    findAll() {
        return this.commentsService.findAll();
    }
    findOne(id) {
        return this.commentsService.findOne(id);
    }
    update(updateCommentInput) {
        return this.commentsService.update(updateCommentInput.id, updateCommentInput);
    }
    remove(id) {
        return this.commentsService.remove(id);
    }
};
exports.CommentsResolver = CommentsResolver;
__decorate([
    (0, graphql_1.Mutation)('createComment'),
    __param(0, (0, graphql_1.Args)('createCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_input_1.CreateCommentInput]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('comments'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('comment'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)('updateComment'),
    __param(0, (0, graphql_1.Args)('updateCommentInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_comment_input_1.UpdateCommentInput]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('removeComment'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CommentsResolver.prototype, "remove", null);
exports.CommentsResolver = CommentsResolver = __decorate([
    (0, graphql_1.Resolver)('Comment'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsResolver);
//# sourceMappingURL=comments.resolver.js.map