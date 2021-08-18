import { ObjectID } from 'bson';
import { CommentPostBody, Comment } from '../apiSchema';
import { client } from '../db/db';

type AddComment = (commentToAdd: {
  text: string;
  author: string;
  postId: number;
}) => Promise<Comment>;
export const addComment: AddComment = (commentToAdd) => {
  const { id, ...newComment } = makeComment(commentToAdd);
  return client
    .db(process.env.DB_NAME)
    .collection('comments')
    .insertOne({ _id: id, ...newComment })
    .then((data) => {
      const { _id, ...addedComment } = data.ops[0];
      return { id: _id, ...addedComment };
    });
};

type FetchComment = (comment_id: string) => Promise<Comment>;
export const fetchComment: FetchComment = (comment_id) => {
  return client
    .db(process.env.DB_NAME)
    .collection('comments')
    .findOne({ _id: comment_id })
    .then((comment) => {
      if (comment !== null) {
        const { _id, ...restOfComment } = comment;
        return { id: _id, ...restOfComment };
      } else {
        return Promise.reject({ msg: 'not found' });
      }
    });
};

type FetchComments = (postId: string) => Promise<Comment[]>;
export const fetchCommentsByPostId: FetchComments = (postId) => {
  return client
    .db(process.env.DB_NAME)
    .collection('comments')
    .find({ postId: Number(postId) })
    .toArray()
    .then((comments) => {
      return comments.map(({ _id, ...comment }) => {
        return { id: _id, ...comment };
      });
    });
};

type EditComment = (
  comment_id: string,
  fieldsToChange: Pick<Comment, 'text'>
) => Promise<Comment>;
export const editComment: EditComment = (comment_id, { text }) => {
  return client
    .db(process.env.DB_NAME)
    .collection('comments')
    .updateOne(
      { _id: comment_id },
      { $set: { text: text, modifiedOn: Date.now() } }
    )
    .then(() => {
      return client
        .db(process.env.DB_NAME)
        .collection('comments')
        .findOne({ _id: comment_id })
        .then((comment) => {
          if (comment === null) {
            return Promise.reject({ msg: 'not found' });
          } else {
            const { _id, ...restOfComment } = comment;
            return { id: _id, ...restOfComment };
          }
        });
    });
};

export const removeCommentById = (commentId: string) => {
  return client
    .db(process.env.DB_NAME)
    .collection('comments')
    .deleteOne({ _id: commentId })
    .then(({ deletedCount }) => {
      if (deletedCount === 0) {
        return Promise.reject({ msg: 'not found' });
      } else {
        return deletedCount;
      }
    });
};

type IsCommentPostBody = (comment: {
  text: string;
  author: string;
  postId: number;
}) => comment is CommentPostBody;
const isCommentPostBody: IsCommentPostBody = (
  comment
): comment is CommentPostBody => {
  return (
    typeof comment.text === 'string' &&
    typeof comment.author === 'string' &&
    typeof comment.postId === 'number'
  );
};

type MakeComment = (
  commentToAdd: Pick<Comment, 'text' | 'author' | 'postId'>
) => Comment;
const makeComment: MakeComment = (comment) => {
  if (isCommentPostBody(comment)) {
    const newComment: Comment = {
      ...comment,
      id: new ObjectID().toString(),
      createdOn: Date.now(),
      modifiedOn: Date.now(),
    };
    return newComment;
  } else {
    throw new Error('bad comment body');
  }
};
