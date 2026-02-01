import MainLayout from "@/components/layout/MainLayout";
import { History, MapPin, Wind } from "lucide-react";

export default function YemenCulturePage() {
    const highlights = [
        {
            title: "Traditional Architecture",
            description: "From the mud skyscrapers of Shibam to the ornate facades of Sana'a, Yemen's architecture is a testament to human ingenuity.",
            icon: <MapPin className="text-amber-600" size={32} />
        },
        {
            title: "Ancient History",
            description: "Known to the ancients as Arabia Felix (Happy Arabia), Yemen was the home of the Queen of Sheba and the incense trade.",
            icon: <History className="text-amber-600" size={32} />
        },
        {
            title: "Cultural Heritage",
            description: "A rich tapestry of poetry, music, and traditional crafts that have been preserved for generations.",
            icon: <Wind className="text-amber-600" size={32} />
        }
    ];

    return (
        <MainLayout>
            <div className="space-y-16 py-12">
                <section className="text-center max-w-3xl mx-auto space-y-6">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight">
                        The Heart of <span className="text-amber-600">Yemen</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Yemen's culture is as diverse as its landscape, spanning thousands of years of history and tradition.
                        Explore the rich heritage that makes this land unique.
                    </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((h, i) => (
                        <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-amber-50 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8">
                                {h.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{h.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{h.description}</p>
                        </div>
                    ))}
                </div>

                <section className="bg-amber-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-4xl font-bold mb-6">Preserving the Future</h2>
                        <p className="text-amber-100/80 text-lg mb-8 leading-relaxed">
                            Our mission is to archive and share the beauty of Yemen with the world. Join us in celebrating
                            and protecting this invaluable human heritage.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-6 py-3 bg-amber-600 rounded-xl font-bold">1,000+ Stories</div>
                            <div className="px-6 py-3 bg-white/10 rounded-xl font-bold backdrop-blur-sm">50+ Cities</div>
                        </div>
                    </div>
                    {/* Abstract background element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                </section>
            </div>
        </MainLayout>
    );
}
