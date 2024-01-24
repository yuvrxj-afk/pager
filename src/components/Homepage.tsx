/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, TextField } from "@mui/material";
import { Component } from "react";
import PostCardWithRouter from "./PostCard";
import withRouter from "./withRouter";
import PostCardEithRouter from "./PostCard";
interface postType {
  author: string;
  title: string;
  created_at: string;
  url: string;
}

interface HomeProps {
  navigate: (url: string, any: any) => void;
}

interface HomeState {
  posts: postType[];
  loading: boolean;
  page: number;
  searchTerm: string;
  searchedPosts: postType[];
}

class Homepage extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      posts: [],
      loading: false,
      page: 0,
      searchTerm: "",
      searchedPosts: [],
    };
  }

  interval: number | undefined;

  fetchPosts = async () => {
    const { page, posts } = this.state;

    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
      );
      const data = await response.json();
      const newPosts = data.hits;
      this.setState({
        posts: [...posts, ...newPosts],
        page: page + 1,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        await this.fetchPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  findSearchTerm = () => {
    const { searchTerm, posts } = this.state;
    if (searchTerm.trim() === "") {
      this.setState({ searchedPosts: [] });
      return;
    }
    console.log(searchTerm);
    const filteredSearchedPosts = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.setState({ searchedPosts: filteredSearchedPosts, searchTerm: "" });
  };

  componentDidMount() {
    this.fetchPosts();
    this.interval = setInterval(this.fetchPosts, 10000);
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const { searchTerm, searchedPosts, posts, loading } = this.state;
    return (
      <Container sx={{ padding: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <TextField
            placeholder="Search Here"
            value={searchTerm}
            inputProps={{
              style: { backgroundColor: "lightgrey", borderRadius: "10px" },
            }}
            onChange={this.handleSearch}
          />
          <Button
            variant="contained"
            disabled={!searchTerm}
            onClick={this.findSearchTerm}
          >
            Search
          </Button>
        </Box>
        {/* showing posts */}
        <Box mt={2}>
          {searchedPosts.length !== 0 ? (
            <>
              {searchedPosts.map((post, i) => (
                <PostCardEithRouter post={post} key={i} />
              ))}
            </>
          ) : (
            <>
              {posts.map((post, i) => (
                <PostCardWithRouter post={post} key={i} />
              ))}
              {loading && <p>loading</p>}
            </>
          )}
        </Box>
      </Container>
    );
  }
}

const HomePageWithRouter = withRouter(Homepage);
export default HomePageWithRouter;
