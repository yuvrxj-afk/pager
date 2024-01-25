/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";
import { Typography, Paper, Box, Icon } from "@mui/material";
import withRouter from "./withRouter";
import { HomeOutlined } from "@mui/icons-material";

interface PostDetailsProps {
  objectID: string;
  author: string;
  title: string;
  created_at: string;
  url: string;
  location: any;
}

interface PostDetailsState {
  post: PostDetailsProps | null;
}

class PostDetails extends Component<PostDetailsProps, PostDetailsState> {
  constructor(props: any) {
    super(props);
    this.state = {
      post: null,
    };
  }

  truncateUrl = (url: string, maxLength: number): string => {
    if (!url) {
      return "";
    }
    if (url.length <= maxLength) {
      return url;
    }
    return url.substring(0, maxLength - 3) + "...";
  };

  componentDidMount() {
    const { location } = this.props;
    const PostDetail: PostDetailsProps = location.state;
    this.setState({ post: PostDetail });
  }
  render() {
    const { post } = this.state;
    if (!post) {
      return;
    }
    const truncatedUrl = this.truncateUrl(post.url, 60);
    const formattedDate = new Date(post.created_at).toLocaleString();

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={5}
          style={{
            padding: "20px",
            marginBottom: "20px",
            height: "200px",
            gap: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            wordWrap: "break-word",
          }}
        >
          <Icon
            onClick={() => {
              window.location.href = "/";
            }}
            sx={{ cursor: "pointer" }}
          >
            <HomeOutlined />
          </Icon>
          <Typography variant="h5" sx={{ fontWeight: "800" }}>
            {post.title}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
            Author: {post.author}
          </Typography>
          <Typography variant="body1" data-testid="truncated-url">
            URL:{" "}
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {truncatedUrl}
            </a>
          </Typography>
          <Typography variant="body1">{formattedDate}</Typography>
        </Paper>
      </Box>
    );
  }
}
const PostDetailsWithRouter = withRouter(PostDetails);
export default PostDetailsWithRouter;
