import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { getDashboardStats } from "../../api/authenicationApi";
import { FileText, Heart, MessageCircle, Users, Bookmark } from "lucide-react";

export default function DashBoard() {
  const [stats, setStats] = useState({
    blogsCount: 0,
    totalLikesCount: 0,
    totalCommentsCount: 0,
    totalUsersCount: 0,
    totalBookmarksCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardState() {
      try {
        const response = await getDashboardStats();
        setStats(response.data.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardState();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white">
        <p className="text-slate-400 text-base font-medium tracking-widest uppercase animate-pulse">
          Loading dashboard…
        </p>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Blogs",
      value: stats.blogsCount,
      icon: <FileText className="w-5 h-5" />,
      accent: "text-sky-400",
      ring: "ring-sky-500/20",
      glow: "shadow-sky-500/10",
      bar: "bg-sky-500",
      bg: "bg-sky-500/10",
    },
    {
      title: "Total Likes",
      value: stats.totalLikesCount,
      icon: <Heart className="w-5 h-5" />,
      accent: "text-rose-400",
      ring: "ring-rose-500/20",
      glow: "shadow-rose-500/10",
      bar: "bg-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      title: "Total Comments",
      value: stats.totalCommentsCount,
      icon: <MessageCircle className="w-5 h-5" />,
      accent: "text-amber-400",
      ring: "ring-amber-500/20",
      glow: "shadow-amber-500/10",
      bar: "bg-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Total Users",
      value: stats.totalUsersCount,
      icon: <Users className="w-5 h-5" />,
      accent: "text-emerald-400",
      ring: "ring-emerald-500/20",
      glow: "shadow-emerald-500/10",
      bar: "bg-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Total Bookmarks",
      value: stats.totalBookmarksCount,
      icon: <Bookmark className="w-5 h-5" />,
      accent: "text-violet-400",
      ring: "ring-violet-500/20",
      glow: "shadow-violet-500/10",
      bar: "bg-violet-500",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-1">
          Overview
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`
              relative overflow-hidden
              bg-white border border-slate-200
              rounded-2xl p-5
              ring-1 ${card.ring}
              shadow-lg ${card.glow}
              hover:border-slate-300 hover:-translate-y-1
              transition-all duration-300 ease-out
              group
            `}
          >
            {/* Top row: icon + title */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`
                  flex-shrink-0 flex items-center justify-center
                  w-9 h-9 rounded-xl
                  ${card.bg} ${card.accent}
                `}
              >
                {card.icon}
              </div>
              <p className="text-sm font-medium text-slate-400 leading-tight">
                {card.title}
              </p>
            </div>

            {/* Value */}
            <p className="text-3xl font-bold text-slate-800 tabular-nums leading-none mb-4">
              <CountUp end={card.value} duration={1.5} separator="," />
            </p>

            {/* Bottom accent bar */}
            <div className="h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full w-1/2 ${card.bar} rounded-full opacity-60 group-hover:w-full transition-all duration-500`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}