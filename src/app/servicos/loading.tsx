export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            {/* SKELETON HERO */}
            <section className="bg-slate-900 pt-32 pb-16 px-6 relative overflow-hidden transition-all duration-500">
                <div className="absolute inset-0 bg-slate-800 opacity-50"></div>
                <div className="container mx-auto relative z-10 text-center animate-pulse">
                    <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-3 block">
                        Serviços
                    </span>
                    <div className="h-10 md:h-12 bg-slate-700/50 rounded-lg w-3/4 max-w-md mx-auto mb-6"></div>
                    <div className="h-6 bg-slate-700/50 rounded-lg w-5/6 max-w-2xl mx-auto"></div>
                </div>
            </section>

            {/* SKELETON ABAS */}
            <div className="sticky top-[72px] z-40 bg-white border-b border-slate-200 shadow-sm">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-center gap-6 py-4 flex-wrap animate-pulse">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 bg-slate-200 rounded w-28 md:w-32"></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SKELETON CONTEÚDO - SPINNER */}
            <main className="flex-grow py-12 container mx-auto px-6">
                <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                    <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-500 font-medium">Buscando informações dos serviços...</p>
                </div>
            </main>
        </div>
    )
}
