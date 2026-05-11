"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "@/src/components/ui/Card";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "@/src/components/ThemeToggle";
import { LocaleSwitcher } from "@/src/components/LocaleSwitcher";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslations("Login");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Logging in...", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/dashboard/clients");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-background p-4 transition-colors duration-300 overflow-hidden">
      {/* Background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-4">
            <span className="text-2xl font-black text-white">C</span>
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">{t('title')}</h1>
          <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
        </div>

        <Card className="shadow-xl border-border">
          <CardHeader>
            <CardTitle>{t('welcome')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('email')}</label>
                <Input
                  {...register("email")}
                  placeholder="admin@example.com"
                  error={errors.email?.message}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">{t('password')}</label>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  error={errors.password?.message}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('signingIn') : t('submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
