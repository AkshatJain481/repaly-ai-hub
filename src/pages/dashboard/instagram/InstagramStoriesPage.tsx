
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAccountStore } from "@/stores/accountStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";

const InstagramStoriesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { accounts, selectedAccountId, selectAccount, stories, setStories } = useAccountStore();

  const account = accounts.find(acc => acc.id === id);

  useEffect(() => {
    if (id && id !== selectedAccountId) {
      selectAccount(id);
    }
    
    // Mock fetch stories for the selected account
    const mockStories = [
      {
        id: "1",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=500&q=80",
        viewed: false,
        date: "2023-05-15"
      },
      {
        id: "2",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1622810676126-5143e6fe9915?w=500&q=80",
        viewed: true,
        date: "2023-05-14"
      },
      {
        id: "3",
        accountId: id || "",
        imageUrl: "https://images.unsplash.com/photo-1613612628319-b9fa26d45d52?w=500&q=80",
        viewed: true,
        date: "2023-05-13"
      },
    ];
    
    setStories(mockStories);
  }, [id, selectedAccountId, selectAccount, setStories]);

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
          <h1 className="text-3xl font-bold">Instagram Stories</h1>
          <p className="text-muted-foreground">Viewing stories for @{account.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stories.map(story => (
          <Card key={story.id} className={`overflow-hidden ${story.viewed ? 'opacity-75' : ''}`}>
            <CardContent className="p-0 relative">
              <AspectRatio ratio={9/16} className="max-h-80">
                <img 
                  src={story.imageUrl} 
                  alt="Story" 
                  className="object-cover h-full w-full"
                />
              </AspectRatio>
              <div className="absolute top-2 left-2 ring-2 ring-primary ring-offset-1 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={account.profilePic} alt={account.username} />
                  <AvatarFallback>{account.username[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 p-2 rounded text-white text-xs">
                {story.date}
                {!story.viewed && <span className="ml-2 bg-primary px-1.5 py-0.5 rounded-full text-[10px]">New</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InstagramStoriesPage;
