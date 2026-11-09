"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Edit2, Save, X, Users, Zap, CheckCircle, AlertCircle } from "lucide-react";

interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  subscription: {
    id: number;
    plan_type: string;
    status: string;
    current_period_end: string;
  } | null;
}

const PLAN_COLORS = {
  free: { bg: "bg-slate-500/10", text: "text-slate-600", badge: "bg-slate-100 text-slate-700" },
  monthly: { bg: "bg-blue-500/10", text: "text-blue-600", badge: "bg-blue-100 text-blue-700" },
  sixmonth: { bg: "bg-purple-500/10", text: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
  annual: { bg: "bg-amber-500/10", text: "text-amber-600", badge: "bg-amber-100 text-amber-700" },
};

const STATUS_COLORS = {
  active: { bg: "bg-green-500/10", text: "text-green-600", icon: CheckCircle },
  cancelled: { bg: "bg-red-500/10", text: "text-red-600", icon: AlertCircle },
  past_due: { bg: "bg-yellow-500/10", text: "text-yellow-600", icon: AlertCircle },
};

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"users" | "refunds">("users");
  const [users, setUsers] = useState<User[]>([]);
  const [refunds, setRefunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    fetchUsers();
  }, [user, loading, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/create-subscription", {
        method: "GET",
      });

      if (!response.ok) {
        if (response.status === 403) {
          setMessage({ type: "error", text: "You don't have admin access" });
          router.push("/dashboard");
          return;
        }
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to load users",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (userId: string, plan: string, status: string) => {
    setEditingId(userId);
    setEditPlan(plan);
    setEditStatus(status);
  };

  const handleSave = async (userId: string) => {
    try {
      const response = await fetch("/api/admin/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          plan_type: editPlan,
          status: editStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update subscription");
      }

      setMessage({ type: "success", text: "Subscription updated successfully" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to update subscription",
      });
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter((u) => u.subscription?.status === "active").length,
    premium: users.filter(
      (u) => u.subscription && u.subscription.plan_type !== "free"
    ).length,
  };

  if (loading || isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted">Loading...</div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/dashboard"
              className="text-accent text-sm font-semibold hover:text-accent/80 transition mb-6 inline-block"
            >
              ← Back to Library
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-5xl font-bold text-ink">Admin Control</h1>
              <p className="text-muted text-lg">Manage users and subscription status across the platform</p>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-8 p-4 rounded-xl backdrop-blur ${
                message.type === "error"
                  ? "bg-red-500/10 border border-red-500/20 text-red-600"
                  : "bg-green-500/10 border border-green-500/20 text-green-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm mb-1">Total Users</p>
                  <p className="font-display text-4xl font-bold text-ink">{stats.total}</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-500/10">
                  <Users className="text-slate-600" size={24} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm mb-1">Active Subscriptions</p>
                  <p className="font-display text-4xl font-bold text-ink">{stats.active}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line bg-card/50 backdrop-blur p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm mb-1">Premium Plans</p>
                  <p className="font-display text-4xl font-bold text-ink">{stats.premium}</p>
                </div>
                <div className="p-3 rounded-lg bg-amber-500/10">
                  <Zap className="text-amber-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search by email or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-line bg-background text-ink placeholder-muted focus:outline-none focus:border-accent transition"
            />
          </div>

          {/* Users Table */}
          <div className="rounded-xl border border-line overflow-hidden bg-card/50 backdrop-blur">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-line bg-surface/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Plan</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Expires</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/30">
                  {filteredUsers.map((u) => {
                    const planColor = PLAN_COLORS[u.subscription?.plan_type as keyof typeof PLAN_COLORS] || PLAN_COLORS.free;
                    const statusConfig = STATUS_COLORS[u.subscription?.status as keyof typeof STATUS_COLORS];
                    const StatusIcon = statusConfig?.icon;
                    return (
                      <tr key={u.id} className="hover:bg-surface/30 transition">
                        <td className="px-6 py-4 text-sm text-ink font-medium">{u.email}</td>
                        <td className="px-6 py-4 text-sm text-muted">{u.name}</td>
                        <td className="px-6 py-4">
                          {editingId === u.id ? (
                            <select
                              value={editPlan}
                              onChange={(e) => setEditPlan(e.target.value)}
                              className="px-3 py-2 rounded-lg bg-background border border-line text-ink text-sm font-medium focus:outline-none focus:border-accent"
                            >
                              <option value="free">Free</option>
                              <option value="monthly">Monthly</option>
                              <option value="sixmonth">6 Months</option>
                              <option value="annual">Annual</option>
                            </select>
                          ) : (
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${planColor.badge}`}>
                              {u.subscription?.plan_type || "free"}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === u.id ? (
                            <select
                              value={editStatus}
                              onChange={(e) => setEditStatus(e.target.value)}
                              className="px-3 py-2 rounded-lg bg-background border border-line text-ink text-sm font-medium focus:outline-none focus:border-accent"
                            >
                              <option value="active">Active</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="past_due">Past Due</option>
                            </select>
                          ) : (
                            <div className="flex items-center gap-2">
                              {statusConfig && StatusIcon && <StatusIcon size={16} className={statusConfig.text} />}
                              <span className={`text-xs font-bold capitalize ${statusConfig?.text || "text-muted"}`}>
                                {u.subscription?.status || "N/A"}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted">
                          {u.subscription?.current_period_end
                            ? new Date(u.subscription.current_period_end).toLocaleDateString()
                            : "—"}
                        </td>
                        <td className="px-6 py-4">
                          {editingId === u.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSave(u.id)}
                                className="p-2 hover:bg-green-500/20 rounded-lg transition text-green-600"
                                title="Save"
                              >
                                <Save size={18} />
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-600"
                                title="Cancel"
                              >
                                <X size={18} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                handleEdit(
                                  u.id,
                                  u.subscription?.plan_type || "free",
                                  u.subscription?.status || "active"
                                )
                              }
                              className="p-2 hover:bg-accent/20 rounded-lg transition text-accent font-semibold"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && !isLoading && (
            <div className="text-center py-20">
              <Users size={48} className="text-muted/30 mx-auto mb-4" />
              <p className="text-muted text-lg">
                {searchTerm ? "No users match your search" : "No users found"}
              </p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
