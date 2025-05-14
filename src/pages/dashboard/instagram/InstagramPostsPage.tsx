
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@/stores/accountStore";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, MessageSquare } from "lucide-react";

const InstagramPostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { accounts, selectedAccountId, selectAccount, posts, setPosts } = useAccountStore();

  const account = accounts.find(acc => acc.id === id);

  useEffect(() => {
    if (id && id !== selectedAccountId) {
      selectAccount(id);
    }
    
    // Mock fetch posts for the selected account
    const mockPosts = [
      {
        id: "1",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1616992915-85a32884cbb3?w=500&q=80",
        caption: "Sunset views. Double tap if you love this!",
        likes: 243,
        comments: 42,
        date: "2023-05-15"
      },
      {
        id: "2",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1618640694237-4df3dc3428db?w=500&q=80",
        caption: "Coffee and morning vibes. What's your favorite morning routine?",
        likes: 187,
        comments: 23,
        date: "2023-05-10"
      },
      {
        id: "3",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1613612628319-b9fa26d45d52?w=500&q=80",
        caption: "Beach day! Nothing better than this.",
        likes: 312,
        comments: 56,
        date: "2023-05-01"
      },
    ];
    
    setPosts(mockPosts);
  }, [id, selectedAccountId, selectAccount, setPosts]);

  if (!account) {
    return (
      <div className="container py-8">
        <p>Account not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Instagram Posts</h1>
          <p className="text-muted-foreground">Viewing posts for @{account.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <Card key={post.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={account.profilePic} alt={account.username} />
                  <AvatarFallback>{account.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm">@{account.username}</CardTitle>
                  <CardDescription className="text-xs">{post.date}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <AspectRatio ratio={1/1}>
                <img 
                  src={post.imageUrl} 
                  alt="Post" 
                  className="object-cover h-full w-full"
                />
              </AspectRatio>
            </CardContent>
            <CardFooter className="flex flex-col items-start pt-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-1" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
              <p className="text-sm">{post.caption}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstagramPostsPage;
