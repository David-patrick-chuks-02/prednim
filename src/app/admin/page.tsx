"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Edit2, Save, X } from "lucide-react";

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

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState<string>("");
  const [editStatus, setEditStatus] = useState<string>("");
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

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
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/dashboard"
              className="text-accent text-sm font-semibold hover:text-accent/80 transition mb-6 inline-block"
            >
              ← Back to Library
            </Link>
            <h1 className="font-display text-4xl font-bold text-ink">Admin Dashboard</h1>
            <p className="text-muted mt-2">Manage users and their subscriptions</p>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "error"
                  ? "bg-red-500/10 border border-red-500/20 text-red-600"
                  : "bg-green-500/10 border border-green-500/20 text-green-600"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Users Table */}
          <div className="rounded-lg border border-line overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-line bg-surface">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Period End</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-ink">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-line/30 hover:bg-surface/50">
                    <td className="px-6 py-4 text-sm text-muted">{u.email}</td>
                    <td className="px-6 py-4 text-sm text-muted">{u.name}</td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === u.id ? (
                        <select
                          value={editPlan}
                          onChange={(e) => setEditPlan(e.target.value)}
                          className="px-3 py-2 rounded bg-background border border-line text-ink text-sm"
                        >
                          <option value="free">Free</option>
                          <option value="monthly">Monthly</option>
                          <option value="sixmonth">6 Months</option>
                          <option value="annual">Annual</option>
                        </select>
                      ) : (
                        <span className="text-ink font-medium">
                          {u.subscription?.plan_type || "free"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === u.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="px-3 py-2 rounded bg-background border border-line text-ink text-sm"
                        >
                          <option value="active">Active</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="past_due">Past Due</option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            u.subscription?.status === "active"
                              ? "bg-green-500/20 text-green-600"
                              : u.subscription?.status === "cancelled"
                                ? "bg-red-500/20 text-red-600"
                                : "bg-yellow-500/20 text-yellow-600"
                          }`}
                        >
                          {u.subscription?.status || "N/A"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {u.subscription?.current_period_end
                        ? new Date(u.subscription.current_period_end).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingId === u.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleSave(u.id)}
                            className="p-2 hover:bg-green-500/20 rounded transition text-green-600"
                            title="Save"
                          >
                            <Save size={16} />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-2 hover:bg-red-500/20 rounded transition text-red-600"
                            title="Cancel"
                          >
                            <X size={16} />
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
                          className="p-2 hover:bg-accent/20 rounded transition text-accent"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted">No users found</p>
            </div>
          )}

          <div className="mt-6 text-sm text-muted">
            Total users: <span className="font-semibold text-ink">{users.length}</span>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
