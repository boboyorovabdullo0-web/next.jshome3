"use client";

import { useState, useEffect } from "react";
import { useGetUsersQuery, useGetUserTodosQuery } from "@/src/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { cn } from "@/src/lib/utils";
import {
  Users, TrendingUp, DollarSign, CheckSquare,
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Circle, CheckCircle2, Clock, Star, Zap,
  Activity, BarChart2, PieChart
} from "lucide-react";
import Link from "next/link";

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
const sparkData = [40, 65, 45, 70, 55, 80, 60, 90, 75, 95, 70, 88];

function SparkBar({ value, max }: { value: number; max: number }) {
  return (
    <div
      className="w-2 rounded-t-sm transition-all duration-500"
      style={{
        height: `${(value / max) * 48}px`,
        background: "linear-gradient(to top, #6366f1, #a78bfa)",
      }}
    />
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  gradient: string;
  delay?: string;
}

function StatCard({ title, value, change, positive, icon, gradient, delay = "0ms" }: StatCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
      style={{ animationDelay: delay }}
    >
      {/* Gradient accent top-right */}
      <div className={cn("absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-10 blur-xl transition-opacity group-hover:opacity-20", gradient)} />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">{value}</p>
          <div className={cn("mt-2 flex items-center gap-1 text-xs font-semibold", positive ? "text-emerald-500" : "text-red-500")}>
            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{change} vs last month</span>
          </div>
        </div>
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg", gradient)}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ─── Activity item ────────────────────────────────────────────────────────────
const activities = [
  { id: 1, icon: <Users size={14} />, color: "bg-indigo-500", text: "New client Emily Davis added", time: "2 min ago" },
  { id: 2, icon: <DollarSign size={14} />, color: "bg-emerald-500", text: "Invoice #4521 paid — $2,400", time: "18 min ago" },
  { id: 3, icon: <CheckSquare size={14} />, color: "bg-amber-500", text: "Task 'Q2 Proposal' completed", time: "1h ago" },
  { id: 4, icon: <Star size={14} />, color: "bg-pink-500", text: "Client James Wilson left a review ⭐⭐⭐⭐⭐", time: "3h ago" },
  { id: 5, icon: <Zap size={14} />, color: "bg-violet-500", text: "Automated report generated", time: "5h ago" },
  { id: 6, icon: <Activity size={14} />, color: "bg-cyan-500", text: "System health check — All OK", time: "8h ago" },
];

// ─── Revenue Chart (CSS-based) ────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 42, clients: 28 },
  { month: "Feb", revenue: 58, clients: 35 },
  { month: "Mar", revenue: 51, clients: 30 },
  { month: "Apr", revenue: 74, clients: 48 },
  { month: "May", revenue: 63, clients: 42 },
  { month: "Jun", revenue: 88, clients: 61 },
  { month: "Jul", revenue: 75, clients: 54 },
  { month: "Aug", revenue: 95, clients: 70 },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: usersData, isLoading } = useGetUsersQuery({ limit: 5 });
  const { data: todosData } = useGetUserTodosQuery(1);
  const [todos, setTodos] = useState<{ id: number; todo: string; completed: boolean }[]>([]);
  const [greeting, setGreeting] = useState("Good morning");
  const [now, setNow] = useState("");

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 12 && h < 17) setGreeting("Good afternoon");
    else if (h >= 17) setGreeting("Good evening");
    const d = new Date();
    setNow(d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  }, []);

  useEffect(() => {
    if (todosData?.todos) setTodos(todosData.todos.slice(0, 6));
  }, [todosData]);

  const toggleTodo = (id: number) =>
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const stats = [
    {
      title: "Total Clients",
      value: usersData?.total ? usersData.total.toLocaleString() : "—",
      change: "+12.5%",
      positive: true,
      icon: <Users size={22} />,
      gradient: "bg-gradient-to-br from-indigo-500 to-violet-600",
    },
    {
      title: "Active Clients",
      value: usersData?.total ? Math.floor(usersData.total * 0.72).toString() : "—",
      change: "+8.2%",
      positive: true,
      icon: <Activity size={22} />,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      title: "Revenue",
      value: "$48,295",
      change: "+23.1%",
      positive: true,
      icon: <DollarSign size={22} />,
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      title: "Open Tasks",
      value: todosData?.total ? String(todosData.total) : "—",
      change: "-4.3%",
      positive: false,
      icon: <CheckSquare size={22} />,
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="space-y-8 pb-10">

      {/* ── Welcome Banner ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-xl">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-indigo-200">{now}</p>
            <h1 className="mt-1 text-3xl font-bold">{greeting}, Admin 👋</h1>
            <p className="mt-1 text-indigo-200 text-sm max-w-md">
              Here's what's happening with your CRM today. You have
              <span className="text-white font-semibold"> 3 new clients</span> and
              <span className="text-white font-semibold"> 5 tasks</span> pending.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="./clients"
              className="rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur px-5 py-2.5 text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              View Clients
            </Link>
            <button className="rounded-xl bg-white text-indigo-700 px-5 py-2.5 text-sm font-semibold hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-lg">
              + Add Client
            </button>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <StatCard key={s.title} {...s} delay={`${i * 60}ms`} />
        ))}
      </div>

      {/* ── Main Grid ──────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Revenue Chart – 2/3 width */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-base font-semibold text-foreground">Revenue Overview</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Monthly revenue vs client growth</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500 inline-block" />Revenue</span>
              <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />Clients</span>
            </div>
          </CardHeader>
          <CardContent>
            {/* Chart */}
            <div className="flex items-end justify-between gap-1 h-36 px-1 mt-2">
              {revenueData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="w-full flex items-end justify-center gap-0.5 h-28">
                    <div
                      className="w-1/2 rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                      style={{
                        height: `${(d.revenue / 95) * 100}%`,
                        background: "linear-gradient(to top, #6366f1, #a78bfa)",
                      }}
                    />
                    <div
                      className="w-1/2 rounded-t-sm transition-all duration-500 group-hover:opacity-80"
                      style={{
                        height: `${(d.clients / 70) * 100}%`,
                        background: "linear-gradient(to top, #10b981, #6ee7b7)",
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
            {/* Totals row */}
            <div className="mt-4 grid grid-cols-3 divide-x divide-border border-t border-border pt-4">
              {[
                { label: "Total Revenue", value: "$286K" },
                { label: "Avg. per Month", value: "$35.7K" },
                { label: "Growth Rate", value: "+23.1%" },
              ].map((item) => (
                <div key={item.label} className="px-4 first:pl-0 last:pr-0">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="mt-0.5 text-lg font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats Donut – 1/3 width */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Client Distribution</CardTitle>
            <p className="text-xs text-muted-foreground">By status breakdown</p>
          </CardHeader>
          <CardContent>
            {/* Fake donut */}
            <div className="flex items-center justify-center py-4">
              <div className="relative h-32 w-32">
                <svg viewBox="0 0 36 36" className="h-32 w-32 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-muted/30" />
                  <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"
                    stroke="url(#g1)" strokeDasharray="72 28" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"
                    stroke="url(#g2)" strokeDasharray="18 82" strokeDashoffset="-72" strokeLinecap="round" />
                  <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3"
                    stroke="url(#g3)" strokeDasharray="10 90" strokeDashoffset="-90" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                    <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#fcd34d" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-foreground">72%</span>
                  <span className="text-[10px] text-muted-foreground">Active</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 mt-1">
              {[
                { label: "Active", pct: "72%", color: "bg-indigo-500" },
                { label: "Inactive", pct: "18%", color: "bg-emerald-400" },
                { label: "Pending", pct: "10%", color: "bg-amber-400" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="font-semibold text-foreground">{item.pct}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Bottom Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Clients – 2/3 */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-semibold">Recent Clients</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Latest registered users</p>
            </div>
            <Link
              href="./clients"
              className="text-xs font-medium text-primary hover:underline underline-offset-2"
            >
              View all →
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Company</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Role</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="border-b border-border">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
                              <div className="space-y-1.5">
                                <div className="h-3 w-28 bg-muted animate-pulse rounded" />
                                <div className="h-2.5 w-20 bg-muted animate-pulse rounded" />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell"><div className="h-3 w-24 bg-muted animate-pulse rounded" /></td>
                          <td className="px-4 py-4 hidden lg:table-cell"><div className="h-3 w-16 bg-muted animate-pulse rounded" /></td>
                          <td className="px-4 py-4 text-right"><div className="h-5 w-14 bg-muted animate-pulse rounded-full ml-auto" /></td>
                        </tr>
                      ))
                    : usersData?.users.map((user) => (
                        <tr key={user.id} className="border-b border-border hover:bg-muted/30 transition-colors group">
                          <td className="px-6 py-4">
                            <Link href={`./clients/${user.id}`} className="flex items-center gap-3">
                              <img
                                src={user.image}
                                alt={user.firstName}
                                className="h-9 w-9 rounded-full border border-border object-cover"
                              />
                              <div>
                                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                  {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <p className="text-foreground/80 truncate max-w-[160px]">{user.company.name}</p>
                            <p className="text-xs text-muted-foreground">{user.company.department}</p>
                          </td>
                          <td className="px-4 py-4 hidden lg:table-cell">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                              user.role === "admin"
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                                : user.role === "moderator"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                : "bg-muted text-muted-foreground"
                            )}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 text-xs font-medium">
                              <Circle size={6} className="fill-current" /> Active
                            </span>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Right column: Activity + Todos */}
        <div className="flex flex-col gap-6">

          {/* Activity Feed */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">Latest events in your CRM</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  <div className={cn("mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white", act.color)}>
                    {act.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-snug">{act.text}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> {act.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Todos */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Tasks</CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                {todos.filter((t) => t.completed).length}/{todos.length} completed
              </p>
            </CardHeader>
            <CardContent className="space-y-2.5 pt-0">
              {todos.length === 0
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-8 bg-muted animate-pulse rounded-lg" />
                  ))
                : todos.map((todo) => (
                    <button
                      key={todo.id}
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all",
                        todo.completed
                          ? "bg-emerald-50 dark:bg-emerald-900/20"
                          : "bg-muted/50 hover:bg-muted"
                      )}
                    >
                      {todo.completed
                        ? <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                        : <Circle size={16} className="shrink-0 text-muted-foreground" />
                      }
                      <span className={cn(
                        "flex-1 leading-snug truncate",
                        todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                      )}>
                        {todo.todo}
                      </span>
                    </button>
                  ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── KPI Bar ────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Avg. Response Time", value: "1.4h", icon: <Clock size={18} />, color: "text-indigo-500" },
          { label: "Client Satisfaction", value: "94%", icon: <Star size={18} />, color: "text-amber-500" },
          { label: "Deals Closed", value: "128", icon: <TrendingUp size={18} />, color: "text-emerald-500" },
          { label: "Conversion Rate", value: "38%", icon: <BarChart2 size={18} />, color: "text-violet-500" },
        ].map((kpi) => (
          <Card key={kpi.label} className="flex items-center gap-4 px-5 py-4">
            <div className={cn("shrink-0", kpi.color)}>{kpi.icon}</div>
            <div>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
              <p className="text-xl font-bold text-foreground">{kpi.value}</p>
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
}
