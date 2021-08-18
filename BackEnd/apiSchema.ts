export type CommentResponse = {
  comment: {
    text: string;
    author: string;
    createdOn: number;
    modifiedOn: number;
    id: string;
    postId: number;
  };
};
export type CommentPostBody = Pick<Comment, 'text' | 'author' | 'postId'>;

export type CommentsResponse = {
  comments: {
    text: string;
    author: string;
    createdOn: number;
    modifiedOn: number;
    id: string;
    postId: number;
  }[];
};

export type Comment = {
  id: string;
  text: string;
  author: string;
  createdOn: number;
  modifiedOn: number;
  postId: number;
};
