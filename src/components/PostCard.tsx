/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { Paper, Typography } from "@mui/material";
import withRouter from "./withRouter";

interface PostCardProps {
  post: {
    author: string;
    title: string;
    created_at: string;
    url: string;
  };
  key: number;
  navigate: (url: string, any: any) => void;
}

class PostCard extends Component<PostCardProps> {
  handleClick = () => {
    this.props.navigate(`/post`, { state: this.props.post });
  };
  truncateUrl = (url: string, maxLength: number): string => {
    if (!url) {
      return "";
    }
    if (url.length <= maxLength) {
      return url;
    }
    return url.substring(0, maxLength - 3) + "...";
  };
  render() {
    const { post, key } = this.props;

    const truncatedUrl = this.truncateUrl(post.url, 60);

    const formattedDate = new Date(post.created_at).toLocaleString();
    return (
      <Paper
        elevation={5}
        key={key}
        style={{
          padding: "20px",
          marginBottom: "20px",
          height: "100px",
          wordWrap: "break-word",
        }}
        onClick={this.handleClick}
        data-testid="postcard-id"
      >
        <Typography variant="h6" fontWeight={"700"}>
          {post.title}
        </Typography>
        <Typography variant="body1" fontWeight={"600"}>
          Author - <span style={{ color: "red " }}>{post.author}</span>
        </Typography>
        <Typography variant="body1" data-testid="truncated-url">
          URL:{" "}
          <a
            href={post.url}
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            rel="noopener noreferrer"
          >
            {truncatedUrl}
          </a>
        </Typography>
        <Typography variant="body1">{formattedDate}</Typography>
      </Paper>
    );
  }
}

const PostCardEithRouter = withRouter(PostCard);
export default PostCardEithRouter;
