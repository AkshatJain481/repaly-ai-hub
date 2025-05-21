
import { getFormattedDate } from "@/utils/commonFunctions";
import { PlatformAccount } from "@/utils/interfaces";
import { getOAuthLink } from "@/apis/oauthLink";
import { useNavigate } from "react-router-dom";
import { socialMediaPlatforms } from "@/utils/constants";
import { setActiveAccount } from "@/redux/slices/user.slice";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Check, Users } from "lucide-react";
import ConfirmationPopup from "@/components/common/ConfirmationPopup";
import { useState } from "react";
import { useDeleteInstagramAccountMutation } from "@/apis/instagram";
import { useLazyGetUserAccountsQuery } from "@/apis/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountManager = () => {
  const userAccounts = useSelector(
    (state: RootState) => state.user.userAccounts
  );
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const [deleteAccount, { isLoading: isDeleteAccountLoading }] =
    useDeleteInstagramAccountMutation();

  const [triggerGetAccounts, { isLoading: isGetAccountsLoading }] =
    useLazyGetUserAccountsQuery();

  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [accountIndex, setAccountIndex] = useState<number | null>(null);
  
  const OpenConfirmationPopup = (accountIndex: number) => {
    setIsOpen(true);
    setAccountIndex(accountIndex);
  };
  
  const ClosePopup = () => {
    setIsOpen(false);
    setAccountIndex(null);
  };
  
  const DeleteAccount = async () => {
    if (accountIndex === null) return;
    try {
      await deleteAccount(userAccounts[accountIndex].id);
      await triggerGetAccounts();
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      ClosePopup();
    }
  };

  const handleAddAccount = (platformName: string) => {
    window.location.href = getOAuthLink(platformName.toLocaleLowerCase());
  };

  const handleSelectAccount = (account: PlatformAccount) => {
    dispatch(setActiveAccount(account));
  };

  const renderSocialMediaIcons = () => {
    return (
      <>
        {socialMediaPlatforms.map((platform) => (
          <div key={platform.name} className="flex-shrink-0">
            <div
              onClick={() =>
                platform.name === "Instagram" && handleAddAccount(platform.name)
              }
              className={`w-[60px] h-[60px] rounded-lg flex flex-col items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 p-3`}
              style={{
                backgroundColor: `rgba(${parseInt(platform.color.slice(1, 3), 16)}, ${parseInt(platform.color.slice(3, 5), 16)}, ${parseInt(platform.color.slice(5, 7), 16)}, 0.1)`,
                borderColor: platform.color
              }}
            >
              <div
                className={`text-3xl mb-1`}
                style={{ 
                  color: platform.color,
                  filter: platform.name === "Instagram" ? "none" : "blur(4px)"
                }}
              >
                {platform.icon && <platform.icon />}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  if (!userAccounts.length) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4 flex-col">
        <div className="p-8 rounded-xl bg-white border border-gray-200 shadow-sm transition-all duration-300">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-[#c9c1f9] opacity-20 flex items-center justify-center">
            <Users size="5rem" className="text-[#9b87f5] opacity-80" />
          </div>
          <h2 className="text-lg font-bold text-center mb-2">
            Connect your accounts
          </h2>
          <p className="text-center mb-8 text-gray-600">
            Link your social media accounts to start automating your content and
            engagement.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            {renderSocialMediaIcons()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 px-4 overflow-auto max-h-[90vh]">
      <ConfirmationPopup
        loading={isDeleteAccountLoading || isGetAccountsLoading}
        isOpen={isOpen}
        onClose={ClosePopup}
        message="Are you sure you want to delete your account?"
        onConfirm={DeleteAccount}
      />
      <div className="mb-8 p-6 rounded-lg bg-white shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-5 justify-center">
          {renderSocialMediaIcons()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userAccounts.map((account: PlatformAccount, index: number) => {
          const platform = socialMediaPlatforms.find(
            (p) =>
              p?.name?.toLowerCase() === account?.platformName?.toLowerCase()
          );
          return (
            <Card
              key={`${account.platformName}-${account.id}`}
              className={`relative overflow-hidden bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px] cursor-pointer mb-4 h-full ${
                activeAccount?.id === account.id ? `border-[${platform?.color}]` : 'border-gray-200'
              }`}
              onClick={() => {
                handleSelectAccount(account);
                setTimeout(() => {
                  navigate("/dashboard/instagram/media");
                }, 500);
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-[10px]"
                style={{ backgroundColor: platform?.color || "#9b87f5" }}
              />

              <div className="absolute top-4 left-4 flex gap-2">
                {platform && (
                  <>
                    <platform.icon style={{ color: platform.color }} className="h-5 w-5" />
                    <span style={{ color: platform.color }} className="font-bold">
                      {platform?.name}
                    </span>
                  </>
                )}
              </div>

              {activeAccount?.id === account.id && (
                <div className="absolute flex justify-center items-center top-4 right-4 bg-blue-500 rounded-full p-1.5 h-6 w-6 shadow-md z-10">
                  <Check className="text-white h-3 w-3" />
                </div>
              )}

              <CardContent className="pt-16 px-6 pb-3">
                <div className="flex flex-col gap-3 items-center">
                  <div className="relative mt-6 mx-auto w-24 h-24 rounded-full border-3 border-white bg-white shadow-md overflow-hidden">
                    <Avatar className="w-full h-full">
                      <AvatarFallback>{account?.name}</AvatarFallback>
                      <AvatarImage src={account?.profile_picture_url} alt={account?.name} />
                    </Avatar>
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-md font-semibold line-clamp-1 mb-1">
                      {account.name || account.username}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 italic">
                      @{account.username}
                    </p>
                  </div>

                  <Separator />

                  <div className="w-full flex justify-between">
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Posts:</span>
                        <span>{account.media_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Updated:</span>
                        <span>{getFormattedDate(account.updated_time)}</span>
                      </div>
                    </div>
                    <div onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="ghost" 
                        className="p-1 h-auto text-red-500 hover:text-red-700"
                        onClick={() => OpenConfirmationPopup(index)}
                      >
                        <Trash2 size={26} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AccountManager;
