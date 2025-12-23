import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Local image assets
const SAMPLE_CLIP_BG = "/clips-images/clip-bg-1.png";
const SAMPLE_AVATAR = "/clips-images/avatar-1.png";
const SAMPLE_SHOW_THUMB = "/clips-images/show-thumb-1.png";
const SAMPLE_USER_PROFILE = "/clips-images/user-profile-1.png";

interface VideoPlayerProps {
  progress?: number;
  className?: string;
}

function VideoPlayer({ progress = 0, className }: VideoPlayerProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={cn("relative h-0.5 bg-white/20 overflow-hidden", className)}
    >
      <div
        className="absolute left-0 top-0 h-full bg-(--fg-quarterary) rounded-r-full transition-[width] duration-300"
        style={{ width: `${clampedProgress}%` }}
        aria-label={`Video progress: ${clampedProgress}%`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}

interface ClipCardProps {
  imageUrl: string;
  avatarUrl: string;
  showThumbnail: string;
  title: string;
  subtitle: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  progress?: number;
}

function ClipCard({
  imageUrl,
  avatarUrl,
  showThumbnail,
  title,
  subtitle,
  likesCount: initialLikes,
  commentsCount,
  sharesCount,
  progress = 1.5,
}: ClipCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [imageError, setImageError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [showThumbError, setShowThumbError] = useState(false);

  const formatCount = (count: number): string => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="flex gap-5 items-end">
      {/* Main Video Card */}
      <div className="relative w-full max-w-[443px] aspect-[443/787] rounded-xl overflow-hidden shadow-[4px_4px_20px_4px_rgba(0,0,0,0.12)]">
        <img
          src={imageUrl}
          alt={title}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {imageError && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <p className="text-gray-400">Failed to load video</p>
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] flex flex-col gap-2 items-start justify-end px-2 py-4"
          style={{
            background:
              "linear-gradient(195.563deg, rgba(0, 0, 0, 0) 14.678%, rgba(0, 0, 0, 0.7) 97.156%)",
          }}
        >
          <div className="relative w-48 h-11 mb-2">
            <div className="absolute left-2 top-2 w-8 h-8 rounded-full shadow-[0px_1px_2px_0px_rgba(0,0,0,0.3)]">
              {!avatarError ? (
                <img
                  src={avatarUrl}
                  alt="User avatar"
                  onError={() => setAvatarError(true)}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-600" />
              )}
              <div className="absolute inset-0 border-[0.5px] border-black/8 rounded-full" />
            </div>

            <div className="absolute left-[52px] top-2 bg-white rounded-[20px] px-2.5 pb-2.5 pt-1 shadow-sm">
              <p className="text-sm leading-5 text-[#101828]">
                Looks interesting!
              </p>
            </div>
          </div>

          <div className="flex gap-2 items-center px-2 w-full">
            <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gray-700">
              {!showThumbError ? (
                <img
                  src={showThumbnail}
                  alt="Show thumbnail"
                  onError={() => setShowThumbError(true)}
                  className="w-full h-full rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gray-600" />
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-xl leading-8 font-bold text-foreground truncate text-shadow-sm">
                {title}
              </h3>
              <p className="text-base leading-6 text-(--colors-gray-dark-mode-300) truncate text-shadow-sm">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Video Progress Slider */}
        <VideoPlayer
          progress={progress}
          className="absolute bottom-0 left-1 right-1"
        />
      </div>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={handleLike}
          className="flex flex-col gap-1.5 items-center opacity-90 hover:opacity-100 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg transition-opacity"
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
        >
          <div className="w-12 h-12 rounded-full bg-white/12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Heart
              className={cn(
                "w-6 h-6 transition-colors",
                isLiked ? "fill-red-500 text-red-500" : "fill-white text-white"
              )}
            />
          </div>
          <span className="text-sm leading-5 text-foreground text-center text-shadow-sm">
            {formatCount(likesCount)}
          </span>
        </button>

        <button
          className="flex flex-col gap-1.5 items-center opacity-90 hover:opacity-100 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg transition-opacity"
          aria-label="Comments"
        >
          <div className="w-12 h-12 rounded-full bg-white/12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm leading-5 text-foreground text-center text-shadow-sm">
            {formatCount(commentsCount)}
          </span>
        </button>

        <button
          className="flex flex-col gap-1.5 items-center opacity-90 hover:opacity-100 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg transition-opacity"
          aria-label="Share"
        >
          <div className="w-12 h-12 rounded-full bg-white/12 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Share2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm leading-5 text-foreground text-center text-shadow-sm">
            {formatCount(sharesCount)}
          </span>
        </button>

        <div className="flex flex-col items-center overflow-hidden pb-3">
          <div className="w-12 h-12 -mb-3">
            <img
              src={SAMPLE_USER_PROFILE}
              alt="User profile"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClipsPage() {
  const [activeTab, setActiveTab] = useState<"following" | "forYou">(
    "following"
  );

  const handleTabChange = (tab: "following" | "forYou") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="flex flex-col items-start gap-4 px-4 py-6 md:pl-20 md:pr-4">
        <div
          className="flex items-center gap-1 border-b border-(--border-secondary) w-full max-w-[443px]"
          role="tablist"
          aria-label="Clips navigation"
        >
          <button
            className="flex-1 h-10 px-3 py-1.5 flex items-center justify-center gap-1.5 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-t-lg"
            onClick={() => handleTabChange("following")}
            onKeyDown={(e) => e.key === "Enter" && handleTabChange("following")}
            role="tab"
            aria-selected={activeTab === "following"}
            aria-controls="clips-panel"
          >
            <span
              className={cn(
                "text-sm leading-5",
                activeTab === "following"
                  ? "font-bold text-foreground"
                  : "text-(--text-quarterary)"
              )}
            >
              Following
            </span>
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-(--fg-brand-primary) rounded-full" />
            )}
          </button>

          <button
            className="flex-1 h-10 px-3 py-1.5 flex items-center justify-center gap-1.5 rounded-3xl hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
            onClick={() => handleTabChange("forYou")}
            onKeyDown={(e) => e.key === "Enter" && handleTabChange("forYou")}
            role="tab"
            aria-selected={activeTab === "forYou"}
            aria-controls="clips-panel"
          >
            <span
              className={cn(
                "text-sm leading-5",
                activeTab === "forYou"
                  ? "font-bold text-foreground"
                  : "text-(--text-quarterary)"
              )}
            >
              For You
            </span>
          </button>
        </div>

        <div
          className="flex flex-col gap-5"
          role="tabpanel"
          id="clips-panel"
          aria-labelledby={
            activeTab === "following" ? "following-tab" : "forYou-tab"
          }
        >
          <ClipCard
            imageUrl={SAMPLE_CLIP_BG}
            avatarUrl={SAMPLE_AVATAR}
            showThumbnail={SAMPLE_SHOW_THUMB}
            title="sword art online"
            subtitle="The World of Swords"
            likesCount={328700}
            commentsCount={328700}
            sharesCount={328700}
            progress={1.5}
          />
        </div>
      </div>
    </div>
  );
}
