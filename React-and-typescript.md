# React and TypeScript

"Developing a React project with TypeScript is a dream" (Alex: Northcoders, 2021)

## Set up

Setting up a basic React project with TS is as simple as running the following command:

`npx create-react-app <name-of-app> --template typescript`

This will create the usual basic React template with a few noteworthy differences:

- JSX code is written in `.tsx` files. This is the marrying of TS and JSX to make the perfect partnership!
- a `tsconfig.json` file as per usual.
- an installation of `typescript` the relevant @types, i.e. `@types/react`

If you were transferring a React.JS project into TS, you'll likely introduce those things yourself, but what's important to note is that **react-scripts can also interpret TS/TSX** which means you only need to `npm start` and you're on your way!

## Type-Safe JSX (TSX)

If you don't already know it, JSX is the code we write for React apps since it allows for a HTML like syntax whilst allowing us to inject variables into the code.

Writing in TSX means that TS can prompt you when you are doing stuff wrong! For example, you cannot use incorrect html tags!

```tsx
//Error - Property 'value' does not exist on type...!
<section value="">
  <h2>Stats</h2>
  <p>Comments: {comment_count}</p>
</section>
```

## Type-safe stateless functional components

In React, if a component requires no state we often use a functional component. These behave just like the TS functions we have used so far and can use type inference with return values if you wish. However we can add types as follows:

```tsx
interface StatProps {
  comment_count: number;
  votes: number;
  article_title: string;
}

const ArticleStats: React.FunctionComponent<StatProps> = ({
  comment_count,
  votes,
  article_title,
}) => {
  return (
    <section>
      <h2>{article_title}</h2>
      <p>{comment_count} comments</p>
      <p>{votes} votes</p>
    </section>
  );
};
```

Notice how the "Props" TS Type should be provided to the generic `React.FunctionComponent` type in order to enforce the shape of Props.

Depending on how strict you are, it is also possible to simply allow type inference to run course. But you'll at least want to type check the props:

```tsx
interface StatProps {
  comment_count: number;
  votes: number;
  article_title: string;
}

const ArticleStats = ({ comment_count, votes, article_title }: StatProps) => {
  return (
    <section>
      <h2>{article_title}</h2>
      <p>{comment_count} comments</p>
      <p>{votes} votes</p>
    </section>
  );
};
```

## Type-safe Class Components

Whenever we want to hold state in a component, one option we have is to use a class component. Since classes in TS are already types, and we would normally extend from `React.Component`,

`React.Component` is a generic class and therefore we can provide types to this in the form of `React.Component<MyProps, MyState>`!

```tsx
interface ArticlesProps {
  username: string;
}

interface ArticlesState {
  articles: Article[];
}

//Provide types to the component...
class Articles extends React.Component<ArticlesProps, ArticlesState> {
  state: ArticlesState = {
    articles: [],
  };

  render() {
    const { articles } = this.state;
    const { username } = this.props;
    //Return element to be rendered...
    return (
      <main>
        <h2>{username} here are your articles...</h2>
        <ul>
          {articles.map((article) => (
            <ArticleCard {...article} key={article.article_id} />
          ))}
        </ul>
      </main>
    );
  }

  //...
}
```

Notice how, not only is the state interface provided as a generic parameter to `React.Component`, but also the type of state is set when it is declared. Since the generic type parameter is there to enforce the type of argument passed to `this.setState`, typing both avoids conflict between state's initialization and it's reassignment when `setState` is called later.

## Type-safe Hooks

With Hooks, React uses generic types for the hook lifecycle functions. Like above, you will want to pass the type as a generic type paramater in situations where `useState` cannot simply infer the type.

```tsx
const Articles = ({ user, topic = '' }: ArticlesComponentProps) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, [articles, topic]);

  return (
    <main className="main-left">
      <ul>
        {articles.map((article) => (
          <ArticleCard {...article} key={article.article_id} />
        ))}
      </ul>
    </main>
  );

  //...
};
```

`articles` will be set as type `Article[]` and you will only be able to pass arguments of type `Article[]` to `setArticles`

Since the convention for `useState` is to create individual instances for components of state, normally it can simply infer the types...

```tsx
const [count, setCount] = useState(0);
```

`count` will be inferred as a number and only `setCount` can accept numbers.

## Event Handling

With Event handling, you can access the event types using the React object.

The below examples are shown in class based syntax but event typings would still have the same application in hooks

### Change Event

When writing change handlers, we want to provide the function with the correct parameter type. We can narrow down the type of html element as closely as possible by providing the HTML element type as a generic type parameter to `React.ChangeEvent`...

```tsx
class SubmitComment extends Component<SubmitCommentProps, SubmitCommentState> {
  state = {
    body: '',
  };

  render() {
    const { body } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="body">Post your comment...</label>
        <input
          id="body"
          value={body}
          onChange={this.handleInputChange}
          required
        />
        <button type="submit">Post</button>
      </form>
    );
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TS assists with event properties by providing the type...
    const { value } = event.target;
    this.setState({ body: value });
  };

  //...
}
```

### Submit Event

Like many other events in React, the submit event is also provided as a type `React.FormEvent` (also a generic type, but can be left without parameters)...

```tsx
class SubmitComment extends Component<SubmitCommentProps, SubmitCommentState> {
  state = {
    body: '',
  };
  render() {
    //...
  }

  handleSubmit = (event: React.FormEvent) => {
    const { article_id, username, addComment } = this.props;
    const { body } = this.state;
    event.preventDefault();
    api.postComment({ body, username, article_id }).then((newComment) => {
      addCommentToState(newComment);
    });
    this.setState({ body: '' });
  };

  //...
}
```

## More Resources

For a more in-depth look at React and TypeScript, feel free to check out this fantastic [cheat-sheet](https://github.com/typescript-cheatsheets/react)!
