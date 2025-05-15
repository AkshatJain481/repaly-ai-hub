
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@/stores/accountStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import { PlatformAccountProps, Story } from "@/lib/interfaces";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Eye } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InstagramStoriesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { selectAccount } = useAccountStore();
  const [account, setAccount] = useState<PlatformAccountProps | null>(null);
  const [stories, setStories] = useState<Story[]>([]); 
  const [hoveredStoryId, setHoveredStoryId] = useState<string | null>(null);
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
    
    // Mock fetch stories for the selected account
    const mockStories: Story[] = [
      {
        id: "1",
        media_url: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=500&q=80",
        timestamp: "2023-05-15T10:00:00Z",
        likes_count: 56,
        viewed: false
      },
      {
        id: "2",
        media_url: "https://images.unsplash.com/photo-1622810676126-5143e6fe9915?w=500&q=80",
        timestamp: "2023-05-14T14:00:00Z",
        likes_count: 32,
        viewed: true
      },
      {
        id: "3",
        media_url: "https://images.unsplash.com/photo-1613612628319-b9fa26d45d52?w=500&q=80",
        timestamp: "2023-05-13T09:30:00Z",
        likes_count: 41,
        viewed: true
      },
      {
        id: "4",
        media_url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80",
        timestamp: "2023-05-12T16:45:00Z",
        likes_count: 25,
        viewed: true
      },
      {
        id: "5",
        media_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
        timestamp: "2023-05-11T11:20:00Z",
        likes_count: 38,
        viewed: true
      },
      {
        id: "6",
        media_url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500&q=80",
        timestamp: "2023-05-10T19:30:00Z",
        likes_count: 29,
        viewed: true
      }
    ];
    
    setStories(mockStories);
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
            Instagram Stories
            <Badge variant="outline" className="ml-2 text-xs font-normal">
              {stories.length} stories
            </Badge>
          </h1>
          <p className="text-muted-foreground">Viewing stories for @{account.username}</p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stories.map(story => (
            <Card 
              key={story.id} 
              className={`overflow-hidden group cursor-pointer ${story.viewed ? 'opacity-75' : ''}`}
              onMouseEnter={() => setHoveredStoryId(story.id)}
              onMouseLeave={() => setHoveredStoryId(null)}
            >
              <CardContent className="p-0 relative">
                <AspectRatio ratio={9/16} className="max-h-80">
                  <img 
                    src={story.media_url} 
                    alt="Story" 
                    className="object-cover h-full w-full"
                  />
                  
                  {/* Hover Overlay */}
                  <div 
                    className={cn(
                      "absolute inset-0 bg-black/60 flex flex-col justify-center items-center transition-opacity duration-200", 
                      hoveredStoryId === story.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="flex flex-col items-center text-white">
                      <Heart className="h-6 w-6 mb-1" />
                      <span>{story.likes_count}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white text-xs mt-4">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(story.timestamp), 'MMM d, yyyy')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-white text-xs mt-2">
                      <Eye className="h-3 w-3" />
                      <span>{story.viewed ? 'Viewed' : 'New'}</span>
                    </div>
                  </div>
                  
                  {/* Always visible elements */}
                  <div className="absolute top-2 left-2 ring-2 ring-primary ring-offset-1 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={account.profile_picture_url} alt={account.username} />
                      <AvatarFallback>{account.username[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {!story.viewed && (
                    <div className="absolute top-2 right-2 bg-primary px-2 py-1 rounded-full text-white text-[10px]">
                      New
                    </div>
                  )}
                </AspectRatio>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* List Layout */}
      {layout === 'list' && (
        <div className="space-y-6">
          {stories.map(story => (
            <Card key={story.id} className={story.viewed ? 'opacity-80' : ''}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 lg:w-1/5">
                  <AspectRatio ratio={9/16} className="max-h-60">
                    <img 
                      src={story.media_url} 
                      alt="Story" 
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
                      <div className="flex items-center gap-2">
                        <p className="font-medium">@{account.username}</p>
                        {!story.viewed && (
                          <Badge variant="default" size="sm" className="text-[10px]">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(story.timestamp), 'MMM d, yyyy • h:mm a')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-1 text-sm">
                      <Heart className="h-4 w-4" />
                      <span>{story.likes_count} likes</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Eye className="h-4 w-4" />
                      <span>{story.viewed ? 'Viewed' : 'Not viewed'}</span>
                    </div>
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

export default InstagramStoriesPage;
