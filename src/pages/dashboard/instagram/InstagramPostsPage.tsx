
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@/stores/accountStore";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, MessageSquare, Share2, Eye, Calendar } from "lucide-react";
import { Media, PlatformAccountProps } from "@/lib/interfaces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const InstagramPostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { selectAccount } = useAccountStore();
  const [account, setAccount] = useState<PlatformAccountProps | null>(null);
  const [posts, setPosts] = useState<Media[]>([]);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  
  useEffect(() => {
    if (id) {
      selectAccount(id);
    }
    
    // Mock fetch account
    const mockAccount: PlatformAccountProps = {
      platformName: "instagram",
      access_token: "mock-token-1",
      created_time: "2023-01-01T00:00:00Z",
      id: id || "123456789",
      media_count: 42,
      name: "John Doe",
      updated_time: "2023-05-15T00:00:00Z",
      user_id: "user123",
      username: "johndoe",
      profile_picture_url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&q=80"
    };
    
    setAccount(mockAccount);
    
    // Mock fetch posts for the selected account
    const mockPosts: Media[] = [
      {
        id: "1",
        caption: "Sunset views. Double tap if you love this!",
        media_url: "https://images.unsplash.com/photo-1616992915-85a32884cbb3?w=500&q=80",
        permalink: "https://instagram.com/p/123",
        timestamp: "2023-05-15T15:00:00Z",
        media_type: "IMAGE",
        likes_count: 243,
        comments_count: 42,
      },
      {
        id: "2",
        caption: "Coffee and morning vibes. What's your favorite morning routine?",
        media_url: "https://images.unsplash.com/photo-1618640694237-4df3dc3428db?w=500&q=80",
        permalink: "https://instagram.com/p/456",
        timestamp: "2023-05-10T08:30:00Z",
        media_type: "IMAGE",
        likes_count: 187,
        comments_count: 23,
      },
      {
        id: "3",
        caption: "Beach day! Nothing better than this.",
        media_url: "https://images.unsplash.com/photo-1613612628319-b9fa26d45d52?w=500&q=80",
        permalink: "https://instagram.com/p/789",
        timestamp: "2023-05-01T12:15:00Z",
        media_type: "IMAGE",
        likes_count: 312,
        comments_count: 56,
      },
      {
        id: "4",
        caption: "New workout routine! 💪",
        media_url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
        permalink: "https://instagram.com/p/abc",
        timestamp: "2023-04-28T17:45:00Z",
        media_type: "IMAGE",
        likes_count: 156,
        comments_count: 18,
      },
      {
        id: "5",
        caption: "Exploring new places today",
        media_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
        permalink: "https://instagram.com/p/def",
        timestamp: "2023-04-24T10:20:00Z",
        media_type: "IMAGE",
        likes_count: 278,
        comments_count: 34,
      },
      {
        id: "6",
        caption: "Perfect dinner with friends",
        media_url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80",
        permalink: "https://instagram.com/p/ghi",
        timestamp: "2023-04-20T19:30:00Z",
        media_type: "IMAGE",
        likes_count: 210,
        comments_count: 27,
      }
    ];
    
    setPosts(mockPosts);
  }, [id, selectAccount]);

  if (!account) {
    return (
      <div className="container py-8">
        <p>Account not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Instagram Posts
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              {posts.length} posts
            </Badge>
          </h1>
          <p className="text-muted-foreground">Viewing posts for @{account.username}</p>
        </div>
        
        <Tabs value={layout} onValueChange={(value) => setLayout(value as 'grid' | 'list')}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Grid Layout */}
      {layout === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            <Card 
              key={post.id} 
              className="overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredPostId(post.id)}
              onMouseLeave={() => setHoveredPostId(null)}
            >
              <CardContent className="p-0 relative">
                <AspectRatio ratio={1/1}>
                  <img 
                    src={post.media_url} 
                    alt={post.caption || "Instagram post"} 
                    className="object-cover h-full w-full"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-black/60 flex flex-col justify-center items-center transition-opacity duration-200", 
                      hoveredPostId === post.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center text-white">
                        <Heart className="h-6 w-6 mb-1" />
                        <span>{post.likes_count}</span>
                      </div>
                      <div className="flex flex-col items-center text-white">
                        <MessageSquare className="h-6 w-6 mb-1" />
                        <span>{post.comments_count}</span>
                      </div>
                    </div>
                    <p className="text-white text-sm mt-4 line-clamp-3 max-w-[90%] text-center">
                      {post.caption}
                    </p>
                  </div>
                </AspectRatio>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* List Layout */}
      {layout === 'list' && (
        <div className="space-y-6">
          {posts.map(post => (
            <Card key={post.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 lg:w-1/4">
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={post.media_url} 
                      alt={post.caption || "Instagram post"} 
                      className="object-cover h-full w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                    />
                  </AspectRatio>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={account.profile_picture_url} alt={account.username} />
                      <AvatarFallback>{account.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">@{account.username}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(post.timestamp), 'MMM d, yyyy')}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">{post.caption}</p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes_count}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments_count}</span>
                    </div>
                    {post.shares_count && (
                      <div className="flex items-center gap-1 text-sm">
                        <Share2 className="h-4 w-4" />
                        <span>{post.shares_count}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InstagramPostsPage;
