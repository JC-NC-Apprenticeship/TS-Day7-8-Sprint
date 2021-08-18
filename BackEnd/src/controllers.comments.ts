import { RequestHandler } from 'express';
import {
  addComment,
  fetchComment,
  fetchCommentsByPostId,
  editComment,
  removeCommentById,
} from './models.comments';
import {
  CommentResponse,
  CommentPostBody,
  CommentsResponse,
} from '../apiSchema';

type PostCommentController = RequestHandler<
  '',
  CommentResponse,
  CommentPostBody
>;
export const postComment: PostCommentController = (req, res, next) => {
  const { text, author, postId } = req.body;
  addComment({ text, author, postId })
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

type GetCommentByIdController = RequestHandler<
  { comment_id: string },
  CommentResponse
>;
export const getCommentById: GetCommentByIdController = (req, res, next) => {
  const { comment_id } = req.params;
  fetchComment(comment_id)
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

type GetCommentByPostIdController = RequestHandler<
  { postId: string },
  CommentsResponse
>;
export const getCommentsByPostId: GetCommentByPostIdController = (
  req,
  res,
  next
) => {
  const { postId } = req.params;
  fetchCommentsByPostId(postId)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

type PatchCommentController = RequestHandler<
  { comment_id: string },
  CommentResponse,
  { text: string }
>;
export const patchCommentById: PatchCommentController = (req, res, next) => {
  const { comment_id } = req.params;
  const { text } = req.body;
  editComment(comment_id, { text })
    .then((comment) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

type DeleteCommentController = RequestHandler<{ comment_id: string }>;
export const deleteCommentById: DeleteCommentController = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
