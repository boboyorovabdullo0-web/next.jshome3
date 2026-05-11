"use client";

import { useState } from "react";
import { useGetUsersQuery, useDeleteUserMutation } from "@/src/services/api";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card } from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";
import {
  Search, Trash2, Building2, Phone, Mail,
  MoreHorizontal, AlertTriangle, X, Check,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/src/lib/utils";

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
interface ConfirmModalProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

function ConfirmModal({ name, onConfirm, onCancel, isLoading }: ConfirmModalProps) {
  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl p-6">
          {/* Icon */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-900/30">
              <AlertTriangle size={26} className="text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Text */}
          <h2 className="text-center text-lg font-bold text-foreground">Delete Client</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{name}</span>?
            <br />
            <span className="text-red-500">This action cannot be undone.</span>
          </p>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-50"
            >
              <X size={15} /> Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors shadow-lg shadow-red-500/25 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <Trash2 size={15} />
              )}
              {isLoading ? "Deleting…" : "Yes, Delete"}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function DeletedToast({ name, show }: { name: string; show: boolean }) {
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background shadow-2xl transition-all duration-300",
      show ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
    )}>
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500">
        <Check size={13} className="text-white" />
      </div>
      <span className="text-sm font-medium">
        <span className="font-bold">{name}</span> deleted successfully
      </span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetUsersQuery({ q: search });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const t = useTranslations("Clients");

  // Locally track deleted IDs for optimistic UI
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  // Confirm modal state
  const [pending, setPending] = useState<{ id: number; name: string } | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ show: boolean; name: string }>({ show: false, name: "" });

  const openConfirm = (e: React.MouseEvent, id: number, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setPending({ id, name });
  };

  const handleConfirmDelete = async () => {
    if (!pending) return;
    try {
      await deleteUser(pending.id);
      // Optimistically hide the row immediately
      setDeletedIds((prev) => [...prev, pending.id]);
      // Show toast
      setToast({ show: true, name: pending.name });
      setTimeout(() => setToast({ show: false, name: "" }), 3000);
    } finally {
      setPending(null);
    }
  };

  // Filter out deleted users
  const visibleUsers = data?.users.filter((u) => !deletedIds.includes(u.id)) ?? [];

  if (isError) return (
    <div className="flex flex-col items-center justify-center h-64 text-red-500">
      <p className="text-lg font-semibold">Error loading clients.</p>
      <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <>
      {/* Confirm Modal */}
      {pending && (
        <ConfirmModal
          name={pending.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setPending(null)}
          isLoading={isDeleting}
        />
      )}

      {/* Toast */}
      <DeletedToast show={toast.show} name={toast.name} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t('title')}</h2>
            <p className="text-muted-foreground">
              {t('subtitle')}
              {deletedIds.length > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-red-500">
                  · {deletedIds.length} deleted this session
                </span>
              )}
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              className="pl-10"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <Card className="overflow-hidden border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold text-foreground/80">{t('table.client')}</th>
                  <th className="p-4 font-semibold text-foreground/80 hidden md:table-cell">{t('table.company')}</th>
                  <th className="p-4 font-semibold text-foreground/80 hidden lg:table-cell">{t('table.contact')}</th>
                  <th className="p-4 font-semibold text-foreground/80 text-right">{t('table.actions')}</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="p-4"><Skeleton className="h-12 w-48" /></td>
                        <td className="p-4 hidden md:table-cell"><Skeleton className="h-6 w-32" /></td>
                        <td className="p-4 hidden lg:table-cell"><Skeleton className="h-6 w-40" /></td>
                        <td className="p-4 text-right"><Skeleton className="h-10 w-10 ml-auto" /></td>
                      </tr>
                    ))
                  ) : visibleUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-12 text-center text-muted-foreground italic">
                        {search ? t('noResults') : "No clients found."}
                      </td>
                    </tr>
                  ) : (
                    visibleUsers.map((user) => (
                      <motion.tr
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -30, height: 0 }}
                        transition={{ duration: 0.25 }}
                        key={user.id}
                        className="border-b border-border hover:bg-muted/30 transition-colors group"
                      >
                        <td className="p-4">
                          <Link href={`./clients/${user.id}`} className="flex items-center gap-3">
                            <img
                              src={user.image}
                              alt={user.firstName}
                              className="h-10 w-10 rounded-full bg-muted border border-border"
                            />
                            <div>
                              <div className="font-bold text-foreground leading-tight">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-xs text-muted-foreground">@{user.username}</div>
                            </div>
                          </Link>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Building2 size={16} className="text-muted-foreground" />
                            <div className="truncate max-w-[200px]">{user.company.name}</div>
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <div className="flex flex-col gap-1 text-sm text-foreground/70">
                            <div className="flex items-center gap-2">
                              <Mail size={14} className="text-muted-foreground" />
                              {user.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-muted-foreground" />
                              {user.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* Delete button */}
                            <button
                              onClick={(e) =>
                                openConfirm(e, user.id, `${user.firstName} ${user.lastName}`)
                              }
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                              title="Delete client"
                            >
                              <Trash2 size={17} />
                            </button>

                            {/* View detail */}
                            <Link href={`./clients/${user.id}`}>
                              <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                                <MoreHorizontal size={17} />
                              </button>
                            </Link>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
