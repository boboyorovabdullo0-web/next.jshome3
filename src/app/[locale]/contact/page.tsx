export default function ContactPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-white to-pink-100 px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 shadow-2xl">
        <h1 className="mb-4 text-center text-5xl font-bold text-zinc-800">
          Контакты
        </h1>

        <p className="mb-8 text-center text-zinc-600">
          Напишите нам для заказа handmade изделий.
        </p>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Ваше имя"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-pink-400"
          />

          <input
            type="email"
            placeholder="Ваш Email"
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-pink-400"
          />

          <textarea
            placeholder="Ваше сообщение"
            rows={5}
            className="w-full rounded-2xl border border-zinc-200 px-5 py-4 outline-none focus:border-pink-400"
          />

          <button className="w-full rounded-2xl bg-pink-500 py-4 text-lg font-semibold text-white transition hover:bg-pink-600">
            Отправить
          </button>
        </form>
      </div>
    </main>
  );
}