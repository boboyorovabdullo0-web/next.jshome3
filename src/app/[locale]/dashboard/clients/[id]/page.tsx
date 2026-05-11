"use client";

import { useParams, useRouter } from "next/navigation";
import { 
  useGetUserByIdQuery, 
  useGetUserPostsQuery, 
  useGetUserTodosQuery 
} from "@/src/services/api";
import { Button } from "@/src/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Calendar,
  CheckCircle2,
  Circle,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/src/lib/utils";

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const t = useTranslations("ClientDetails");

  const { data: user, isLoading: userLoading } = useGetUserByIdQuery(id);
  const { data: postsData, isLoading: postsLoading } = useGetUserPostsQuery(id);
  const { data: todosData, isLoading: todosLoading } = useGetUserTodosQuery(id);

  if (userLoading) return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-32" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[400px] lg:col-span-1" />
        <Skeleton className="h-[400px] lg:col-span-2" />
      </div>
    </div>
  );

  if (!user) return <div className="text-center p-12 text-muted-foreground">{t('notFound')}</div>;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Button 
        variant="ghost" 
        className="gap-2 -ml-2 text-muted-foreground hover:text-foreground" 
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        {t('back')}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1 space-y-6"
        >
          <Card className="border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-primary/5 p-6 border-b border-border flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={user.image} 
                    alt={user.firstName} 
                    className="h-28 w-28 rounded-full border-4 border-background shadow-xl bg-muted"
                  />
                  <div className="absolute bottom-1 right-1 h-6 w-6 rounded-full bg-green-500 border-4 border-background" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">{user.firstName} {user.lastName}</h3>
                <p className="text-muted-foreground">@{user.username}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold uppercase tracking-wider">
                    {user.role}
                  </span>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-bold uppercase tracking-wider border border-border">
                    {t('id')}: {user.id}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors cursor-pointer group">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm font-medium">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80 group">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar size={18} />
                  </div>
                  <span className="text-sm font-medium">{t('born')}: {user.birthDate}</span>
                </div>
                
                <div className="pt-5 border-t border-border">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">{t('company')}</h4>
                  <div className="flex gap-4 p-3 rounded-xl bg-muted/50 border border-border/50">
                    <div className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-primary shadow-sm">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{user.company.name}</div>
                      <div className="text-xs text-muted-foreground">{user.company.title}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-border">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">{t('address')}</h4>
                  <div className="flex gap-3 text-foreground/80">
                    <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">
                      {user.address.address}, {user.address.city},<br />
                      {user.address.state} {user.address.postalCode}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Extra Info (Posts & Todos) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Todos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={18} />
                  </div>
                  {t('tasks')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {todosLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-14 w-full" />
                    <Skeleton className="h-14 w-full" />
                  </div>
                ) : todosData?.todos.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground italic bg-muted/30 rounded-xl border border-dashed border-border">
                    {t('noTasks')}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {todosData?.todos.slice(0, 5).map((todo) => (
                      <li key={todo.id} className="flex items-start gap-4 p-4 bg-muted/30 hover:bg-muted/50 border border-border/50 rounded-xl transition-all group">
                        <div className="mt-0.5">
                          {todo.completed ? (
                            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <CheckCircle2 size={14} />
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors" />
                          )}
                        </div>
                        <span className={cn(
                          "text-sm font-medium transition-all",
                          todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                        )}>
                          {todo.todo}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText size={18} />
                  </div>
                  {t('activity')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : postsData?.posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground italic bg-muted/30 rounded-xl border border-dashed border-border">
                    {t('noActivity')}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {postsData?.posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="p-5 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-md transition-all group">
                        <h5 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h5>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">{post.body}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-primary/10 text-primary rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                            <span className="text-red-500/80">❤</span>
                            {post.reactions.likes} {t('likes')}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
