
import { useSelector } from "react-redux";
import { Link } from "react-router";
function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
 if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[70vh] bg-stone-50">
        <p className="text-gray-500 text-lg">You are not signed in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Top Banner */}
          <div className="h-24 w-full bg-teal-200/40" />

          {/* Avatar + Content */}
          <div className="flex flex-col items-center -mt-12 pb-10 px-6 sm:px-10">

            {/* Avatar */}
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md ring-4 ring-white bg-teal-400">
              {user.name[0].toUpperCase()}
            </div>

            {/* Name */}
            <h1 className="mt-4 text-2xl font-semibold text-neutral-800 tracking-tight">
              {user.name}
            </h1>

            {/* Role Badge */}
            <span className="mt-2 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-200/60 text-teal-700">
              {user.role}
            </span>
             
            {/* Divider */}
            <div className="w-full mt-8 mb-6 h-px bg-gray-200" />

            {/* Info Rows */}
            <div className="w-full space-y-3">
              {[
                { label: "Name", value: user.name },
                { label: "Email", value: user.emailId || "N/A" },
                { label: "Role", value: user.role },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-stone-50"
                >
                  <span className="text-sm font-medium text-gray-500">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-neutral-800">
                    {item.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-stone-50">
                <span className="text-sm font-medium text-gray-500">
                  Bookmarks
                </span>
                <Link
                  to="/bookmarks"
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700 hover:underline transition-colors duration-200"
                >
                  View Bookmarks →
                </Link>
              </div>
            </div>

            {/* Bottom Tagline */}
            <p className="mt-8 text-xs tracking-widest uppercase text-teal-500">
              🌿 Skincare · Wellness · Glow
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;