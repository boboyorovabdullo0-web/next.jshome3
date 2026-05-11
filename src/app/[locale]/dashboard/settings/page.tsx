"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { cn } from "@/src/lib/utils";
import {
  User, Mail, Phone, Globe, Bell, BellOff, Shield,
  Lock, Eye, EyeOff, Trash2, LogOut, ChevronDown,
  Check, AlertTriangle, Camera, Sun, Moon, Laptop,
  MessageSquare, Users, Zap, Save,
} from "lucide-react";

// ─── Toggle Switch ────────────────────────────────────────────────────────────
function Toggle({
  checked, onChange, id,
}: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        checked ? "bg-gradient-to-r from-indigo-500 to-violet-600" : "bg-muted"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md transform transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </button>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
function Select({
  value, onChange, options, id,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  id: string;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionBadge({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold mb-3", color)}>
      {icon}
      {label}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function SaveToast({ show }: { show: boolean }) {
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background shadow-2xl transition-all duration-300",
      show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
    )}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
        <Check size={13} className="text-white" />
      </div>
      <span className="text-sm font-medium">Changes saved successfully!</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  // Profile
  const [profile, setProfile] = useState({
    name: "Admin User", email: "admin@crmPro.io",
    phone: "+1 (555) 000-0000", role: "Super Admin",
  });

  // Prefs
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC+5");

  // Notifications
  const [notifs, setNotifs] = useState({
    email: true, sms: false, clientUpdates: true,
    weeklyReport: true, marketing: false,
  });

  // Security
  const [pwFields, setPwFields] = useState({
    current: "", newPw: "", confirm: "",
  });
  const [showPw, setShowPw] = useState({ current: false, newPw: false, confirm: false });
  const [pwError, setPwError] = useState("");

  // UI state
  const [toast, setToast] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast();
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwFields.newPw !== pwFields.confirm) {
      setPwError("Passwords do not match.");
      return;
    }
    if (pwFields.newPw.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    setPwError("");
    setPwFields({ current: "", newPw: "", confirm: "" });
    showToast();
  };

  const themeOptions = [
    { value: "dark", label: "Dark", icon: <Moon size={15} /> },
    { value: "light", label: "Light", icon: <Sun size={15} /> },
    { value: "system", label: "System", icon: <Laptop size={15} /> },
  ];

  return (
    <>
      <SaveToast show={toast} />

      <div className="max-w-4xl space-y-7 pb-12">

        {/* ── Page Title ─────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your profile, preferences, notifications, and security.
          </p>
        </div>

        {/* ── Profile Settings ───────────────────────────── */}
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 relative">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
          </div>
          <CardContent className="pt-0">
            {/* Avatar row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-10 mb-6">
              <div className="relative group">
                <div className="h-20 w-20 rounded-2xl border-4 border-card bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl flex items-center justify-center text-white text-2xl font-black">
                  {profile.name.charAt(0)}
                </div>
                <button className="absolute inset-0 rounded-2xl flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={18} className="text-white" />
                </button>
              </div>
              <div className="sm:mb-1">
                <p className="text-lg font-bold text-foreground">{profile.name}</p>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>

            <SectionBadge
              icon={<User size={12} />}
              label="Profile Information"
              color="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            />

            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <User size={13} className="text-muted-foreground" /> Full Name
                  </label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Mail size={13} className="text-muted-foreground" /> Email Address
                  </label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Phone size={13} className="text-muted-foreground" /> Phone Number
                  </label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Shield size={13} className="text-muted-foreground" /> Role
                  </label>
                  <Input value={profile.role} disabled className="opacity-60 cursor-not-allowed" />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <Button type="submit" className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
                  <Save size={15} /> Save Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ── Account Preferences ────────────────────────── */}
        <Card>
          <CardHeader className="pb-2">
            <SectionBadge
              icon={<Globe size={12} />}
              label="Account Preferences"
              color="bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
            />
            <CardTitle className="text-base">Preferences</CardTitle>
            <p className="text-xs text-muted-foreground">Language, theme, and timezone settings.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Interface Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    id={`theme-${opt.value}`}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all hover:scale-[1.02]",
                      theme === opt.value
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-border text-muted-foreground hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    {opt.icon}
                    {opt.label}
                    {theme === opt.value && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Globe size={13} className="text-muted-foreground" /> Language
                </label>
                <Select
                  id="language-select"
                  value={language}
                  onChange={setLanguage}
                  options={[
                    { value: "en", label: "English" },
                    { value: "ru", label: "Русский" },
                    { value: "uz", label: "O'zbek" },
                    { value: "tj", label: "Тоҷикӣ" },
                    { value: "es", label: "Español" },
                    { value: "de", label: "Deutsch" },
                  ]}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                  <Zap size={13} className="text-muted-foreground" /> Timezone
                </label>
                <Select
                  id="timezone-select"
                  value={timezone}
                  onChange={setTimezone}
                  options={[
                    { value: "UTC-8", label: "UTC-8 (Pacific)" },
                    { value: "UTC-5", label: "UTC-5 (Eastern)" },
                    { value: "UTC+0", label: "UTC+0 (London)" },
                    { value: "UTC+1", label: "UTC+1 (Paris)" },
                    { value: "UTC+3", label: "UTC+3 (Moscow)" },
                    { value: "UTC+5", label: "UTC+5 (Tashkent)" },
                    { value: "UTC+8", label: "UTC+8 (Beijing)" },
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={showToast}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition-all"
              >
                <Save size={15} /> Save Preferences
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Notification Settings ──────────────────────── */}
        <Card>
          <CardHeader className="pb-2">
            <SectionBadge
              icon={<Bell size={12} />}
              label="Notifications"
              color="bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            />
            <CardTitle className="text-base">Notification Settings</CardTitle>
            <p className="text-xs text-muted-foreground">Choose how you want to be notified.</p>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              {
                id: "notif-email", key: "email" as const,
                icon: <Mail size={16} className="text-indigo-500" />,
                label: "Email Notifications",
                desc: "Receive updates and alerts via email",
              },
              {
                id: "notif-sms", key: "sms" as const,
                icon: <MessageSquare size={16} className="text-violet-500" />,
                label: "SMS Notifications",
                desc: "Get text messages for urgent alerts",
              },
              {
                id: "notif-clients", key: "clientUpdates" as const,
                icon: <Users size={16} className="text-emerald-500" />,
                label: "Client Updates",
                desc: "Notify when clients have new activity",
              },
              {
                id: "notif-report", key: "weeklyReport" as const,
                icon: <Zap size={16} className="text-amber-500" />,
                label: "Weekly Report",
                desc: "Summary of your CRM performance",
              },
              {
                id: "notif-marketing", key: "marketing" as const,
                icon: <Bell size={16} className="text-pink-500" />,
                label: "Marketing Emails",
                desc: "Product news and promotional offers",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
                <Toggle
                  id={item.id}
                  checked={notifs[item.key]}
                  onChange={(v) => setNotifs((n) => ({ ...n, [item.key]: v }))}
                />
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <Button
                onClick={showToast}
                className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 transition-all"
              >
                <Save size={15} /> Save Notifications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ── Security ───────────────────────────────────── */}
        <Card>
          <CardHeader className="pb-2">
            <SectionBadge
              icon={<Shield size={12} />}
              label="Security"
              color="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            />
            <CardTitle className="text-base">Change Password</CardTitle>
            <p className="text-xs text-muted-foreground">Update your password to keep your account secure.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSavePassword} className="space-y-4">
              {([
                { key: "current" as const, label: "Current Password", placeholder: "••••••••" },
                { key: "newPw" as const, label: "New Password", placeholder: "Min. 8 characters" },
                { key: "confirm" as const, label: "Confirm New Password", placeholder: "Repeat new password" },
              ]).map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Lock size={13} className="text-muted-foreground" /> {field.label}
                  </label>
                  <div className="relative">
                    <Input
                      type={showPw[field.key] ? "text" : "password"}
                      value={pwFields[field.key]}
                      onChange={(e) => setPwFields((p) => ({ ...p, [field.key]: e.target.value }))}
                      placeholder={field.placeholder}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => ({ ...s, [field.key]: !s[field.key] }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPw[field.key] ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              ))}

              {pwError && (
                <p className="flex items-center gap-1.5 text-sm text-red-500 font-medium">
                  <AlertTriangle size={14} /> {pwError}
                </p>
              )}

              {/* Password strength indicator */}
              {pwFields.newPw && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all",
                          pwFields.newPw.length >= i * 3
                            ? i <= 1 ? "bg-red-500"
                            : i <= 2 ? "bg-amber-500"
                            : i <= 3 ? "bg-blue-500"
                            : "bg-emerald-500"
                            : "bg-muted"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {pwFields.newPw.length < 4 ? "Weak" : pwFields.newPw.length < 8 ? "Fair" : pwFields.newPw.length < 12 ? "Good" : "Strong"} password
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Shield size={15} /> Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ── Danger Zone ────────────────────────────────── */}
        <Card className="border-red-200 dark:border-red-900/50">
          <CardHeader className="pb-2">
            <SectionBadge
              icon={<AlertTriangle size={12} />}
              label="Danger Zone"
              color="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
            />
            <CardTitle className="text-base text-red-600 dark:text-red-400">Danger Zone</CardTitle>
            <p className="text-xs text-muted-foreground">Irreversible actions. Proceed with caution.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Logout all devices */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-border p-4 hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                  <LogOut size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Sign out of all devices</p>
                  <p className="text-xs text-muted-foreground">This will end all active sessions.</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:hover:bg-amber-900/20 shrink-0"
                onClick={() => window.location.href = "/login"}
              >
                <LogOut size={14} className="mr-1.5" /> Sign Out All
              </Button>
            </div>

            {/* Delete account */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                  <Trash2 size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and all data. This action cannot be undone.</p>
                </div>
              </div>
              {!deleteConfirm ? (
                <Button
                  variant="danger"
                  size="sm"
                  className="shrink-0"
                  onClick={() => setDeleteConfirm(true)}
                >
                  <Trash2 size={14} className="mr-1.5" /> Delete Account
                </Button>
              ) : (
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-red-600 font-medium">Are you sure?</span>
                  <Button variant="danger" size="sm">Confirm</Button>
                  <Button variant="outline" size="sm" onClick={() => setDeleteConfirm(false)}>Cancel</Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </>
  );
}
