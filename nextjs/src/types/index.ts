export interface Post{
    id:number,
    user_id:number,
    title:string,
    description:string,
    updated_at:string
}

export interface PaginatedPosts {
  data: Post[];
  current_page: number;
  last_page: number;
}

export interface PostListProps {
    posts: PaginatedPosts,
}