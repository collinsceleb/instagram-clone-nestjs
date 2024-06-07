"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommentInput = void 0;
const create_comment_input_1 = require("./create-comment.input");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateCommentInput extends (0, mapped_types_1.PartialType)(create_comment_input_1.CreateCommentInput) {
}
exports.UpdateCommentInput = UpdateCommentInput;
//# sourceMappingURL=update-comment.input.js.map